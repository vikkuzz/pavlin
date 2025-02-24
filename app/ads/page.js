import AdsContent from "@/components/adsContent";

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
      <AdsContent all={true} />
    </div>
  );
};

export default AdsPage;
