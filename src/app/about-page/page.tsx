import {
  ArrowRight,
  Award,
  Film,
  Mic2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About StudioSpace</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Empowering Creators with{" "}
            <span className="text-blue-500">World-Class Studios</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            StudioSpace is the premier marketplace for booking professional film
            sound stages, podcast lounges, soundproof music suites, and
            photography spaces designed for creators who demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Built by Creators, For Creators
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              We understand the friction of finding and booking production-ready
              spaces. Whether you are recording a high-stakes podcast, shooting
              an indie film, or capturing commercial photography, finding the
              right acoustic and visual environment shouldnt be a hurdle.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Our platform bridges the gap between top-tier studio owners and
              ambitious artists, providing seamless scheduling, verified
              equipment lists, and instant booking confirmations.
            </p>
            <div className="pt-2">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm"
              >
                <span>Explore Available Studios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Film Stages
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Acoustically treated sound stages equipped for professional
                  productions.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl mt-6">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Mic2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Podcast Lounges
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Multi-cam setups and pristine audio recording environments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Why Choose StudioSpace?
            </h2>
            <p className="text-slate-400 text-sm">
              We provide an unmatched ecosystem designed for hassle-free
              creative workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg">
                Verified & Trusted
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every studio listed on our platform undergoes strict
                verification to ensure top-tier equipment and pristine
                condition.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg">
                Creator Focused
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tailored specifically for filmmakers, podcasters, photographers,
                and musicians with flexible hourly or daily bookings.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg">
                Seamless Experience
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instant reservation tracking, secure authentication, and
                hassle-free management right from your dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient from-blue-950/40 via-slate-900 to-slate-900 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight relative z-10">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto relative z-10">
            Join hundreds of creators who trust StudioSpace for their
            productions. Book your studio session today.
          </p>
          <div className="pt-2 relative z-10 flex justify-center gap-4">
            <Link
              href="/studios"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm"
            >
              Browse Studios
            </Link>
            <Link
              href="/how-it-works"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 active:scale-95 text-sm"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
