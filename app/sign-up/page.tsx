import SignUpForm from "@/components/custom/sign-up";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1 flex items-center justify-center">
        <SignUpForm />
      </div>
      <div className="relative hidden md:flex bg-gradient-to-tr from-[#9181fa] to-[#5038ed] min-h-screen p-40 items-center justify-center">
        <div className="relative rounded-2xl bg-white/20 p-4 lg:p-8 border border-white font-semibold text-white tracking-wide text-lg lg:text-xl xl:text-2xl w-80 xl:pb-40">
          <span>
            Very good<br />
            works are<br />
            waiting for<br />
            you Login<br />
            Now!!!
          </span>
          <Image src="/woman.png" alt="photo" width={1000} height={1000} className="absolute hidden xl:block -bottom-[1px] -right-10"/>
          <Image src="/logo.png" alt="photo" width={40} height={40} className="absolute bottom-12 -left-5"/>
        </div>
      </div>
    </main>
  );
}
