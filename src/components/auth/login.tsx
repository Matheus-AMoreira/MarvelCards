import { login } from '@app/lib/serveractions/authActions';

export default function Login() {

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4 w-80">
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
        <button formAction={login} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Entrar
        </button>
      </form>
    </>
  );
}