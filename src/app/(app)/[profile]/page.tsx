import { createServerClient } from '@/app/utils/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type Post } from '@/app/types/posts'
import { Avatar, Button } from "@heroui/react"
import { CalendarIcon, MapPinIcon, LinkIcon } from 'lucide-react'
import { TabsTweets } from './components/Tabs-tweets'


export default async function Page() {

  const supabase = await createServerClient({ cookies })

  //TODO: arreglar el bug cuando desde el navegador vamos a /ashdiuas o cualquier ruta renderiza el perfil de usuario, deberia redirigirte a la pagina de error o al perfil del usuario autenticado

  try {
    const [userResponse, postsResponse] = await Promise.all([
      supabase.auth.getUser(),
      supabase
        .from('posts')
        .select('*, user:users(name, user_name, avatar_url, id)')
        .order('created_at', { ascending: false })
    ])

    const { data: { user } } = userResponse
    const { data: userPosts } = postsResponse

    return (  
      <>
        <div className="relative">
          <div className="h-48 bg-gray-700">
            {/* Aquí puedes agregar una imagen de portada si la tienes */}
          </div>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <Avatar 
              src={user?.user_metadata?.avatar_url} 
              alt={user?.user_metadata?.name} 
              className="w-32 h-32 border-4 border-black"
            />
          </div>
        </div>
        
        <div className="mt-16 px-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold">{user?.user_metadata?.name}</h1>
              <p className="text-gray-500">@{user?.user_metadata?.user_name}</p>
            </div>
            <Button color="primary" variant="bordered">
              Editar perfil
            </Button>
          </div>
          
          <p className="mb-2">Biografía del usuario (si está disponible)</p>
          
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-4">
            <span className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1" />
              Ubicación
            </span>
            <span className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-1" />
              <a href="#" className="text-blue-400">enlace.com</a>
            </span>
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              Se unió en {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex gap-4 text-sm mb-4">
            <span><strong>100</strong> Siguiendo</span>
            <span><strong>200</strong> Seguidores</span>
          </div>

        </div>
        
        <TabsTweets  posts={userPosts as Post[]} />
      </>
    )
    
  } catch (error) {
    console.error("Error loading page:", error)
    redirect("/error")
  }

}
