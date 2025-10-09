import crypto from 'crypto';

export async function getCharactersFromMarvel(
  limit: string, 
  offset: string,
  nameStartsWith?: string
): Promise<ApiResponse<Character>> { 

  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const apiBaseURL = process.env.MARVEL_API_BASE_URL;

  if (!privateKey || !publicKey || !apiBaseURL) {
    throw new Error('Variáveis de ambiente da API da Marvel não configuradas.');
  }

  //Geração do Hash da Marvel
  const ts = new Date().getMonth().toString();
  const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
  
  const params = new URLSearchParams({
    limit: limit ,
    offset: offset,
    ts,
    apikey: publicKey,
    hash,
  });

  if (nameStartsWith) {
    params.append('nameStartsWith', nameStartsWith);
  }

  // Chamada ao fetch para a API Externa
  const response = await fetch(`${apiBaseURL}/v1/public/characters?${params}`, { next: { revalidate: 2592000 } }); 

  if (!response.ok) {
   throw new Error(`Erro ${response.status} na API da Marvel: ${response.statusText}`);
  }

  const data:ApiResponse<Character> = await response.json();

  return data;
}