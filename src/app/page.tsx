import { Suspense } from 'react';
import { CharacterGrid } from './components/CharacterGrid'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className='loading-fallback'>Carregando a aplicação...</div>}>
        <CharacterGrid />
      </Suspense>
    </main>
  );
}