import { AddForm } from './components/add-form';
import { Card } from './components/card';
import { getProducts } from '@/lib/repositories/product';

export default async function Page() {
  const products = await getProducts();

  return (
    <main className="grid max-w-5xl grid-cols-1 p-8 mx-auto gap-x-4 md:grid-cols-2">
      <section>
        <h1 className="mb-8 text-3xl font-bold">Product list</h1>
        <ul>
          {products.map(({ id, name, description, price }) => (
            <li key={id}>
              <Card
                id={id}
                name={name}
                description={description}
                price={price}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="sticky self-start col-span-1 top-8">
        <AddForm />
      </section>
    </main>
  );
}
