import OneAdContent from "@/components/oneAdContent";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <>
      <OneAdContent id={id}></OneAdContent>
    </>
  );
}
