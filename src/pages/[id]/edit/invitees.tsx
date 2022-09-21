import dynamic from 'next/dynamic'

const Grid = dynamic(
  () => {
    return import('../../../components/InviteeGrid')
  },
  { ssr: false },
)

const InviteesPage = () => {
  return <Grid />
}

export default InviteesPage
