import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

function Login() {
  const { loginWithRedirect } = useAuth0()

  const login = useMutation({
    mutationFn: async () => {
      await loginWithRedirect({})
      return ''
    },
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto mt-20 max-w-xl flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 m-10 rounded-xl border bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Button
            className="w-full"
            disabled={login.isPending}
            onClick={() => login.mutate()}
          >
            {login.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Login }
