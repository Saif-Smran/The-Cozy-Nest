"use client";
import React, { useMemo, useState } from 'react';
import { useToast } from '@/components/ToastProvider';

interface FormState {
  name: string; category: string; subcategory: string; price: string; brand: string; stock_quantity: string; description: string; tags: string; animal: string; image_url: string;
}

// Predefined category & subcategory taxonomy
const CATEGORY_MAP: Record<string, string[]> = {
  'Pet Food': [
    'Dry Food',
    'Wet Food',
    'Treats & Snacks',
    'Special Diets (grain-free, hypoallergenic, senior, puppy/kitten)'
  ],
  'Pet Accessories': [
    'Collars, Leashes & Harnesses',
    'Beds & Blankets',
    'Bowls & Feeders',
    'Clothing & Costumes'
  ],
  'Pet Toys': [
    'Chew Toys',
    'Interactive Toys',
    'Plush Toys',
    'Training Toys'
  ],
  'Pet Health & Care': [
    'Grooming Products (shampoo, brushes, nail clippers)',
    'Flea & Tick Control',
    'Vitamins & Supplements',
    'First Aid & Medicine'
  ],
  'Pet Habitat & Supplies': [
    'Cages & Crates',
    'Aquariums & Fish Tanks',
    'Litter Boxes & Bedding',
    'Perches & Scratching Posts'
  ],
  'Specialty Pets': [
    'Birds (food, cages, toys)',
    'Fish (tanks, filters, decor)',
    'Reptiles (terrariums, heating lamps, substrate)',
    'Small Animals (hamsters, rabbits, guinea pigs)'
  ],
};

const MAIN_CATEGORIES = Object.keys(CATEGORY_MAP);

const initial: FormState = { name:'', category:'', subcategory:'', price:'', brand:'', stock_quantity:'', description:'', tags:'', animal:'', image_url:'' };

export default function AddProductPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function update<K extends keyof FormState>(key: K, value: string) { setForm(f => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock_quantity: parseInt(form.stock_quantity || '0', 10),
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      };
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok) {
        toast.push({ type: 'success', title: 'Product Added', message: data.message || 'Created successfully.' });
        setForm(initial);
      } else {
        const msg = data.error || (data.errors ? data.errors.join(', ') : 'Failed to add product');
        toast.push({ type: 'error', title: 'Error', message: msg });
      }
    } catch (err: any) {
      toast.push({ type: 'error', title: 'Error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  const subcategories = useMemo(()=> form.category && CATEGORY_MAP[form.category] ? CATEGORY_MAP[form.category] : [], [form.category]);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name *</label>
            <input value={form.name} onChange={e=>update('name', e.target.value)} required className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Category *</label>
            <select value={form.category} onChange={e=> { update('category', e.target.value); update('subcategory',''); }} required className="select select-bordered w-full">
              <option value="" disabled>-- Select Category --</option>
              {MAIN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="__other">Other (Custom)</option>
            </select>
          </div>
          {form.category === '__other' ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Custom Category *</label>
              <input value={form.subcategory} onChange={e=>update('subcategory', e.target.value)} required className="input input-bordered w-full" placeholder="Enter custom category" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Subcategory {subcategories.length ? '' : '(optional)'}</label>
              {subcategories.length ? (
                <select value={form.subcategory} onChange={e=>update('subcategory', e.target.value)} className="select select-bordered w-full" required>
                  <option value="" disabled>-- Select Subcategory --</option>
                  {subcategories.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                </select>
              ) : (
                <input value={form.subcategory} onChange={e=>update('subcategory', e.target.value)} className="input input-bordered w-full" placeholder="Enter subcategory (if any)" />
              )}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Brand</label>
            <input value={form.brand} onChange={e=>update('brand', e.target.value)} className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Price *</label>
            <input type="number" step="0.01" value={form.price} onChange={e=>update('price', e.target.value)} required className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Stock Quantity *</label>
            <input type="number" value={form.stock_quantity} onChange={e=>update('stock_quantity', e.target.value)} required className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Animal *</label>
            <input value={form.animal} onChange={e=>update('animal', e.target.value)} required className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Image URL *</label>
            <input value={form.image_url} onChange={e=>update('image_url', e.target.value)} required className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Tags (comma separated)</label>
            <input value={form.tags} onChange={e=>update('tags', e.target.value)} className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea value={form.description} onChange={e=>update('description', e.target.value)} required className="textarea textarea-bordered min-h-32" />
          </div>
        </div>
        <div className="flex gap-3">
          <button disabled={loading} className="btn btn-primary">{loading ? 'Saving...' : 'Add Product'}</button>
          <button type="button" disabled={loading} onClick={()=>setForm(initial)} className="btn btn-outline">Reset</button>
        </div>
      </form>
    </div>
  );
}
