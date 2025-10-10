"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Login from '@app/components/auth/login';
import SignUp from '@app/components/auth/signup';

export default function AuthCard() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoginActive, setIsLoginActive] = useState(pathname.includes('/login'));

  useEffect(() => {
    setIsLoginActive(pathname.includes('/login'));
  }, [pathname]);

  const handleToggle = (type: 'login' | 'signup') => {
    const newPath = `/auth/${type}`;
    if (pathname !== newPath) {
        router.replace(newPath);  
    }
  };

  return (
<div className="flex flex-col items-center justify-center p-4">
  <div
    className={`relative w-full max-w-sm overflow-hidden bg-white border-4 rounded-xl shadow-2xl 
               transition-colors duration-500 h-auto overflow-y-auto 
               ${isLoginActive ? 'border-blue-700' : 'border-red-600'}`}>
    <div
      className="flex w-[200%] transition-transform duration-500 ease-in-out"
      style={{
        transform: isLoginActive ? 'translateX(-50%)' : 'translateX(0%)',
      }}>
      <div className="flex flex-col items-center justify-center flex-shrink-0 w-1/2 p-4 sm:p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-extrabold text-red-600 sm:text-3xl">
          Criar Conta
        </h1>
        <SignUp />
      </div>
    
      <div className="flex flex-col items-center justify-center flex-shrink-0 w-1/2 p-4 sm:p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-extrabold text-blue-700 sm:text-3xl">
          Entrar
        </h1>
        <Login />
      </div>
    </div>

    <div className="mt-[2rem]">
      <button
        type="button"
        aria-label="Alternar para cadastro"
        aria-pressed={!isLoginActive}
        onClick={() => handleToggle('signup')}
        className={`w-1/2 p-3 font-bold transition-colors duration-300 text-md sm:text-lg ${
          !isLoginActive
            ? 'bg-red-600 text-white shadow-inner'
            : 'bg-gray-200 text-gray-500 hover:bg-red-500 hover:text-white'
        }`}
      >
        CADASTRO
      </button>

      <button
        type="button"
        aria-label="Alternar para login"
        aria-pressed={isLoginActive}
        onClick={() => handleToggle('login')}
        className={`w-1/2 p-3 font-bold transition-colors duration-300 text-md sm:text-lg ${
          isLoginActive
            ? 'bg-blue-700 text-white shadow-inner'
            : 'bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white'
        }`}
      >
        LOGIN
      </button>
    </div>
  </div>
</div>
  );
}