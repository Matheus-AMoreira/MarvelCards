'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@app/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/auth/error')
  }

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        clearInterval(interval)
        resolve(null)
      }
    }, 100)
  })

  redirect('/')
}

export async function signup(formData: FormData) {
  const passwordConfirmation = formData.get('passwordConfirmation') as string;
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options:{
      data: {
        username: formData.get('username') as string,
      }
    }
  }

  if(data.password != passwordConfirmation){
    console.log("Senhas não são iguais");
  }else{
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp(data)

    if (error) {
      console.log(error)
      redirect('/auth/error')
    }
    
    redirect('/')
  }
}