"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import getTokenClient from "@/lib/getTokenClient";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const availableAmenities = [
  "WiFi",
  "Air Conditioned",
  "Lighting Gear",
  "Soundproofing",
  "Parking",
];

function EditStudioFormContent() {
  const params = useParams();
  const studioId = params?.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    overview: "",
    image: "",
    amenities: [] as string[],
    ownerEmail: "",
    ownerName: "",
  });

  useEffect(() => {
    if (studioId) {
      fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData/${studioId}`,
      )
        .then(async (res) => {
          const text = await res.text();
          return text ? JSON.parse(text) : null;
        })
        .then((data) => {
          if (data) {
            setForm({
              title: data.title || "",
              category: data.category || "",
              location: data.location || "",
              hourlyRate: data.hourlyRate || "",
              securityDeposit: data.securityDeposit || "",
              maxCapacity: data.maxCapacity || "",
              overview: data.overview || "",
              image: data.image || "",
              amenities: data.amenities || [],
              ownerEmail: data.ownerEmail || user?.email || "",
              ownerName: data.ownerName || user?.name || "",
            });
          }
          setFetching(false);
        })
        .catch((err) => {
          console.error("Error fetching studio details:", err);
          toast.error("Failed to load studio data.");
          setFetching(false);
        });
    }
  }, [studioId, user]);

  const update = (field: keyof typeof form, value: string | string[]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleAmenityToggle = (amenity: string) => {
    const current = form.amenities;
    if (current.includes(amenity)) {
      update(
        "amenities",
        current.filter((item) => item !== amenity),
      );
    } else {
      update("amenities", [...current, amenity]);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getTokenClient(); 

      const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData/${studioId}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Studio updated successfully!");
        router.push("/listingPage")
      } else {
        toast.error(data.message || "Failed to update studio.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Loading studio data for editing...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link href={"/listingPage"}>
        <Button variant="outline" className="mb-4">
          ← Back to My Listings
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        Edit Studio Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm"
      >
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Studio Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category || ""}
                onValueChange={(value) => update("category", value || "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location / Address</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={form.hourlyRate}
                onChange={(event) => update("hourlyRate", event.target.value)}
                required
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
              <Input
                id="securityDeposit"
                type="number"
                value={form.securityDeposit}
                onChange={(event) =>
                  update("securityDeposit", event.target.value)
                }
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxCapacity">Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={form.maxCapacity}
                onChange={(event) => update("maxCapacity", event.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={form.image}
              onChange={(event) => update("image", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-4 pt-1">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="overview">Detailed Overview</Label>
            <Textarea
              id="overview"
              className="min-h-36"
              value={form.overview}
              onChange={(event) => update("overview", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                value={form.ownerName}
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-600 dark:text-slate-400 cursor-not-allowed text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">
                Owner Email
              </label>
              <input
                type="email"
                value={form.ownerEmail}
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-600 dark:text-slate-400 cursor-not-allowed text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors mt-4"
          >
            {loading ? "Updating..." : "Update Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EditStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
          Loading editor...
        </div>
      }
    >
      <EditStudioFormContent />
    </Suspense>
  );
}
