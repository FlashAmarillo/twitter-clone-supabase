import { PostCard } from "./post-card"
import { Post } from '@/app/types/posts'

export function PostList ({ posts }: { posts: Post[] | null }) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content
          } = post

          const {
            user_name: userName,
            name: userFullName,
            avatar_url: avatarUrl,
          } = user
          
          return (
            <PostCard 
              key={id}
              postId={id}
              userFullName={userFullName}
              avatarUrl={avatarUrl}
              userName={userName}
              content={content}
            />
          )
        })
      }
    </>
  )
}
