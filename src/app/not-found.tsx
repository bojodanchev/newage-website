import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-mint/10 animate-pulse" />

      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
        404
      </p>
      <h1 className="font-heading text-5xl font-bold gradient-text md:text-7xl">
        Lost in the Void
      </h1>
      <p className="mx-auto mt-6 max-w-md text-center text-lg text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]"
      >
        Back to Home
      </Link>
    </div>
  )
}
