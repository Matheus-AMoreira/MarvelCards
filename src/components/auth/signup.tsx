import { signup } from '@app/lib/serveractions/authActions';

export default function SignUp() {

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Sing Up</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          id="username"
          name="username"
          type="username"
          placeholder="Nome de usuário"
          required
          className="p-2 border rounded"
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Seu e-mail"
          required
          className="p-2 border rounded"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Sua senha"
          required
          minLength={6}
          className="p-2 border rounded"
        />
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="Sua senha novamente"
          required
          minLength={6}
          className="p-2 border rounded"
        />
        <button formAction={signup} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Cadastrar
        </button>
      </form>
    </>
  );
}