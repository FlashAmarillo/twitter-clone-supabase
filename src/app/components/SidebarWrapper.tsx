
import { createServerClient } from '@/app/utils/supabase';
import { Sidebar } from './Sidebar'
import { cookies } from 'next/headers'

export default async function SidebarWrapper() {
  const supabase = await createServerClient({ cookies })
  const { data: {user} } = await supabase.auth.getUser()
  
  return (
    <Sidebar 
      avatar_url={user?.user_metadata?.avatar_url}
      name={user?.user_metadata?.name}
      user_name={user?.user_metadata?.user_name}
    />
  )
}