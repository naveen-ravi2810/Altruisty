import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar/>
      <div className="h-96 flex justify-center items-center">
        <p className="text-center text-3xl ">GET BUILD YOUR FUTURE HERE @ ALTRUISTY</p>
      </div>
      <div className="flex justify-center gap-20">
        <Link className="p-2 bg-green-300 hover:bg-green-500 rounded-2xl" href='/login'>Login</Link>
        <Link className="p-2 bg-green-300 hover:bg-green-500 rounded-2xl" href='/register'>Register</Link>
      </div>
    </main>
  );
}
