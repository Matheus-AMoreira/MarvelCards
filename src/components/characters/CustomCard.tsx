"use client"

import Link from "next/link";
import Image from 'next/image'
import type { Personagem } from '@app/components/characters/FavoritesList';

interface CustomCardProps {
  char: Personagem;
  onRemove: (personagemId: number) => void;
  isRemoving: boolean;
}

export default function CustomCard({ char, onRemove, isRemoving }: CustomCardProps) {
  return (
    <div className="w-80 h-[32rem] rounded-b-2xl shadow-xl bg-[var(--navbar-color-lightblack)] transition-all duration-300 ease-in-out
           hover:bg-red-600 hover:scale-[1.06] flex flex-col">
      <Link href={`/characters/${char.api_id}`} className="flex flex-col grow">
        <div className="w-[320px] h-[300px]">
          <Image
            className="w-full h-full object-cover"
            width={320}
            height={300}
            src={char.thumbnail_url}
            alt={char.nome}
          />
        </div>
        <div className='text-white flex flex-col grow justify-center items-center p-4'>
          <h1 className='text-3xl text-center mb-4'>{char.nome}</h1>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
          <button className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={() => onRemove(char.id)}
            disabled={isRemoving}
          >
            {isRemoving ? 'Removendo...' : 'Remover dos Favoritos'}
          </button>
      </div>
    </div>
  );
}