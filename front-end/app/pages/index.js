// frontend\pages\index.js
'use client';
import Link from 'next/link';

export default function Home() {
  const categories = ['vegetables', 'fruits', 'meat'];
  return (
    <div className="min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Ecommerce Home</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {categories.map(cat => (
          <Link key={cat} href={`/${cat}`}>
            <div className="border rounded-lg p-6 shadow hover:shadow-lg cursor-pointer bg-green-100">
              <h2 className="text-xl capitalize">{cat}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
