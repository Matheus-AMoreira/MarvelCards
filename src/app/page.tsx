import { Suspense } from 'react';

import NavBar from '@/app/components/NavBar';
import CharacterGrid from '@/app/components/character/CharacterGrid';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';

export default async function Home( {searchParams} : {searchParams: Promise<any> | undefined}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);

  return (
    <main>
      <NavBar isLoggedIn={false} />
      <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<LoadingSkeleton />}>
        <CharacterGrid searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  );
}