"use client"

import { useState, useEffect } from 'react';

import { character } from '../types/character'
import Card from "./components/card";
import NavBar from "./components/navbar";

export default function Home() {
  const [characters, setCharacters] = useState<character[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    setIsLoading(true);
    fetch('/api/characters')
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data && data.data.results) {
          setCharacters(data.data.results);
          console.log(data.data.results);
        } else {
          throw new Error('Formato de dados da API inesperado.');
        }
      })
      .catch(error => {
        setError(error.message);
        console.error("Erro na requisição:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Carregando personagens...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <div className="mainContainer">
      {characters.map((char) => {
        const { 
          id, 
          name, 
          thumbnail, 
          comics, 
          series, 
          stories 
        } = char;

        const fullThumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;

        return (
            <Card 
              key={id} 
              thumbnail={fullThumbnailUrl}
              name={name}
              comics={comics.available} 
              series={series.available} 
              stories={stories.available}
            />
        );
      })}
      </div>
    </>
  )
}
