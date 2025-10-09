import { getCharactersFromMarvel } from "@/app/lib/ApiFetch";

import Footer from "@/app/components/Footer";
import Pagination from "@/app/components/Pagination";
import Card from "@/app/components/character/Card";

interface CharacterGridProps {
  searchParams: {limit: string, offset: string, query: string};
}

export default async function CharacterGrid({ searchParams }: CharacterGridProps) {
  const validLimits = [25, 50, 100];

  const toStringOrDefault = (value: string, defaultValue: string): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
    return defaultValue;
  };

  const limitParam = toStringOrDefault(searchParams.limit, '25');
  const offsetParam = toStringOrDefault(searchParams.offset, '0');
  const queryParam = toStringOrDefault(searchParams.query, '');

  let limit = parseInt(limitParam || '25');
  if (isNaN(limit) || !validLimits.includes(limit)) {
    limit = 25;
  }

  let offset = parseInt(offsetParam || '0');
  if (isNaN(offset) || offset < 0 || offset%25>0) {
    offset = 0;
  }
  
  const effectiveOffset = Math.floor(offset / limit) * limit;
  const searchQuery = queryParam || '';

  // Busca os dados da API
  const charactersData = await getCharactersFromMarvel(
    limit.toString(),
    effectiveOffset.toString(),
    searchQuery.toString()
  );

  // Tratamento para quando não há resultados
  if (!charactersData || charactersData.data.results.length === 0) {
    return (
      <>
        {searchQuery && (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold">Nenhum resultado encontrado para &quot;{searchQuery}&quot;</h2>
          </div>
        )}
        <Pagination totalChars={0} limit={limit} offset={effectiveOffset} searchQuery={searchQuery} />
        <Footer text={charactersData?.attributionText || ""} />
      </>
    );
  }

  // Renderiza os resultados
  return (
    <>
      <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
        {charactersData.data.results.map((char) => <Card key={char.id} char={char}/>)}
      </div>
      <Pagination 
        totalChars={charactersData.data.total} 
        limit={charactersData.data.limit} 
        offset={charactersData.data.offset}
        searchQuery={searchQuery}
      />
      <Footer text={charactersData.attributionText} />
    </>
  );
}