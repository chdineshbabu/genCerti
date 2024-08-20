"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Logo from "../../public/gencertiLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  function next() {
    if (user) {
      router.push("/dash");
    } else {
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen px-48 pb-0 py-20">
      <div className="flex justify-between items-center">
        <Image src={Logo} alt="genCerti Logo" width={200} height={200} />
        {user ? (
          <div className="flex items-center gap-2">
            <IoPersonCircleOutline /> {user?.displayName}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <IoPersonCircleOutline />
            guest
          </div>
        )}
      </div>
      <div className="py-36 pb-0 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-center">
          The NextGen <span className="text-black  bg-customGreen">Certificate</span>
          <br /> Creation Method
        </h1>
        <h1 className="text-center p-8 font-thin text-xl">
          Unlock a new era of trust with NextGen Certificates leveraging
          <span className="text-customGreen"> blockchain</span> for secure validation. <br />
          Instantly verify your achievements and success with confidence.
        </h1>
        <button className="border-2 font-bold hover:scale-110 transition-transform delay-75 hover:border-white border-gray-500 px-8 py-2 hover:bg-customGreen hover:text-black hover:shadow-inner shadow-black" onClick={next}>
          Get Start
        </button>{" "}
      </div>
      <div></div>
    </main>
  );
}
