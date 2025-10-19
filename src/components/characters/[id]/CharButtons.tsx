"use client"

import { useSupabase } from "@app/context/SupabaseProvider";
import { addCharacterToFavorites } from "@app/lib/serveractions/favoriteActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CharButtons({id, name, thumbnail_url}: { id:number, name:string, thumbnail_url:string}){
    const router = useRouter();
    const { session }  = useSupabase();
    const [isLoading, setIsLoading] = useState(false);

    const handleFavorite = async () => {
        if (!session) {
            alert("Você precisa estar logado para favoritar!");
            return;
        }

        setIsLoading(true);

        const result = await addCharacterToFavorites({
            api_id: id,
            nome: name,
            thumbnail_url: thumbnail_url,
        }, session);

        if (result.success) {
            alert(`Personagem ${name} adicionado aos favoritos!`);
        } else {
            alert(`Erro: ${result.error}`);
        }

        setIsLoading(false);
    };

    return(
        <div className="flex items-center gap-3 flex-shrink-0">
            <button 
            onClick={() => router.back()}
            className="py-2 px-4 bg-gray-200 text-zinc-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            Voltar
            </button>
            <button
            onClick={() => handleFavorite()}
            className="py-2 px-5 bg-[#e62429] text-white font-bold rounded-lg hover:bg-[#ca2020] transition-colors flex items-center gap-2"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                {isLoading ? "Adicionando..." : "Favoritar"}
            </button>
        </div>
    )
}