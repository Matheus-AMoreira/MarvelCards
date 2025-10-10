import crypto from 'crypto';

const apiBaseURL = process.env.MARVEL_API_BASE_URL;

function getTsAndHash() {
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const apikey = process.env.MARVEL_API_PUBLIC_KEY;
  const ts = new Date().getMonth().toString();
  const hash = crypto.createHash('md5').update(ts + privateKey + apikey).digest('hex');
  
  return [ ts, apikey, hash ]
}

export async function getCharactersFromMarvel(
  limit: string, 
  offset: string,
  nameStartsWith?: string
): Promise<ApiResponse<Character>> { 

  const params = new URLSearchParams({
    limit: limit ,
    offset: offset,
  });

  const [ ts, apikey, hash ] = getTsAndHash()

  if(ts && apikey && hash){
    params.append('ts', ts)
    params.append('apikey', apikey)
    params.append('hash', hash)
  }else {
    throw new Error('Houve um erro ao gerar a autenticação necessaria para a API')
  }

  if (nameStartsWith) {params.append('nameStartsWith', nameStartsWith);}

  // Chamada ao fetch para a API Externa (revalidate = 1 mês)
  const response = await fetch(`${apiBaseURL}/v1/public/characters?${params}`, 
    { next: { revalidate: 2592000 } }); 

  if (!response.ok) {
   throw new Error(`Erro ${response.status} na API da Marvel: ${response.statusText}`);
  }

  const data:ApiResponse<Character> = await response.json();

  return data;
}

export async function getCharacterById( id:string ): Promise<Character>{
  const params = new URLSearchParams({
  });

  const [ ts, apikey, hash ] = getTsAndHash()

    if(ts && apikey && hash){
    params.append('ts', ts)
    params.append('apikey', apikey)
    params.append('hash', hash)
  }else {
    throw new Error('Houve um erro ao gerar a autenticação necessaria para a API')
  }

  const response = await fetch(`${apiBaseURL}/v1/public/characters/${id}?${params}`, 
    { next: { revalidate: 86400 } });

  if (!response.ok) {
   throw new Error(`Erro ${response.status} na API da Marvel: ${response.statusText}`);
  }

  const data:ApiResponse<Character> = await response.json();
  const char = data.data.results[0]

  return char;
}