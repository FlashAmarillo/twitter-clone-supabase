import { createServerClient } from '@/app/utils/supabase'
import { cookies } from 'next/headers'
import { PostList } from '@/app/components/post-list'
import { ComposePost } from '@/app/components/compose-post'
import { type Post } from '@/app/types/posts'

export default async function Home() {

  const supabase = await createServerClient({ cookies })

  const [userResponse, postsResponse] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('posts')
      .select('*, user:users(name, user_name, avatar_url, id)')
      .order('created_at', { ascending: false })
  ])

  const { data: { user } } = userResponse
  const { data: posts } = postsResponse
  
  return (
    <section className='w-full mx-auto border-r border-l border-white/20'>
      <ComposePost userAvatarUrl={user?.user_metadata?.avatar_url} />
      <PostList posts={posts as Post[]} />
    </section>
  )
}
