"use client"

import { useRouter } from "next/navigation";

export default function CharButtons({name, id}: { name:string, id:number}){
    const router = useRouter();
    
    const handleFavorite = () => {
    alert(`Personagem ${name}:${id} adicionado aos favoritos!`);
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
            Favoritar
            </button>
        </div>
    )
}