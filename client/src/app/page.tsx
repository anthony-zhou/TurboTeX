import Editor from '../components/editor/Editor';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Editor />
      </div>
    </main>
  );
}
