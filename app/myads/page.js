import AdsContent from "@/components/adsContent";

export const metadata = {
  title: "Новоград Павлино | Мои объявления",
  description: "Собственные",
};

const Page = () => {
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      <h1 className="text-3xl md:text-4xl mt-4">
        Новоград Павлино | Мои объявления
      </h1>
      <AdsContent all={false} />
    </div>
  );
};

export default Page;
