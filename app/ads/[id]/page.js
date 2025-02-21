export default async function Page({ params }) {
  const { id } = await params;
  return <h1>{id}</h1>;
}
