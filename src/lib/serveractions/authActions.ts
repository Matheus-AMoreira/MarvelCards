'use server'

import { createClient } from '@app/utils/supabase/server'

interface userLogin{
  email: string,
  password: string,
}

export interface loginResult{
  error:boolean,
}

export async function login(user:userLogin) : Promise<loginResult> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(user)
  if (error) {
    return { error: true};
  }else {
    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          clearInterval(interval)
          resolve(null)
        }
      }, 100)
    })
    return { error: false};
  }
}

interface userSignUp{
  email: string,
  password: string,
  passwordConfirmation?: string,
  options:{
    data: {
      username: string,
    }
  }
}

export interface signupResult{
  error:boolean, 
  messagem:string
}

export async function signup(user : userSignUp) : Promise<signupResult> {

  if(user.password != user.passwordConfirmation || user.password.length <= 8){
    return { error:true, messagem:"Os dois campos de senha precisam ser idênticos e possuir mais de 8 caracteres!" }
  }else{
    const supabase = await createClient()

    delete user.passwordConfirmation;

    const { error } = await supabase.auth.signUp(user)

    if (error) {
      return { error:true, messagem:`Error code ${error.code}: ${error.message}` }
    }else{
      return { error:false ,messagem:"Usuário foi criado com sucesso!\nVerefique o email para confirmação." }
    }

  }
}