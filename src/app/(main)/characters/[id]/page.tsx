import Image from 'next/image'

import { getCharacterById } from "@app/lib/ApiFetch";
import CharButtons from '@app/components/characters/[id]/CharButtons';

export default async function CharacterDetailPage({ params } : { params:Promise<any> }) {
  const id = await Promise.resolve(params);
  const char = await getCharacterById(id.id);

  if (!char) {
    return <div>Personagem não encontrado.</div>;
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#202020] tracking-tight">
              {char.name}
            </h1>
            <CharButtons name={char.name} id={char.id}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Image 
                width={1000} 
                height={1000} 
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`} 
                alt={`Imagem de ${char.name}`}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-lg text-zinc-600 leading-relaxed">
                {char.description || "Nenhuma descrição disponível."}
              </p>
            </div>
          </div>

          <AppearanceSection title="Comics" available={char.comics.available} items={char.comics.items} />
          <AppearanceSection title="Séries" available={char.series.available} items={char.series.items} />
          <AppearanceSection title="Histórias" available={char.stories.available} items={char.stories.items} />
          <AppearanceSection title="Eventos" available={char.events.available} items={char.events.items} />

        </div>
      </div>
    </div>
  );
}

function AppearanceSection({ title , available, items }: {title:string , available:number, items:ComicSummary[]}) {
  if (available === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-bold text-zinc-800 border-b-2 border-[#e62429] pb-2 mb-4">
        {title} <span className="text-lg font-normal text-gray-500">({available})</span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <li key={index} className="bg-zinc-100 p-3 rounded-md text-zinc-700 hover:bg-zinc-200 transition-colors">
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
}