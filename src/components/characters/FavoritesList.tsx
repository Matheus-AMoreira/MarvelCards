"use client"

import { removeFavorite } from "@app/lib/serveractions/favoriteActions";
import { useState, useTransition } from "react";
import CustomCard from "./CustomCard";

export interface Personagem {
  id: number;
  api_id: number;
  nome: string;
  thumbnail_url: string;
}

export default function FavoritesList({ initialFavorites }: { initialFavorites: Personagem[] }) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [isPending, startTransition] = useTransition();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (personagemId: number) => {
    setRemovingId(personagemId); // Marca qual card está sendo removido
    startTransition(async () => {
      const result = await removeFavorite(personagemId);
      if (result.success) {
        // Se a remoção no servidor for bem-sucedida, atualiza o estado local para remover o card da tela.
        setFavorites(currentFavorites => 
          currentFavorites.filter(char => char.id !== personagemId)
        );
      } else {
        // Idealmente, você usaria um sistema de notificações (toast) aqui
        alert(result.error || "Falha ao remover o favorito.");
      }
      setRemovingId(null); // Limpa o ID de remoção
    });
  };

  if (favorites.length === 0) {
    return <p className="text-center">Você ainda não favoritou nenhum personagem.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
      {favorites.map((char) =>
        <CustomCard 
          key={char.id} 
          char={char}
          onRemove={handleRemove}
          isRemoving={isPending && removingId === char.id}
        />
      )}
    </div>
  );
}