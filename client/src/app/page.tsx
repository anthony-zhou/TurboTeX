import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from './_utils/options';
import Homepage from './homepage';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }

  return (
    <Homepage />
  );
}
