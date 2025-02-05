'use client'

import { PostList } from "@/app/components/post-list"
import { Post } from "@/app/types/posts"
import { Tabs, Tab } from "@heroui/react"

export function TabsTweets({posts}: {posts: Post[]}) {
  return (
    <Tabs 
      aria-label="Contenido del perfil"
      fullWidth
      radius='sm'
      variant="underlined"
      placement="top"
      size="lg"
      classNames={{
        tab: 'hover:bg-slate-800/40',
      }}
    >
      <Tab key="posts" title="Tweets">
        <PostList posts={posts as Post[]} />
      </Tab>
      <Tab key="replies" title="Respuestas">
        <p>No hay respuestas disponibles</p>
      </Tab>
      <Tab key="media" title="Fotos y videos">
        <p>No hay fotos ni videos disponibles</p>
      </Tab>
      <Tab key="likes" title="Me gusta">
        <p>No hay publicaciones favoritas</p>
      </Tab>
    </Tabs>
  )
}