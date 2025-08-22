"use client";
import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export interface ProductCardData {
  _id?: string;
  name: string;
  price: number;
  image_url: string;
  category?: string;
  animal?: string;
  brand?: string;
  description?: string;
}

interface Props {
  product: ProductCardData;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 backdrop-blur-xl shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Link
          href={`/products/${product._id || encodeURIComponent(product.name)}`}
          className="absolute bottom-3 right-3 btn btn-primary btn-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-md"
          aria-label={`View details for ${product.name}`}
        >
          <ShoppingCart size={16} />
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium leading-snug line-clamp-2 min-h-[2.4rem]">{product.name}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
          {product.brand && <span className="text-xs text-base-content/60">{product.brand}</span>}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none ring-1 ring-white/5 rounded-2xl group-hover:ring-primary/40" />
    </div>
  );
};
export default ProductCard;
