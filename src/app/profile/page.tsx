'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, MapPin, Heart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  const cards = [
    {
      title: "My Orders",
      desc: "Track and manage your orders",
      href: "/profile/orders",
      icon: Package,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Addresses",
      desc: "Manage delivery addresses",
      href: "/profile/addresses",
      icon: MapPin,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Wishlist",
      desc: "View saved items",
      href: "/wishlist",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Settings",
      desc: "Account preferences",
      href: "/profile/settings",
      icon: Settings,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">My Account</h1>
        <p className="mt-2 text-sm text-gray-400">
          {session.user?.email} • {session.user?.name || "User"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-panel rounded-3xl p-6 transition hover:border-white/30"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{card.desc}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
