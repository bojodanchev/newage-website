export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative">
        {/* Spinning gradient ring */}
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-transparent border-t-accent-purple border-r-accent-mint" />
        {/* Pulsing center text */}
        <span className="absolute inset-0 flex items-center justify-center font-heading text-xs font-bold gradient-text animate-pulse">
          NA
        </span>
      </div>
    </div>
  )
}
