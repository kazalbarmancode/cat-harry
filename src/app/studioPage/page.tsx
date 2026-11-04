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
import {  useSession } from "@/lib/auth-client";
import getTokenClient from "@/lib/getTokenClient";

const categories = [
  "Photo Studio",
  "Film Sound Stage",
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
  "Shure SM7B Mics",
  "RodeCaster Pro II",
  "4K Camcorder Setup",
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
    pricePerHour: "",
    securityDeposit: "",
    capacity: "",
    sqft: "",
    description: "",
    image: "",
    hostPhone: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please wait, user session is still loading!");
      return;
    }

    setLoading(true);

    const submissionData = {
      title: form.title,
      category: form.category,
      image: form.image,
      pricePerHour: Number(form.pricePerHour),
      rating: 4.8,
      location: form.location,
      sqft: Number(form.sqft),
      capacity: Number(form.capacity),
      description: form.description,
      overview: form.description,
      securityDeposit: form.securityDeposit,
      amenities: form.amenities,
      rules: [
        "No smoking inside",
        "No outside loud speakers",
        "Food allowed in lounge area only",
      ],
      host: {
        name: user.name || "Host",
        phone: form.hostPhone || "+8801700000001",
        email: user.email,
      },
      ownerEmail: user.email,
      ownerName: user.name || "Host",
      createdAt: new Date(),
    };
    const token = await getTokenClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submissionData),
        },
      );

      const data = await res.json();

      if (data.success || data.insertedId) {
        toast.success("Studio added successfully!");
        router.push("/listingPage");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to add studio");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 transition-colors duration-300">
      <Link href={"/studioPage"}>
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Add New Studio
        </h1>
      </Link>
      <Link href={"/listingPage"} className="my-3 inline-block">
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white">
          Back To My List
        </Button>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 dark:border-slate-800 my-3 bg-white dark:bg-slate-900 p-8 shadow-sm transition-colors duration-300"
      >
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-slate-700 dark:text-slate-300">
              Studio Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Neon Wave Podcast Lounge"
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-slate-700 dark:text-slate-300">Category</Label>
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
              <Label htmlFor="location" className="text-slate-700 dark:text-slate-300">
                Location / Address
              </Label>
              <Input
                id="location"
                placeholder="e.g., Gulshan, Dhaka"
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="pricePerHour" className="text-slate-700 dark:text-slate-300">
                Price Per Hour ($)
              </Label>
              <Input
                id="pricePerHour"
                type="number"
                placeholder="45"
                value={form.pricePerHour}
                onChange={(event) => update("pricePerHour", event.target.value)}
                required
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sqft" className="text-slate-700 dark:text-slate-300">
                Square Feet (Sqft)
              </Label>
              <Input
                id="sqft"
                type="number"
                placeholder="450"
                value={form.sqft}
                onChange={(event) => update("sqft", event.target.value)}
                required
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity" className="text-slate-700 dark:text-slate-300">
                Capacity (Persons)
              </Label>
              <Input
                id="capacity"
                type="number"
                placeholder="6"
                value={form.capacity}
                onChange={(event) => update("capacity", event.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="securityDeposit" className="text-slate-700 dark:text-slate-300">
                Security Deposit ($)
              </Label>
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
              <Label htmlFor="hostPhone" className="text-slate-700 dark:text-slate-300">
                Host Phone Number
              </Label>
              <Input
                id="hostPhone"
                type="text"
                placeholder="+8801700000001"
                value={form.hostPhone}
                onChange={(event) => update("hostPhone", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image" className="text-slate-700 dark:text-slate-300">
              Image URL
            </Label>
            <Input
              id="image"
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={form.image}
              onChange={(event) => update("image", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-700 dark:text-slate-300">Amenities</Label>
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
                    className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">
              Detailed Description
            </Label>
            <Textarea
              id="description"
              placeholder="Acoustically treated professional podcast booth..."
              className="min-h-36"
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              User Name (Host)
            </label>
            <input
              type="text"
              value={user?.name || "Loading..."}
              readOnly
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-700 dark:text-slate-300 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              User Email (Host)
            </label>
            <input
              type="email"
              value={user?.email || "Loading..."}
              readOnly
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-700 dark:text-slate-300 cursor-not-allowed"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Submitting..." : "Submit Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudioPage;
