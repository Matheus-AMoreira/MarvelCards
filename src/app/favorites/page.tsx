"use client";

import { useEffect, useState } from "react";
import { findUserFavorites, removeFavorite } from "@app/lib/serveractions/favoriteActions";
import { useSupabase } from "@app/context/SupabaseProvider";
import LoadingSkeleton from "@app/components/LoadingSkeleton";
import Link from "next/link";
import Image from 'next/image'

interface Personagem {
  id: number;
  api_id: number;
  nome: string;
  thumbnail_url: string;
}

interface CunstonCardProps {
  char: Personagem;
  onRemove: (personagemId: number) => void;
  isRemoving: boolean;
}

function CunstonCard({ char, onRemove, isRemoving }: CunstonCardProps) {
  return (
    <div className="w-80 h-[32rem] rounded-b-2xl shadow-xl bg-[var(--navbar-color-lightblack)] transition-colors duration-600 ease-in-out
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

export default function MeusFavoritosPage() {
  const {session} = useSupabase();
  const [favoritos, setFavoritos] = useState<Personagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchFavoritos = async () => {
      setIsLoading(true);
      const result = await findUserFavorites(session);

      if (result.success && result.data) {
        setFavoritos(result.data);
      } else {
        console.error("Erro ao buscar favoritos:", result.error);
      }
      setIsLoading(false);
    };

    fetchFavoritos();
  }, [session]);

  const handleRemoveFavorite = async (personagemId: number) => {
    setRemovingId(personagemId);

    const result = await removeFavorite(personagemId, session);

    if (result.success) {
      setFavoritos(prevFavoritos =>
        prevFavoritos.filter(char => char.id !== personagemId)
      );
    } else {
      alert(result.error || "Não foi possível remover o favorito.");
    }
    
    setRemovingId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Personagens Favoritos</h1>
      {isLoading ? <LoadingSkeleton /> : 
        !session ? <p>Você precisa estar logado para ver os favoritos</p> :
          favoritos.length === 0 ? (
              <p>Você ainda não favoritou nenhum personagem.</p>
          ) : 
          <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
            {favoritos.map((char) =>
              <CunstonCard key={char.id} char={char} onRemove={handleRemoveFavorite} isRemoving={removingId === char.id}/>
            )}
          </div>
      }
    </div>
  );
}
