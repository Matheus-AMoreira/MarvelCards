"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Personagem } from '@prisma/client';
import RemoveFavoriteButton from '@app/components/favorites/RemoveFavoriteButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type DisplayCardProps = {
    variant: 'display';
    char: Character;
};

type FavoriteCardProps = {
    variant: 'favorite';
    char: Personagem;
};

type UnifiedCardProps = DisplayCardProps | FavoriteCardProps;

export default function Card(props: UnifiedCardProps) {
    const { variant, char } = props;
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    // Normaliza os dados para serem usados no componente
    const linkId = variant === 'display' ? char.id : char.api_id;
    const thumbnailUrl = variant === 'display' ? `${char.thumbnail.path}.${char.thumbnail.extension}` : char.thumbnail_url;
    const name = variant === 'display' ? char.name : char.nome;

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true); // Ativa o overlay
        router.push(`/characters/${linkId}`); // Inicia a navegação
    };

    return (
        <div className="relative w-80 h-[32rem] rounded-b-2xl shadow-xl bg-[var(--navbar-color-lightblack)] transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-[1.06] flex flex-col">
            
            {/* Overlay de Carregamento */}
            {isNavigating && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950 border-red-600 border-8 bg-opacity-70 rounded-b-2xl z-10 cursor-wait">
                    <div className="border-4 border-t-4 border-t-white border-red-600 rounded-full w-12 h-12 animate-spin"/>
                </div>
            )}
            
            {/* Seção Comum: Imagem e Nome com Link */}
            <Link href={`/characters/${linkId}`} onClick={handleNavigation} className="flex flex-col grow">
                <div className="w-[320px] h-[300px]">
                    <Image
                        className="w-full h-full object-cover"
                        width={320}
                        height={300}
                        src={thumbnailUrl}
                        alt={name}
                    />
                </div>
                <div className='text-white flex flex-col grow justify-center items-stretch p-4'>
                    <h1 className='text-3xl text-center'>{name}</h1>
                </div>
            </Link>

            {/* Seção Condicional: Renderiza estatísticas ou o botão de remover */}
            {variant === 'display' ? (
                <div className='text-white grid grid-cols-3 gap-[0.1rem] text-center pb-6'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Comics</h2>
                        <p className='text-2xl'>{props.char.comics.available}</p>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold'>Series</h2>
                        <p className='text-2xl'>{props.char.series.available}</p>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold'>Stories</h2>
                        <p className='text-2xl'>{props.char.stories.available}</p>
                    </div>
                </div>
            ) : variant === 'favorite' && (
                 <div className="p-4 pt-0">
                    <RemoveFavoriteButton characterDbId={char.id} />
                </div>
            )}
        </div>
    );
}