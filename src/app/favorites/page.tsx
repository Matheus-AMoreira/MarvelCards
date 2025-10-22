import FavoritesList from "@app/components/characters/FavoritesList";
import { findUserFavorites, removeFavorite } from "@app/lib/serveractions/favoriteActions";
import { createClient } from "@app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function MeusFavoritosPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    redirect('/auth/login');
  }

  const result = await findUserFavorites();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Personagens Favoritos</h1>
      {result.success ? (
          <FavoritesList initialFavorites={result.data} />
        ) : (
          <p className="text-red-500">{result.error}</p>
        )
      }
    </div>
  );
}
