import Link from "next/link"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Lightning Distance Calculator</h1>
      <p>Quickly estimate how far away lightning is using the thunder-lag method.</p>
      <div className="space-x-4">
        <Link href="/calculator" className="underline">
          Go to Calculator →
        </Link>
        <Link href="/blog" className="underline">
          Read the Blog →
        </Link>
      </div>
    </main>
  )
}
