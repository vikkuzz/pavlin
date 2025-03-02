import NewAdsContent from "@/components/newAdsContent";

export const metadata = {
  title: "Новоград Павлино | Новое объявление",
  description: "Написать новое объявление для жителей Новограда",
  keywords: [
    "новоград объявления",
    "новоград павлино объявления",
    "новоград павлино купить",
    "новоград павлино продать",
    "новоград павлино услуги",
    "Новоград Павлино",
    "жк Новоград Павлино",
    "Новоград Павлино самолет",
    "новоград",
    "павлино",
    "новоград павлино корпус 6",
    "новоград павлино корпус 7",
    "новоград павлино корпус 8",
  ],
};

const NewAdsPage = () => {
  return (
    <div className="flex flex-col z-10 w-full items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-3xl md:text-4xl p-3 tracking-tight">
        Новоград Павлино | Написать объявление
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center mt-8 w-full">
        <div className="flex flex-wrap gap-3 md:min-w-[600px] w-full px-3">
          <NewAdsContent />
        </div>
      </div>
    </div>
  );
};

export default NewAdsPage;
