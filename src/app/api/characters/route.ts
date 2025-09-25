import { NextResponse } from 'next/server';

export async function GET() {
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const apiBaseURL = process.env.MARVEL_API_BASE_URL;
  const md5 = require('js-md5'); 

  try {
    if (!privateKey || !publicKey || !apiBaseURL) {
      return new NextResponse(
        JSON.stringify({ error: "Variáveis de ambiente não configuradas." }),
        { status: 500 }
      );
    }

    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const params = new URLSearchParams({
      ts: ts.toString(),
      apikey: publicKey,
      hash: hash,
    });

    const url = `${apiBaseURL}/characters?${params}`;
    console.log(url)

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