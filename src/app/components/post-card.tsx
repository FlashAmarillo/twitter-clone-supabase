'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '../utils/supabase'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
  useDraggable,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react"
import {
  MessageCircle,
  Repeat,
  Heart,
  Ellipsis
} from 'lucide-react'
import { useRouter } from 'next/navigation'


export function PostCard({
  postId,
  userFullName,
  userName,
  avatarUrl,
  content,
}: {
  postId: string,
  userFullName: string,
  userName: string,
  avatarUrl: string
  content: string,
}) {

  const router = useRouter()
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const targetRef = useRef<HTMLElement>(null as unknown as HTMLElement)
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen})

  const supabase = createBrowserClient()

  const handleDeleteTweet = async () => {

    // TODO: revisar, esta implementacion funciona correctamente cuando en la tabla posts la row level security (RLS) esta desactivada
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
    
    if(error) {
      console.error('Error eliminando tweet', error)
      return

    } 
    
    // cierra el modal
    onOpenChange()

    // TODO: Optimizar para que cargue los post desde el cache sin tener que recargar la pagina y sin el post eliminado

    // funcion para recargar el cache de la pagina
    router.refresh()

  }

  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="flex justify-between">
        <div className="flex gap-x-2">
          <Link href={`/${userName}`}>
            <Avatar
              radius="full"
              size="md"
              src={avatarUrl}
            />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{`@${userName}`}</h5>
          </div>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius='full' >
              <Ellipsis className='h-4 w-4' />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem 
              key="deleteTweet"
              className="text-danger"
              color="danger"
              onPress={onOpen}
            >
              Delete tweet
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="px-3 py-0 text-medium text-white">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <button aria-label="message">
          <MessageCircle className='h-4 w-4' />
        </button>
        
        <button>
          <Repeat className='h-4 w-4' />
        </button>
        
        <button>
          <Heart className='h-4 w-4' />
        </button>
      </CardFooter>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">¿Deseas eliminar el tweet?</h3>
              </ModalHeader>
              <ModalBody>
                <p>Esta acción no se puede revertir, y se eliminará de tu perfil, de la cronología de las cuentas que te sigan y de los resultados de búsqueda.</p>
              </ModalBody>

              <ModalFooter>
                <Button onPress={onClose} variant="light" radius="full" color="secondary">Cancelar</Button>
                <Button onPress={handleDeleteTweet} variant="light" radius="full" color="danger">Eliminar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
