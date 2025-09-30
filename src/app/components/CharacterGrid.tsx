"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Card from "./Card";
import NavBar from "./navbar/navbar";
import Pagination from './Pagination';
import Footer from './Footer';

export function CharacterGrid() {
  const LIMIT = 20;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [total, setTotal] = useState(0); 

  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    fetch(`/api/characters?limit=${LIMIT}&page=${currentPage}`)
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
          setTotal(data.data.total);
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
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(total / LIMIT);
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/?page=${newPage}`);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  if (isLoading) {
    return <div>Carregando personagens...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <>
      <NavBar isLoggedIn={isUserLoggedIn} />
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}