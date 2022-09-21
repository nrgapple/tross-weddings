import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const PrettyGridWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box border="1px" borderColor="blackAlpha.300" borderRadius="5px">
      {children}
    </Box>
  )
}
