import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center gap-4">
      <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl text-gray-400">?</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/events"
        className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors inline-flex items-center"
      >
        Go to Discover
      </Link>
    </div>
  )
}
