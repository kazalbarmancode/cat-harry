"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

const AddStudioPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // সাবমিট করার সময় ফর্মের ডেটার সাথে ইউজারের নাম ও ইমেইল যুক্ত করে পাঠানো হচ্ছে
    const finalData = {
      ...form,
      ownerName: user?.name || "",
      ownerEmail: user?.email || "",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKED_URL}/studioData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        },
      );

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await res.text();
        console.error("Server HTML Error Response:", errorText);
        throw new Error("Backend server error! Check console for details.");
      }

      const result = await res.json();
      if (res.ok) {
        toast.success("Studio added successfully!");
        router.push("/listingPage");
      } else {
        toast.error(result.message || "Failed to add studio.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link href={'/studioPage'}>
        <h1 className="text-2xl font-bold mb-6">Add New Studio</h1>
      </Link>
      <Link href={'/listingPage'} className="my-3">
        <Button className='bg-blue-600'>Back To My List</Button>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-border my-3 bg-white p-8 shadow-sm"
      >
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Studio Title</Label>
            <Input
              id="title"
              placeholder="e.g., Creative Loft Studio"
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value: string | null) => {
                  if (value !== null) {
                    update("category", value);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location / Address</Label>
              <Input
                id="location"
                placeholder="e.g., Dhanmondi, Dhaka"
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
                placeholder="50"
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
                placeholder="100"
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
                placeholder="15"
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
              placeholder="https://example.com/studio.jpg"
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
                  className="flex items-center gap-2 cursor-pointer text-sm"
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
              placeholder="Describe the studio features and equipment..."
              className="min-h-36"
              value={form.overview}
              onChange={(event) => update("overview", event.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              User Name 
            </label>
            <input
              type="text"
              name="ownerName"
              value={user?.name || "Loading..."} 
              readOnly
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 text-slate-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              User Email 
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={user?.email || "Loading..."}
              readOnly
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 text-slate-700 cursor-not-allowed"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Submitting..." : "Submit Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudioPage;