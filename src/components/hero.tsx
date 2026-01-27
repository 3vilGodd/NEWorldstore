'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-[90vh] w-full object-cover brightness-[0.32]"
          src="https://cdn.coverr.co/videos/coverr-close-up-of-a-smartphone-1959/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0f1c] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(100,214,255,0.2),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(156,107,255,0.2),transparent_32%)]" />
      </div>

      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center gap-10 px-6 py-16">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          <Sparkles size={16} className="text-cyan-300" />
          New: Custom-cut Hydrogel Lab + Amazon-grade logistics built-in.
        </div>

        <motion.div initial="hidden" animate="show" variants={variants} className="space-y-6">
          <motion.h1
            variants={variants}
            className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Armor your screens. Elevate every device with{" "}
            <span className="text-gradient">NEWorld eStore</span>.
          </motion.h1>
          <motion.p variants={variants} className="max-w-2xl text-lg text-gray-200/90">
            Cinematic-grade glass, self-healing hydrogel, MagSafe-ready cases, and curated accessories.
            Built for Amazon-scale speed with secure checkout via Razorpay & Stripe.
          </motion.p>
        </motion.div>

        <motion.div variants={variants} className="flex flex-wrap gap-3">
          <Link
            href="#categories"
            className="btn-primary glow-ring flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.01]"
          >
            Shop Now
          </Link>
          <Link
            href="#accessories"
            className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <Play size={16} />
            Explore Accessories
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "SKUs", value: "1,800+" },
            { label: "Fulfilled", value: "1.2M" },
            { label: "Avg. rating", value: "4.8★" },
            { label: "Pincodes", value: "27K+" },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl px-4 py-3">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
