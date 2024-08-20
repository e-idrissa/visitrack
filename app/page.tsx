import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1">
        Form
      </div>
      <div className="reltive hidden md:block bg-gradient-to-tr from-[#9181fa] to-[#5038ed] min-h-screen p-40">
        <div className="rounded-2xl bg-white/20 p-8 border border-white font-semibold text-white tracking-wide text-2xl w-96 pb-40">
          Very good<br />
          works are<br />
          waiting for<br />
          you Login<br />
          Now!!!
        </div>
        <Image src="/woman.png" alt="photo" width={500} height={400} className="absolute bottom-44 right-16"/>
        <Image src="/logo.png" alt="photo" width={40} height={40} className="absolute bottom-52 right-[30rem]"/>
      </div>
    </main>
  );
}
