"use client"

import { signup, signupResult } from '@app/lib/serveractions/authActions';
import { useState } from 'react';

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<signupResult>({error: true, messagem: ''});
  const [ incorretPasswords, setIncorretPasswords] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  async function handleSingUp(formData: FormData){
    setIsSigning(true)

    const user = {
      email: email,
      password: formData.get('password') as string,
      passwordConfirmation: formData.get('passwordConfirmation') as string,
      options:{
        data: {
          username: userName,
        }
      }
    }

    if(user.password != user.passwordConfirmation){
      alert("Senha não são iguais!");
      setIncorretPasswords(true);
    }

    if(user.password == user.passwordConfirmation){
      const result = await signup(user);
      if(result.error){
        setError(result);
      }
      else{
        alert("Por favor verefique o email para confirmação!");
        setIncorretPasswords(false);
        setError(result);
        setUserName('');
        setEmail('');
      }
    }
    
    setIsSigning(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Sing Up</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          id="username"
          onChange={(e)=> setUserName(e.target.value)}
          value={userName}
          type="username"
          placeholder="Nome de usuário"
          required
          className={`p-2 border rounded ${!error.error && "border-green-500"}`}
        />
        <input
          id="email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Seu e-mail"
          required
          className={`p-2 border rounded ${!error.error && "border-green-500"}`}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Sua senha"
          required
          minLength={8}
          className={`p-2 border rounded ${incorretPasswords && "border-red-500"} ${!error.error && "border-green-500"}`}
        />
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="Sua senha novamente"
          required
          minLength={8}
          className={`p-2 border rounded ${incorretPasswords && "border-red-500"} ${!error.error && "border-green-500"}`}
        />
        {error && 
          <p className={error.error ? "text-red-500":"text-green-500"}>
            {error.messagem}
          </p>
          }
        <button formAction={handleSingUp} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isSigning ? "Vereficando credenciais..." : "Cadastrar"}
        </button>
      </form>
    </>
  );
}