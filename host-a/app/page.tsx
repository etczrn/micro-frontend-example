import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Host A</h1>
      <p>I want to show the products from shared module.</p>
      <nav>
        <ul>
          <li>
            <Link href={'/foo'}>products (from shared)</Link>
            <Link href={'/surveys'}>surveys (for testing)</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
