import { NextResponse } from 'next/server'
import { createClient } from '@/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')

  if (provider) {
    const supabase = await createClient()
    const { data } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })
    if (data.url) {
      return NextResponse.redirect(data.url)
    }
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (profile) {
          return NextResponse.redirect(`${origin}/events`)
        }
        return NextResponse.redirect(`${origin}/passport`)
      }
    }
  }

  return NextResponse.redirect(`${origin}?error=auth_failed`)
}
