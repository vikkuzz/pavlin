import AdsContent from "@/components/adsContent";
import Image from "next/image";

export const metadata = {
  title: "Новоград Павлино | Объявления",
  description: "Объявления для жителей Новограда Павлино",
};

const AdsPage = () => {
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      <h1 className="text-3xl md:text-4xl mt-4">
        Новоград Павлино | Объявления
      </h1>
      <h2 className="mt-4">
        Объявления дублируются в телеграм:{" "}
        <a
          target="blank"
          href="https://t.me/+prc9QTUPlm8zZjQy"
          className="flex gap-2 items-center justify-center">
          <div className="relative w-6 h-6">
            <Image alt="logo" fill src="/image/logo_telegram.svg" />
          </div>
          <span>Новоград Павлино</span>
        </a>
      </h2>
      <AdsContent all={true} />
    </div>
  );
};

export default AdsPage;
