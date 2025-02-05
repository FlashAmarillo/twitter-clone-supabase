'use client'

import { GitHubIcon, GoogleIcon, AppleIcon } from '@/app/components/Icons'
import { Button } from "@heroui/button"
import { Bird } from 'lucide-react'
import { createBrowserClient } from '@/app/utils/supabase'

export default function LoginPage() {

  const supabase = createBrowserClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 p-8 flex flex-col justify-center items-center text-white">
        <div className="mb-8">
          <Bird className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TwitterClone</h1>
        <p className="text-xl md:text-2xl text-center max-w-md">
          Connect with friends and join the world's conversation
        </p>
        <div className="mt-12 space-y-4 text-center">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold">Real-time Updates</h3>
            <p>Stay informed with live tweets</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold">Global Community</h3>
            <p>Connect with millions worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 p-8 flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Join the Conversation
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Experience what's happening in the world right now
            </p>
          </div>

          <div className="mt-8 space-y-4">

            <Button
              type="button" 
              className="w-full font-semibold text-sm flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-gray-900 text-white hover:bg-gray-900/70 transition-all duration-200 disabled:opacity-50"
              onPress={handleSignIn}
            >
              <GitHubIcon className='w-5 h-5"' />
              Continue with Github
            </Button>

            <Button
              type="button"
              disabled
              className="w-full font-semibold text-sm flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5 text-red-500" />
              Continue with Google
            </Button>

            <Button
              type="button"
              disabled
              className="w-full font-semibold text-sm flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[#050708] text-white hover:bg-[#050708]/90 transition-all duration-200 disabled:opacity-50"
            >
              <AppleIcon className="w-5 h-5" />
              Continue with Apple
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              Continue as Guest
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
          </p>
        </div>
      </div>

    </div>
  )
}
