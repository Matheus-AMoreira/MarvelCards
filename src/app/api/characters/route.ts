import { NextResponse } from 'next/server';
import crypto from 'crypto';

const cacheMap = new Map<string, { data: ApiResponse<Character[]>; timestamp: number }>();


export async function GET(request: Request) {
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const apiBaseURL = process.env.MARVEL_API_BASE_URL;

    const { searchParams } = new URL(request.url);
    const pageSize = Number(searchParams.get('limit')) || 20;
    const page = searchParams.get('page') || '0';
    const orderBy = searchParams.get('orderBy') || 'modified';

    const day = new Date().getDate();
    const cacheKey = `characters:day=${day}:page=${page}`;

    try {
        // Verifica se há dados no cache para a página solicitada no mesmo dia
        if (cacheMap.has(cacheKey) && new Date(cacheMap.get(cacheKey)!.timestamp).getDate() === day) {
            console.log(`CACHE HIT para a chave: ${cacheKey}`);
            return new NextResponse(JSON.stringify(cacheMap.get(cacheKey)!.data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log(`Cache para a chave: ${cacheKey} faltando`);

        if (!privateKey || !publicKey || !apiBaseURL) {
            throw new Error("Variáveis de ambiente da API da Marvel não configuradas.");
        }

        console.log(`Primeira requisição do dia ${day}. Buscando todos os dados da API da Marvel.`);

        const ts = Date.now;
        const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
        const params = new URLSearchParams({
            limit: '100',
            orderBy: orderBy,
            ts: ts.toString(),
            apikey: publicKey,
            hash: hash,
        });

        const url = `${apiBaseURL}/v1/public/characters?${params}`;
        const response= await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ${response.status} na API da Marvel: ${response.statusText}`);
        }

        const data: ApiResponse<Character[]> = await response.json();
        const effectiveTotal = Math.min(data.data.total, 100);
        data.data.total = effectiveTotal;

        // Dividir os dados em grupos de 20 personagens
        const results = data.data.results;
        const totalPages = Math.ceil(results.length / pageSize);

        for (let i = 0; i < totalPages; i++) {
            const pageData = {
                ...data,
                data: {
                    ...data.data,
                    results: results.slice(i * pageSize, (i + 1) * pageSize),
                    offset: i * pageSize,
                    limit: pageSize,
                    total: effectiveTotal,
                    count: Math.min(pageSize, results.length - i * pageSize),
                },
            };

            const pageCacheKey = `characters:day=${day}:page=${i + 1}`;
            cacheMap.set(pageCacheKey, {
                data: pageData,
                timestamp: new Date().getTime(),
            });
            console.log(`Dados para a chave ${pageCacheKey} salvos no cache manual.`);
        }
        

        // Retornar os dados da página solicitada
        if (cacheMap.has(cacheKey)) {
            console.log(`Retornando dados do cache para a chave: ${cacheKey}`);
            return new NextResponse(JSON.stringify(cacheMap.get(cacheKey)!.data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error(`Página ${page} não encontrada no cache.`);
        }

    } catch (error) {
        const typedError = error as { message: string };
        return new NextResponse(
            JSON.stringify({ error: typedError.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}