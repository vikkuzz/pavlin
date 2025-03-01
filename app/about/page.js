import AboutContent from "@/components/aboutContent";

export const metadata = {
  title: "Новоград Павлино | Отзывы",
  description: "Мнения людей о жк Новоград Павлино",
};

const Page = async () => {
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      <h1 className="text-3xl md:text-4xl mt-4">
        Новоград Павлино | Мнения о ЖК
      </h1>
      <div className="flex flex-col gap-12 pb-16">
        <AboutContent />
      </div>
    </div>
  );
};

export default Page;
