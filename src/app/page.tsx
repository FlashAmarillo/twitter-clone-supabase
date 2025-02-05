import { createServerClient } from '@/app/utils/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Root() {
  const supabase = await createServerClient({ cookies })
  const {data: { session }} = await supabase.auth.getSession()

  // Revisar que hacer con este archivo, o si se puede mejorar esta parte
  if(!session) {
    redirect('/login')
  } else {
    redirect('/home')
  }

}
