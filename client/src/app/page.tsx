import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import authOptions from './_utils/options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="bg-white my-10 p-10 flex flex-col justify-center gap-10">
          <h1 className="text-2xl">Start using TurboTeX</h1>
          <button
            type="button"
            onClick={() => signIn('descope', { callbackUrl: '/dashboard' })}
            className="text-[#e9e9e9] bg-[#262d3b] py-2 px-7 border-[#45546e] border-4"
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}
