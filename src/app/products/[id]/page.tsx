import { notFound } from 'next/navigation';
import { Product } from '@/app/api/products/route';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function fetchProduct(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const collection = dbConnect('products');
  const prod = await collection.findOne({ _id: new ObjectId(id) } as any) as Product | null;
  return prod;
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  if (!product) return notFound();

  return (
    <div className="mx-auto w-11/12 max-w-7xl py-12 md:py-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Image (golden ratio smaller column ~38%) */}
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-square w-full max-w-md rounded-3xl overflow-hidden border border-base-300/60 dark:border-base-600/40 bg-base-100/40 backdrop-blur-xl p-2">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image src={product.image_url || '/placeholder.png'} alt={product.name} fill className="object-cover" />
          </div>
        </div>
      </div>
      {/* Content (larger column ~62%) */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
            {product.brand && <span>Brand: <strong>{product.brand}</strong></span>}
            <span>Category: <strong>{product.category}</strong></span>
            {product.subcategory && <span>Sub: <strong>{product.subcategory}</strong></span>}
            <span className="capitalize">Animal: <strong>{product.animal}</strong></span>
            <span>Stock: <strong>{product.stock_quantity}</strong></span>
          </div>
          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map(tag => (
                <a
                  key={tag}
                  href={`/products?q=${encodeURIComponent(tag)}`}
                  className="group relative inline-flex items-center gap-1 rounded-full border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 px-3 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:scale-95"
                  aria-label={`Filter by tag ${tag}`}
                >
                  <span className="text-primary group-hover:text-primary-content/90">#</span>
                  <span className="group-hover:text-primary/90 dark:group-hover:text-primary/80">{tag}</span>
                  <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/25 via-primary/10 to-secondary/30 blur-[2px] transition-opacity" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="text-lg leading-relaxed text-base-content/80 whitespace-pre-line">{product.description}</div>
        <div className="flex items-center gap-6">
          <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-lg rounded-xl">Add to Cart</button>
          <button className="btn btn-outline btn-lg rounded-xl">Wishlist</button>
        </div>
        {/* Meta panel */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          {['Quality Assured','Fast Shipping','Secure Checkout'].map(label => (
            <div
              key={label}
              className="group relative rounded-xl border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 backdrop-blur p-4 text-center text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 focus-within:-translate-y-1"
              tabIndex={0}
              aria-label={label}
            >
              <span className="relative z-10 block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary transition-colors duration-500">
                {label}
              </span>
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/25),transparent_60%)] transition-opacity duration-500" />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-white/5 rounded-xl group-hover:ring-primary/40" />
              <span className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/40 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
