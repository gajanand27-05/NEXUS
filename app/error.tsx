'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center gap-4">
      <div className="size-16 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-2xl">!</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900">Something went wrong</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
