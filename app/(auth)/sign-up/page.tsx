import { SignUp } from "@/components/custom/form/sign-up";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col space-y-6 items-center w-full">
      <div className="flex flex-col space-y-2 items-center">
        <h2 className="uppercase text-xl font-semibold">sign up</h2>
        <p className="text-center text-sm text-primary">
          Create your authentication credentials
        </p>
      </div>
      <SignUp />
      <div className="text-center text-primary">
        Already have an account ?
        <Link href="/sign-in" className="text-[#9181f4]"> Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
