"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@app/context/SupabaseProvider';

export default function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Erro no login:', error.message);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } else {
      router.push('/characters');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Entrar
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </>
  );
}