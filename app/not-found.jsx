import Link from 'next/link';

export const metadata = {
  title: 'Sahifa topilmadi (404)',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
        <p className="text-muted-foreground mb-8">
          Siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
