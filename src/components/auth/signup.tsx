"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@app/context/SupabaseProvider';

export default function SignUp() {
  const { supabase } = useSupabase();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Erro no cadastro:', error.message);
      setError('Não foi possível realizar o cadastro. Verifique seu e-mail e senha.');
    } else {
      setMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar sua conta.');
      
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Sing Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
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
          minLength={6}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Cadastrar
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
      </form>
    </>
  );
}