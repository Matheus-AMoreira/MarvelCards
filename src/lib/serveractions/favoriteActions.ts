"use server";

import { revalidatePath } from 'next/cache';
import { prisma } from '@app/lib/prisma/prisma';
import { Personagem } from '@prisma/client';
import { createClient } from '@app/utils/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

type FindFavoritesResult = { 
  error: boolean; 
  data: Personagem[] | []
};

export async function findUserFavorites() : Promise<FindFavoritesResult> {
  const supabase = await createClient()
  const response = await supabase.auth.getUser()

  if (!response.data.user) {
    return { error: true, data:[] };
  }
  
  try {
    const favoritesRelation = await prisma.usuarioPersonagemFavorito.findMany({
    where: {
      usuario_id: response.data.user.id,
    },
    include: {
      personagem: true,
    },
    orderBy: {
      adicionado_em: 'desc',
    },
  });
    const favoriteCharacters = favoritesRelation.map(fav => fav.personagem);
    return { error: false, data: favoriteCharacters };

  } catch (error) {
    return { error: true, data:[] };
  }
}

export async function addCharacterToFavorites(
  characterData: {
    api_id: number;
    nome: string;
    thumbnail_url: string;
  }
): Promise<ActionResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    const personagem = await prisma.personagem.upsert({
      where: { api_id: characterData.api_id },
      update: {},
      create: {
        api_id: characterData.api_id,
        nome: characterData.nome,
        thumbnail_url: characterData.thumbnail_url,
      },
    });

    await prisma.usuarioPersonagemFavorito.create({
      data: {
        usuario_id: data.user.id,
        personagem_id: personagem.id,
      },
    });

  } catch (error: unknown) {
    // Erro específico do Prisma para chave única duplicada
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
      return { success: false, error: "Este personagem já está na sua lista de favoritos." };
    }
    
    console.error('Erro na Server Action (addCharacterToFavorites):', error);
    return { success: false, error: "Ocorreu um erro interno ao adicionar o personagem." };
  }

  revalidatePath('/favorites');
  return { success: true };
}

export async function removeFavorite(personagemId: number): Promise<ActionResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    await prisma.usuarioPersonagemFavorito.delete({
      where: {
        usuario_id_personagem_id: {
          usuario_id: data.user.id,
          personagem_id: personagemId,
        },
      },
    });

    revalidatePath('/favorites'); 
    return { success: true };

  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return { success: false, error: "Ocorreu um erro ao remover o personagem dos favoritos." };
  }
}