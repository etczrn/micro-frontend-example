import { prisma } from '@/lib/prisma';

export default async function Page() {
  const products = await prisma.product.findMany();

  // TODO: create product form
  return (
    <main className="mx-auto max-w-prose p-8">
      <h1 className="text-3xl font-bold">Product list</h1>
      <ul className="mt-8">
        {products.map(({ id, name, description, price }) => (
          <li key={id}>
            <article className="my-4 p-4 bg-gray-100 rounded">
              <p>이름: {name}</p>
              <p>설명: {description}</p>
              <p>가격: {price}</p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
