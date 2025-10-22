import Card from "@app/components/characters/Card";
import { findUserFavorites } from "@app/lib/serveractions/favoriteActions";

function ContentMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
      <p className="text-center">{message}</p>
    </div>
  );
}

export default async function MeusFavoritosPage() {

  const { error, data } = await findUserFavorites();
  
  let mainContent;

  if (error === true) {
    mainContent = <ContentMessage message="Houve um erro ao buscar os personagens!" />;
  } else if (data.length === 0) {
    mainContent = <ContentMessage message="Você ainda não favoritou nenhum personagem." />;
  } else {
    mainContent = (
      <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
        {data.map((char) => (
          <Card 
            key={char.id} 
            variant="favorite"
            char={char}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Personagens Favoritos</h1>
      {mainContent}
    </div>
  );
}
