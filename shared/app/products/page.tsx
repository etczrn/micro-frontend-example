import { AddForm } from './components/add-form';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const products = await prisma.product.findMany();

  return (
    <main className="mx-auto max-w-5xl p-8 grid grid-cols-2 gap-x-4">
      <section className="col-span-1 sticky top-0">
        <h1 className="mb-8 text-3xl font-bold">Product list</h1>
        <ul>
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
      </section>
      <section>
        <AddForm />
      </section>
    </main>
  );
}
