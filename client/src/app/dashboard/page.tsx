import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/app/_utils/options';
import Editor from '@/components/editor/Editor';

// const getData = async () => {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect('/api/auth/signin?callbackUrl=/dashboard');
//   }

//   const email = encodeURIComponent(session?.user?.email || '');
//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/airtable?
// email=${email}&secret=${process.env.NEXT_PRIVATE_SECRET_TOKEN}`,
//   );
//   if (res.status === 401) {
//     throw new Error('Unauthorized');
//   }
//   const data = await res.json();
//   return data.body;
// };

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  //   const airtableRecord = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <Editor />
      </div>
    </main>
  );
}
