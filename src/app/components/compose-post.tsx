'use client'

import { useTransition, useRef } from "react"
import { Avatar } from "@heroui/react"
import ComposeSubmitButton from './compose-submit-button'
import { addPost } from "@/app/actions"

export function ComposePost({
  userAvatarUrl,
  onClose
}: {
  userAvatarUrl: string,
  onClose?: () => void
}) {

  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form 
      ref={formRef} 
      action={async (formData: FormData) => {
        if (formData.get('post') === "") return
        startTransition(async() => {
          await addPost(formData)
          formRef.current?.reset()
          if (onClose) onClose()
        })
      }} 
      className='flex flex-row p-3 gap-4 border-white/20'>
      
      <Avatar
        radius="full"
        size="md"
        src={userAvatarUrl}
      />
      <div className='flex flex-1 flex-col gap-y-4'>

        <textarea
          role="textbox"
          name='post'
          rows={4}
          className='w-full max-w-[540px] text-xl font-sans bg-black text-white border-none outline-hidden px-4 py-3 resize-none placeholder-gray-400'
          placeholder='¡¿Qué está pensando?!'
          disabled={isPending}
        ></textarea>

        <ComposeSubmitButton isPending={isPending} />
      </div>

    </form>
  )
}
