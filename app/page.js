"use client";

import Link from "next/link";
import { useAuth } from "../AuthContext";
import ReactPlayer from "react-player/lazy";

export default function MyApp() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-3xl md:text-4xl pt-4 px-2">Новоград Павлино</h1>
      <div className="flex flex-col gap-4 justify-center items-center mt-8">
        <div className="flex flex-col gap-4 p-3">
          <h2>Новости</h2>
          <h3>
            20.02.2025 "Самолет" выложил новое видео о ходе строительства
            новостроек
          </h3>
        </div>
        <div className="hidden md:block">
          <ReactPlayer
            width={640}
            controls
            url="https://media.samolet.ru/video/%D0%9D%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B8%D0%BD%D0%BE%20%D1%84%D0%B5%D0%B2%D1%80%D0%B0%D0%BB%D1%8C%202025.mp4"
          />
        </div>
        <div className="md:hidden">
          <ReactPlayer
            width={320}
            height={200}
            controls
            url="https://media.samolet.ru/video/%D0%9D%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B8%D0%BD%D0%BE%20%D1%84%D0%B5%D0%B2%D1%80%D0%B0%D0%BB%D1%8C%202025.mp4"
          />
        </div>
        {/* {user ? (
            <>
              <p className="text-xl">Welcome, {user.email}!</p>
              <Link
                href="/protected"
                className="text-blue-500 underline text-lg">
                <p>Visit the protected page</p>
              </Link>
              <SignOut />
            </>
          ) : (
            <>
              <p className="text-xl">You are not signed in.</p>
              <Link href="/login">
                <button className="p-2 rounded-sm bg-blue-500 text-lg font-semibold text-white w-48">
                  Login here
                </button>
              </Link>
              <Link href="/signup">
                <button className="p-2 rounded-sm bg-blue-500 text-lg font-semibold text-white w-48">
                  Signup here
                </button>
              </Link>
            </>
          )} */}
      </div>
    </div>
  );
}
