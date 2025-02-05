'use client'

import { memo } from "react"
import { Button } from "@heroui/react"

const ComposeSubmitButton = memo(function ComposeSubmitButton({
  isPending
}: {
  isPending: boolean
}) {

  return (
    <Button
      disabled={isPending}
      type='submit'
      className='bg-sky-400 text-sm disabled:bg-slate-300 disabled:opacity-40 disabled:pointer-events-none font-bold rounded-full px-5 py-2 self-end'
    >
      {isPending ? 'Enviando tweet...' : 'Tweet'}
    </Button>
  )
})

export default ComposeSubmitButton