"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard, { ProductCardData } from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ApiResponse {
  data: ProductCardData[];
  pagination?: any;
}

const CATEGORY_LIST = [
  'Pet Food',
  'Pet Accessories',
  'Pet Toys',
  'Pet Health & Care'
];

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState<ProductCardData[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, ProductCardData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // Fetch top products (use first page limited to more and slice) - could add sort param later
        const topRes = await axios.get<ApiResponse>('/api/products?limit=12');
        if (!cancelled) {
          setTopProducts(topRes.data.data.slice(0, 4));
        }
        // Fetch per category in parallel
        const categoryPromises = CATEGORY_LIST.map(async cat => {
          const res = await axios.get<ApiResponse>(`/api/products?category=${encodeURIComponent(cat)}&limit=4`);
          return [cat, res.data.data.slice(0, 4)] as const;
        });
        const catResults = await Promise.allSettled(categoryPromises);
        if (!cancelled) {
          const map: Record<string, ProductCardData[]> = {};
            catResults.forEach(r => {
              if (r.status === 'fulfilled') {
                const [cat, list] = r.value;
                map[cat] = list;
              }
            });
          setCategoryProducts(map);
        }
      } catch (e: any) {
        if (!cancelled) setError('Failed to load products.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="mx-auto w-11/12 max-w-7xl py-16 md:py-20 space-y-20">
      {/* Top Products */}
      <div>
        <header className="mb-10 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Top Products</h2>
          <p className="text-base-content/70 text-sm md:text-base">Hand-picked favorites bringing comfort, enrichment and wellness to your pet's everyday moments.</p>
        </header>
        {loading && (
          <div className="flex items-center gap-3 text-sm text-base-content/60"><Loader2 className="animate-spin" size={18}/> Loading products...</div>
        )}
        {error && !loading && (
          <div className="text-error text-sm">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.map(p => <ProductCard key={p._id || p.name} product={p} />)}
          </div>
        )}
      </div>

      {/* Categories Sections */}
      <div className="space-y-16">
        {CATEGORY_LIST.map(cat => (
          <div key={cat} className="space-y-8">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-semibold tracking-tight">{cat}</h3>
              {/* Potential view-all link placeholder */}
              {/* <Link href={`/categories/${encodeURIComponent(cat)}`} className="text-sm text-primary hover:underline">View all</Link> */}
            </div>
            {loading && !categoryProducts[cat] && (
              <div className="flex items-center gap-3 text-sm text-base-content/60"><Loader2 className="animate-spin" size={16}/> Loading...</div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(categoryProducts[cat] || []).slice(0,4).map(p => <ProductCard key={p._id || `${cat}-${p.name}`} product={p} />)}
              {(!loading && (!categoryProducts[cat] || categoryProducts[cat].length === 0)) && (
                <div className="col-span-full text-sm text-base-content/60">No products found in this category.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
