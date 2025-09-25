import { NextResponse } from 'next/server';
import crypto from 'crypto'; 

export async function GET() {
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const apiBaseURL = process.env.MARVEL_API_BASE_URL;

  try {
    if (!privateKey || !publicKey || !apiBaseURL) {
      return new NextResponse(
        JSON.stringify({ error: "Variáveis de ambiente não configuradas." }),
        { status: 500 }
      );
    }

    const ts = Date.now();
    const dataToHash = ts + privateKey + publicKey;

    const hash = crypto.createHash('md5').update(dataToHash).digest('hex');

    const params = new URLSearchParams({
      ts: ts.toString(),
      apikey: publicKey,
      hash: hash,
    });

    const url = `${apiBaseURL}/v1/public/characters?${params}`;

    const response = await fetch(url);
    if (!response.ok) {
        console.log(response)
      throw new Error(`Erro ${response.status} na API da Marvel: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const typedError = error as { message: string }; 
    
    return new NextResponse(
        JSON.stringify({ error: typedError.message }),
        { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        }
    );
  }
}