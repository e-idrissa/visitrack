import { Login } from "./form/login"

const LoginForm = () => {
  return (
    <div className='flex flex-col space-y-6 items-center'>
      <div className="flex flex-col space-y-2 items-center">
        <h2 className='uppercase text-xl font-semibold'>Login</h2>
        <p className="text-primary">
            Provide your credentials to access VisiTrack
        </p>
      </div>
      <Login />
    </div>
  )
}

export default LoginForm