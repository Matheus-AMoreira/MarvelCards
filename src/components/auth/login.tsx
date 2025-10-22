"use client"

import { login } from '@app/lib/serveractions/authActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [isLoging, setIsLoging] = useState(false);
  
    async function handleLogin(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      setIsLoging(true)

      const formData = new FormData(event.currentTarget);

      const user = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }

      try {
        const result = await login(user)
        if(result.error){
          alert("Houve um erro ao tentar realizar o login")
        }
        else{
          router.push("/characters")
        }
      } catch (error) {
            alert("Houve um erro inesperado")
      } finally {
        setIsLoging(false);
      }
    }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          id="emailLogin"
          name="email"
          type="email"
          placeholder="Seu e-mail"
          required
          className="p-2 border rounded"
        />
        <input
          id="passwordLogin"
          name="password"
          type="password"
          placeholder="Sua senha"
          required
          className="p-2 border rounded"
        />
        <button type="submit" disabled={isLoging} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          {isLoging ? "Vereficando credenciais..." : "Entrar"}
        </button>
      </form>
    </>
  );
}