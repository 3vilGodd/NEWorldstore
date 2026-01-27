'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { z } from "zod";

const addressSchema = z.object({
  label: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  phone: z.string().min(10),
});

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
  };
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"address" | "payment">("address");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "stripe">("razorpay");
  const [address, setAddress] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addressSchema.parse(address);
      setStep("payment");
    } catch (error) {
      alert("Please fill all required fields");
    }
  };

  const handlePayment = async () => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          provider: paymentMethod,
          receipt: `ORDER-${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      // In production, redirect to payment gateway
      alert(`Payment initiated with ${paymentMethod}. Order ID: ${data.id}`);
      router.push(`/orders/${data.id}`);
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed. Please try again.");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!items.length) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          {step === "address" ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={20} className="text-cyan-300" />
                <h2 className="text-xl font-semibold text-white">Delivery Address</h2>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Label</label>
                  <select
                    value={address.label}
                    onChange={(e) => setAddress({ ...address, label: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Address Line 1 *</label>
                  <input
                    required
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Address Line 2</label>
                  <input
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">City *</label>
                    <input
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">State *</label>
                    <input
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">ZIP Code *</label>
                    <input
                      required
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full rounded-full px-6 py-3 text-sm font-semibold">
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard size={20} className="text-cyan-300" />
                <h2 className="text-xl font-semibold text-white">Payment Method</h2>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "razorpay"
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 bg-black/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Razorpay</span>
                    {paymentMethod === "razorpay" && <span className="text-cyan-300">✓</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">UPI, Cards, Net Banking</p>
                </button>

                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "stripe"
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 bg-black/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Stripe</span>
                    {paymentMethod === "stripe" && <span className="text-cyan-300">✓</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">International cards</p>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("address")}
                  className="btn-secondary flex-1 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="btn-primary flex-1 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="flex-1">
                    <p className="text-white">{item.product.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-white font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
