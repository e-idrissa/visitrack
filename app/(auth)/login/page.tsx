import { Login } from "@/components/custom/form/login";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col space-y-6 items-center w-full">
      <div className="flex flex-col space-y-2 items-center">
        <h2 className="uppercase text-xl font-semibold">Login</h2>
        <p className="text-center text-sm text-primary">
          Provide your credentials to access VisiTrack
        </p>
      </div>
      <Login />
      <div className="text center text-primary">
        Don&apos;t have an account ?
        <Link href="/sign-up" className="text-[#9181f4]"> Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
