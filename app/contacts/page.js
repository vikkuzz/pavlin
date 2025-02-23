import Image from "next/image";

export const metadata = {
  title: "Новоград Павлино | Контакты",
  description: "Контакты для свзяи с владельцем сайта",
};

const Page = () => {
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      <h1 className="text-3xl md:text-4xl mt-4">Новоград Павлино | Контакты</h1>
      <p>
        <a
          href="https://t.me/vikkuzz"
          className="flex gap-2 items-center justify-center mt-8">
          <div className="relative w-6 h-6">
            <Image alt="logo" fill src="/image/logo_telegram.svg"></Image>
          </div>
          <span>@vikkuzz</span>
        </a>
      </p>
    </div>
  );
};

export default Page;
