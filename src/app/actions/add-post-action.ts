'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/app/utils/supabase' 
import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
  'use server'
  const content = formData.get('post')

  // TODO: Revisar si esta validacion funciona
  if (typeof content !== "string" || content === null || content.trim() === '') {
    throw new Error("El contenido del post no puede estar vacío")
  }

  const supabase = await createServerClient({ cookies })
  
  // revisar si el usuario esta autenticado
  const { data: { user } } = await supabase.auth.getUser()
  
  if(user === null) {
    throw new Error("Usuario no autenticado")
  }

  // hacemos la peticion para guardar el tweet con el user_id
  const { error } = await supabase.from('posts').insert({content, user_id: user.id})

  if (error) {
    throw new Error("Error al guardar el post: " + error.message)
  }

  revalidatePath('/')
}