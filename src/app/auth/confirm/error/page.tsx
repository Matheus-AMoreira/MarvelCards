"use client"

import { sendConfirmation, sendConfirmationResult } from '@app/lib/serveractions/authActions';
import { useState } from 'react';

export default function ErrorPage() { 
    const [error, setError] = useState<sendConfirmationResult>({error: false, mensagem:''})
    const [isSending, setIsSending] = useState(false);

    async function handleConfirmation(FormData:FormData){
        setIsSending(true)
        const email = FormData.get("email") as string;
        setError(await sendConfirmation({email}))
        setIsSending(false)
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-5 border border-gray-300 rounded-lg shadow-lg bg-white">

            {error.error ? (
                <p className="text-red-600 font-semibold">{error.mensagem}</p>
            ) : (
                <p className="text-green-600 font-bold mt-4">
                    {error.mensagem}
                </p>
            )}
            <h2 className="mt-8 pb-2 border-b border-gray-200 text-xl font-semibold">
                Solicitar Novo Link de Confirmação
            </h2>
            <p className='text-sm mt-2'>
                Houve um erro na vereficação de email!
            </p>
            <p className='text-sm'>
                Entre com o seu email e tente novamente
            </p>
            <form action={handleConfirmation} className="flex flex-col gap-4 mt-6">
                <label htmlFor="email" className="font-bold text-gray-700">Seu E-mail:</label>
                <input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="seu.email@exemplo.com"
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit"
                    className="p-3 bg-blue-600 text-white font-semibold rounded-md cursor-pointer 
                            hover:bg-blue-700 transition-colors duration-200"
                >
                    {isSending ? "Enviando Link" : "Reenviar Link"}
                </button>
            </form>
            <p className="mt-5 text-sm text-gray-500 text-center">
                Observação: O link anterior será invalidado assim que um novo for solicitado.
            </p>
            
        </div>
    );
}