"use client"

import { removeFavorite } from "@app/lib/serveractions/favoriteActions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RemoveFavoriteButton({ characterDbId }: { characterDbId: number }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRemove = () => {
        startTransition(async () => {
            const result = await removeFavorite(characterDbId);
            if (!result.success) {
                alert(result.error || "Falha ao remover o favorito.");
            }
        });
    };

    return (
        <button
            className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded 
            hover:bg-red-800 hover:cursor-pointer transition-colors duration-300 disabled:bg-gray-500"
            onClick={handleRemove}
            disabled={isPending}
        >
            {isPending ? 'Removendo...' : 'Remover dos Favoritos'}
        </button>
    );
}