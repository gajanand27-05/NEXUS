import { SITE_TAGLINE } from '@/lib/constants'

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-md gap-8">
        <div className="size-16 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-indigo-600">N</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Nexus
          </h1>
          <p className="text-lg text-gray-500">
            {SITE_TAGLINE}
          </p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <a
            href="/auth/callback?provider=google"
            className="w-full h-11 flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>

          <a
            href="/auth/callback?provider=github"
            className="w-full h-11 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.82 8.2 11.4.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.24-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.84 2.83 1.31 3.52 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.46-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.28 1.22A11.4 11.4 0 0 1 12 5.84c1.02.01 2.04.14 3 .4 2.28-1.54 3.28-1.22 3.28-1.22.66 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.46 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.83.58C20.56 21.82 24 17.31 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            Continue with GitHub
          </a>
        </div>

        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
