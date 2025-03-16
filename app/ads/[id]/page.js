import OneAdContent from "@/components/oneAdContent";

export const metadata = {
  title: "Новоград Павлино | Объявление",
  description: "Объявление для жителей Новоград Павлино",
};

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <>
      <OneAdContent id={id}></OneAdContent>
    </>
  );
}
