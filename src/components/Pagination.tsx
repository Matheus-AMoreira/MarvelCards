"use client"

import Link from 'next/link';
import LimitSelector from '@app/components/LimitSelector';

interface PaginationProps {
  totalChars: number;
  limit: number;
  offset: number;
  searchQuery?: string;
}

export default function Pagination({ totalChars, limit, offset, searchQuery }: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalChars / limit);

  const createPageUrl = (page: number) => {
    const newOffset = (page - 1) * limit;
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('offset', newOffset.toString());

    if (searchQuery) {
      params.set('query', searchQuery);
    }
    
    return `characters/?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const getLinkClassName = (isActive: boolean, isNavButton = false) => {
    const baseClasses = 'font-bold py-2 px-4 rounded';
    if (isActive) {
      return `${baseClasses} bg-red-600 text-white`;
    }
    if (isNavButton) {
        return `${baseClasses} bg-gray-700 hover:bg-gray-600 text-white`;
    }
    return `${baseClasses} bg-gray-300 hover:bg-gray-400 text-black`;
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex flex-wrap flex-col items-center my-4">
      <span className="text-sm text-gray-400">
        Página {currentPage} de {totalPages}
      </span>
      <div className="flex flex-col justify-center items-center gap-1 
                xl:flex-row xl:justify-center xl:items-center xl:gap-4">
        <LimitSelector limit={limit} searchQuery={searchQuery} />

        {totalPages > 1 && (
          <>
            <div className="flex flex-wrap justify-center items-center gap-1">
              <Link href={createPageUrl(1)} className={`${getLinkClassName(false, true)} ${currentPage === 1 ? disabledClasses : ''}`}>
                Início
              </Link>
              <Link href={createPageUrl(currentPage - 1)} className={`${getLinkClassName(false, true)} ${currentPage === 1 ? disabledClasses : ''}`}>
                Anterior
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center place-content-evenly gap-4">
              {pageNumbers.map((number) => (
                <Link
                  key={number}
                  href={createPageUrl(number)}
                  className={getLinkClassName(currentPage === number)}
                >
                  {number}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-1">
              <Link href={createPageUrl(currentPage + 1)} className={`${getLinkClassName(false, true)} ${currentPage === totalPages ? disabledClasses : ''}`}>
                Próxima
              </Link>
              <Link href={createPageUrl(totalPages)} className={`${getLinkClassName(false, true)} ${currentPage === totalPages ? disabledClasses : ''}`}>
                Fim
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}