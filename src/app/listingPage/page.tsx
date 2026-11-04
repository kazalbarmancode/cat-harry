"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import getTokenClient from "@/lib/getTokenClient";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number | string;
  image: string;
  ownerEmail: string;
}

export default function MyListingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData/email?email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setStudios(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user listings:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = async (id: string) => {
    try {
      const token = await getTokenClient();
      if (!token) {
        toast.error("Token missing! Please log in again.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && (data.success || data.deletedCount > 0)) {
        setStudios((prev) => prev.filter((s) => s._id !== id));
        toast.success("Studio deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete studio.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] text-slate-600 dark:text-slate-400 font-medium transition-colors duration-300">
        Loading your listings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Studio Listings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Manage the studio spaces you have added.
            </p>
          </div>
          <Link href="/studioPage">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
              + Add New Studio
            </Button>
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You have not added any studio spaces yet.
            </p>
            <Link href="/studioPage">
              <Button variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Create your first listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center gap-5 w-full">
                  <div className="relative h-24 w-full md:w-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                      src={studio.image || "https://via.placeholder.com/400x250"}
                      alt={studio.title || "Studio Image"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
                    <div className="space-y-1">
                      <span className="inline-block bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        {studio.category}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {studio.title}
                      </h2>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="line-clamp-1">{studio.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
                  <Link href={`/edit-studio/${studio._id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full text-sm font-medium border-blue-300 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      Edit Studio
                    </Button>
                  </Link>

                  <Button
                    onClick={() => handleDelete(studio._id)}
                    variant="destructive"
                    className="w-full flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
