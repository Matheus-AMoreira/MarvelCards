"use server";

import { revalidatePath } from 'next/cache';
import { prisma } from '@app/lib/prisma/prisma';
import { Session } from '@supabase/supabase-js';

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function findUserFavorites(session:Session | null) {
  let data = [];

  if (!session) {
    return { success: false, error: "Não autorizado." };
  }

  try{
    const result = await prisma.usuarioPersonagemFavorito.findMany({
    where: {
        usuario_id: session.user.id,
      },
      include: {
        personagem: true,
      },
      orderBy: {
        adicionado_em: 'desc',
      },
    })

    data = result;

  } catch (erro:any) {
      return { success: false, error: "Ocorreu um erro ao buscar os personagens!" }
  }

  return { success: true, data: data.map(fav => fav.personagem)};
}

export async function addCharacterToFavorites(
  characterData: {
    api_id: number;
    nome: string;
    thumbnail_url: string;
  },
  session:Session | null
): Promise<ActionResult> {

  if (!session) {
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
        usuario_id: session.user.id,
        personagem_id: personagem.id,
      },
    });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "Este personagem já foi favoritado." };
    }
    console.error('Erro na Server Action:', error);
    return { success: false, error: "Ocorreu um erro interno." };
  }

  revalidatePath('/favorites');

  return { success: true };
}

export async function removeFavorite(personagemId: number, session:Session | null): Promise<ActionResult> {
  
  if (!session?.user?.id) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    await prisma.usuarioPersonagemFavorito.delete({
      where: {
        usuario_id_personagem_id: {
          usuario_id: session.user.id,
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