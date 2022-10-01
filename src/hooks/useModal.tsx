import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useBoolean } from 'ahooks'
import { ReactElement, useMemo } from 'react'

interface UseModalProps {
  title: string
  body: ReactElement
}

export const useModal = ({ title, body }: UseModalProps) => {
  const [isOpen, { toggle }] = useBoolean(false)

  const modalContent = useMemo(
    () => (
      <Modal isOpen={isOpen} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>{title}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    ),
    [isOpen, toggle],
  )

  const modalButton = useMemo(
    () => <Button onClick={toggle}>{title}</Button>,
    [toggle, title],
  )

  return { modalContent, modalButton, isOpen } as const
}
