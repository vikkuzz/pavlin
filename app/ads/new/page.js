"use client";
import NewAdsContent from "@/components/newAdsContent";

const NewAdsPage = () => {
  return (
    <div className="flex flex-col z-10 w-full items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-3xl md:text-4xl p-3">
        Новоград Павлино | Написать объявление
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center mt-8">
        <div className="flex flex-wrap gap-3 md:min-w-[600px]">
          <NewAdsContent />
        </div>
      </div>
    </div>
  );
};

export default NewAdsPage;
