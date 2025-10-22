import Card from "@app/components/characters/Card";
import { findUserFavorites } from "@app/lib/serveractions/favoriteActions";

export default async function MeusFavoritosPage() {

  const { error, data } = await findUserFavorites();
  
  if (error === false && data.length === 0) {
    return <p className="text-center">Você ainda não favoritou nenhum personagem.</p>;
  }

  if (error === true && data.length === 0) {
    return <p className="text-center">Houve um error ao buscar os personagens!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Personagens Favoritos</h1>
        <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
          {data.map((char) =>
            <Card 
              key={char.id} 
              variant="favorite"
              char={char}
            />
          )}
        </div>
    </div>
  );
}
