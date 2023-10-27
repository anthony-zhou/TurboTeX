'use client';

import { signIn } from 'next-auth/react';

export default function Home() {
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
