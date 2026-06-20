import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <p className="text-8xl font-extrabold text-(--accent)">404</p>
      <h1 className="mt-4 text-3xl font-bold text-(--primary)">Page Not Found</h1>
      <p className="mt-3 text-gray-600 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-(--primary) text-white font-semibold px-8 py-3 rounded hover:bg-[#1a3a5c] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
