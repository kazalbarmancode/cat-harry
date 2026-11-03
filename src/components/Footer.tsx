import Link from "next/link";
import Image from "next/image";
import LoGo from "../../public/Logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                <Image
                  src={LoGo}
                  alt="StudioSpace Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Studio<span className="text-blue-500">Space</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              Reserve world-class studios for your next creative production,
              film shoot, podcast, or photography session.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"
              >
                <FaSquareFacebook className="h-5 w-5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 transition-all"
              >
                <FaSquareInstagram className="h-5 w-5" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/50 transition-all"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/studios"
                  className="hover:text-blue-400 transition-colors"
                >
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-work"
                  className="hover:text-blue-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about-page"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/studios?category=film"
                  className="hover:text-blue-400 transition-colors"
                >
                  Film Sound Stage
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=podcast"
                  className="hover:text-blue-400 transition-colors"
                >
                  Podcast Lounge
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=photo"
                  className="hover:text-blue-400 transition-colors"
                >
                  Photography Cyc Wall
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=music"
                  className="hover:text-blue-400 transition-colors"
                >
                  Soundproof Music Suite
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-500 mt-1 shrink-0" />
                <span>123 Creative Studio Ave, Suite 400, NY</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <span>+880 16###-#5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <span>support@studiospace.io</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>©2026 StudioSpace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacyPolicyPage"
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
