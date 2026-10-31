import FeaturedsTypes from '@/lib/types/FeaturedTypes';
import Image from 'next/image';
import Link from 'next/link';

interface AllCardProps {
  feat: FeaturedsTypes;
}

const AllCard = ({ feat }: AllCardProps) => {
  const { image, title, category, rating, description, location, pricePerHour, _id } = feat;

  return (
    <div
      className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"}
            alt={title || "Studio"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-blue-600/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
            {category}
          </span>

          <div className="absolute top-4 right-4 bg-slate-950/75 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
            ⭐ <span>{rating || 4.9}</span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <span>📍</span> {location}
          </p>
          <p className="text-sm text-slate-300 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between mt-4 border-t border-slate-800">
        <div>
          <span className="text-2xl font-bold text-white">
            ${pricePerHour}
          </span>
          <span className="text-xs text-slate-400"> / hr</span>
        </div>

        <Link
          href={`/studios/${_id}`}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllCard;