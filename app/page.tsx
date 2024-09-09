import { redirect } from 'next/navigation'

const RootPage = () => {
  return redirect('/login')
}

export default RootPage