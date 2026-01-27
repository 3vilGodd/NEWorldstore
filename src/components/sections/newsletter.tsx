'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel relative overflow-hidden rounded-3xl px-6 py-8 shadow-strong"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-violet-500/12 to-transparent" />
        <div className="relative grid gap-4 md:grid-cols-[1.3fr,1fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-200">Stay ahead</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Get drop alerts & exclusive coupons</h3>
            <p className="mt-2 text-sm text-gray-200">
              Weekly curated deals, restock alerts, and tips to make your devices last longer.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition hover:scale-[1.01]"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
