import { Suspense } from 'react';

import CharacterGrid from '@app/components/characters/CharacterGrid';
import LoadingSkeleton from '@app/components/LoadingSkeleton';

interface PageProps {
  params: Promise<any>;
  searchParams: Promise<any>;
}

export default async function SearchPage( { params, searchParams }: PageProps) {
  const rota = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  return (
    <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<LoadingSkeleton />}>
      {rota.searchType == 'characters' && <CharacterGrid searchParams={resolvedSearchParams} />}
    </Suspense>
  );
}