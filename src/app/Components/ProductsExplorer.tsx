"use client";
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProductCard, { ProductCardData } from './ProductCard';
import { Loader2, SlidersHorizontal, X } from 'lucide-react';

interface ApiResponse {
  data: ProductCardData[];
  pagination?: { page: number; pages: number; total: number; limit: number };
}

const CATEGORY_OPTIONS = ['Pet Food','Pet Accessories','Pet Toys','Pet Health & Care'];
const ANIMAL_OPTIONS = ['dog','cat','bird','fish','small pet'];

export default function ProductsExplorer() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);

  // Debounced query
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setQuery(searchInput), 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true); setError(null);
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', '24');
        if (query) params.set('q', query);
        if (category) params.set('category', category);
        if (animal) params.set('animal', animal);
        const res = await axios.get<ApiResponse>(`/api/products?${params.toString()}`);
        if (cancelled) return;
        setProducts(res.data.data);
        if (res.data.pagination) setPages(res.data.pagination.pages || 1);
      } catch (e) {
        if (!cancelled) setError('Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [query, category, animal, page]);

  function resetFilters() {
    setCategory('');
    setAnimal('');
    setPage(1);
  }

  const hasActive = category || animal || query;

  const gridProducts = useMemo(() => products, [products]);

  return (
    <div className="mx-auto w-11/12 max-w-7xl py-12 md:py-16">
      {/* Search Bar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 w-full relative">
          <input
            value={searchInput}
            onChange={e => { setSearchInput(e.target.value); setPage(1);} }
            placeholder="Search products..."
            className="input input-bordered w-full pl-4 pr-4 h-12 rounded-xl bg-base-100/60 backdrop-blur border-base-300/60 dark:border-base-600/50"
          />
          {searchInput && (
            <button onClick={() => { setSearchInput(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content/80"><X size={16}/></button>
          )}
        </div>
        <button onClick={() => setOpenFilters(v=>!v)} className="btn btn-outline gap-2 h-12 rounded-xl sm:w-auto"><SlidersHorizontal size={18}/> Filters</button>
      </div>

      <div className="grid gap-10 lg:gap-14 lg:grid-cols-12">
        {/* Sidebar (approx golden ratio 38%) */}
        <aside className={`lg:col-span-4 ${openFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="space-y-6 rounded-2xl border border-base-300/50 dark:border-base-600/40 bg-base-100/60 dark:bg-base-300/30 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold tracking-tight text-lg">Filters</h3>
              <button onClick={resetFilters} disabled={!hasActive} className="text-xs text-primary disabled:opacity-30">Reset</button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map(cat => (
                    <button key={cat} onClick={()=>{ setCategory(cat===category? '' : cat); setPage(1);} } className={`px-3 py-1 rounded-full text-xs font-medium border transition ${cat===category ? 'bg-primary text-primary-content border-primary' : 'border-base-300/60 dark:border-base-600/40 hover:bg-base-200/60 dark:hover:bg-base-400/20'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Animal</h4>
                <div className="flex flex-wrap gap-2">
                  {ANIMAL_OPTIONS.map(a => (
                    <button key={a} onClick={()=>{ setAnimal(a===animal? '' : a); setPage(1);} } className={`px-3 py-1 rounded-full text-xs font-medium border transition capitalize ${a===animal ? 'bg-secondary text-secondary-content border-secondary' : 'border-base-300/60 dark:border-base-600/40 hover:bg-base-200/60 dark:hover:bg-base-400/20'}`}>{a}</button>
                  ))}
                </div>
              </div>
            </div>
            {hasActive && (
              <div className="text-[0.7rem] uppercase tracking-wide text-base-content/60 pt-2">
                {query && <span className="mr-3">Query: "{query}"</span>}
                {category && <span className="mr-3">Category: {category}</span>}
                {animal && <span className="mr-3">Animal: {animal}</span>}
              </div>
            )}
          </div>
+          <div className="mt-6 lg:hidden">
+            <button onClick={()=> setOpenFilters(false)} className="btn btn-sm w-full">Close Filters</button>
+          </div>
        </aside>

        {/* Main content (approx golden ratio 62%) */}
        <div className="lg:col-span-8">
          {loading && (
            <div className="flex items-center gap-3 text-sm text-base-content/60"><Loader2 className="animate-spin" size={18}/> Loading products...</div>
          )}
          {error && !loading && <div className="text-error text-sm">{error}</div>}
          {!loading && !error && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                {gridProducts.map(p => <ProductCard key={p._id || p.name} product={p} />)}
                {gridProducts.length === 0 && (
                  <div className="col-span-full text-sm text-base-content/60">No products found.</div>
                )}
              </div>
              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-10 flex flex-wrap items-center gap-2">
                  <button onClick={()=> setPage(p=> Math.max(1,p-1))} disabled={page===1} className="btn btn-sm btn-outline">Prev</button>
                  <div className="text-xs text-base-content/60">Page {page} of {pages}</div>
                  <button onClick={()=> setPage(p=> Math.min(pages,p+1))} disabled={page===pages} className="btn btn-sm btn-outline">Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
