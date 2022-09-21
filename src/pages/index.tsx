import { Button, Heading, VStack } from '@chakra-ui/react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = ({ providers }) => {
  const session = useSession();
  return (
    <VStack>
      {session.status === 'authenticated' ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => signIn(providers[0])}>Sign In</Button>
      )}
      <Heading>Welcome to Tross Weddings</Heading>
    </VStack>
  );
};

export default IndexPage;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
