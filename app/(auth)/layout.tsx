import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1 flex items-center justify-center pt-16 md:pt-0">
        {children}
      </div>
      <div className="relative hidden md:flex bg-gradient-to-tr from-[#9181fa] to-[#5038ed] min-h-screen items-center justify-center w-full h-full">
        <div className="bg-white/20 border border-white/50 rounded-2xl p-8 text-xl lg:text-2xl xl:text-3xl font-bold text-white pr-32 xl:pr-64 pb-72">
          <p>
            Very good
            <br />
            works are
            <br />
            waiting for
            <br />
            you Login
            <br />
            Now!!!
          </p>
          <Image
            src="/woman.png"
            alt="photo"
            width={750}
            height={750}
            className="absolute hidden xl:block bottom-[15.5rem] right-20"
          />
          <Image
            src="/logo.png"
            alt="photo"
            width={40}
            height={40}
            className="absolute bottom-80 lg:left-56 left-[3.5rem]"
          />
        </div>
      </div>
    </main>
  );
}
