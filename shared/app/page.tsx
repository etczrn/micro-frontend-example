import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-prose p-8">
      <h1 className="text-3xl font-bold">마이크로 프론트엔드 모듈</h1>
      <nav className="mt-8">
        <h2 className="text-2xl font-bold">링크 바로가기</h2>
        <ul className="mt-4">
          <li>
            <Link href={'/products'}>상품 리스트</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
