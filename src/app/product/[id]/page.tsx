import Image from "next/image";
import { notFound } from "next/navigation";
import { discountPercent, formatCurrency } from "@/lib/utils";
import { ProductActions } from "@/components/product-actions";
import { prisma } from "@/lib/prisma";
import { transformProduct } from "@/lib/db-helpers";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  if (!prisma) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="glass-panel rounded-3xl p-6 text-center text-gray-300">
          Database not configured. Please set DATABASE_URL environment variable.
        </div>
      </div>
    );
  }

  const productData = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
  });

  if (!productData) return notFound();

  const product = transformProduct(productData);

  const discount = discountPercent(product.price, product.mrp);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img) => (
              <Image
                key={img}
                src={img}
                alt={product.name}
                width={200}
                height={140}
                className="h-28 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold text-white">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-300">{product.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-3xl font-semibold text-white">{formatCurrency(product.price)}</p>
            {discount ? (
              <p className="text-sm text-emerald-300">
                Save {discount}% • MRP {formatCurrency(product.mrp!)}
              </p>
            ) : null}
          </div>

          <div className="glass-panel rounded-3xl p-4">
            <p className="text-sm font-semibold text-white">Compatibility</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.compatibility.map((c) => (
                <span key={c} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-200">
            {product.features?.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
                {feature}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-100">
            Stock {product.stock} • Ships in 24h • Cashfree / Razorpay / Stripe supported
          </div>

          <ProductActions productId={product.id} />

          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Offers & coupons</p>
            <div className="grid gap-2">
              {product.offers?.map((offer) => (
                <div key={offer} className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-gray-200">
                  {offer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
