'use client'

import { useRef } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/app/utils/supabase'
import {
  Avatar,
  Button,
  useDisclosure,
  useDraggable,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react"
import { House, User, Ellipsis } from "lucide-react"
import { ComposePost } from "./compose-post"

interface SidebarProps {
  avatar_url: string;
  name: string;
  user_name: string;
}

export const Sidebar = ( props: SidebarProps) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const targetRef = useRef<HTMLElement>(null as unknown as HTMLElement) 
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen})
  const supabase = createBrowserClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="flex flex-col justify-between h-screen p-4 over-flow-y-auto">
      <div className="flex flex-col items-start last-of-type:mt-4 gap-y-2">
        <Link 
          href="/home"
          className="flex gap-2 rounded-full pl-2 items-center hover:bg-zinc-800 transition-colors "
        >
          <House />
          <p className="block py-2 px-4 text-lg font-bold">Home</p>
        </Link>

        <Link 
          href={`/${props.user_name}`}
          className="flex gap-2 rounded-full pl-2 items-center hover:bg-zinc-800 transition-colors "
        >
          <User />
          <p className="block py-2 px-4 text-lg font-bold">Profile</p>
        </Link>
        
        <Button 
          onPress={onOpen} 
          className="w-full font-bold bg-sky-400 text-[17px] " 
        >Tweet</Button>

      </div>
      <div className="flex items-center gap-x-2 p-4">
        <div className="flex">
          <Avatar src={props.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-4">
            <p className="text-sm font-semibold">{props.name}</p>
            <p className="text-sm text-gray-500">@{props.user_name}</p>
          </div>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius='full' >
              <Ellipsis className='h-4 w-4' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem 
              key='logout'
              color="danger"
              className="text-danger"
              onPress={handleSignOut}
            >Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">Compose a new tweet</h3>
                <p className="text-gray-500">What's happening?</p>
              </ModalHeader>
              <ModalBody>
                <ComposePost userAvatarUrl={props.avatar_url} onClose={onClose}  />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  )
}