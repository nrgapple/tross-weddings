import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Grid = dynamic(
  () => {
    return import('../../../components/InviteeGrid')
  },
  { ssr: false },
)

const InviteesPage = () => {
  const weddingName = useRouter().query.name as string
  return <Grid weddingName={weddingName} />
}

export default InviteesPage
