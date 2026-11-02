import {
  ArrowLeft,
  Database,
  Eye,
  Lock,
  Mail,
  Shield,
} from "lucide-react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
  <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-4xl mx-auto space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>StudioSpace Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Last updated: November 2026
          </p>
        </div>

        <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              1. Information We Collect for Studio Bookings
            </h2>
            <p className="text-slate-400">
              When you use StudioSpace to explore or reserve film sound stages, podcast lounges, and music suites, we collect personal details you provide during account creation and session booking—such as your name, email address, phone number, and scheduled production dates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              2. How We Use Your Data
            </h2>
            <p className="text-slate-400">
              We use your information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>Process and confirm your studio session reservations.</li>
              <li>Manage your personal dashboard and booking history.</li>
              <li>Send critical updates, booking reminders, and host communications.</li>
              <li>Ensure secure authentication and prevent fraudulent bookings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              3. Security & Data Protection
            </h2>
            <p className="text-slate-400">
              StudioSpace employs industry-standard encryption, secure authentication protocols, and protected database storage (MongoDB) to keep your personal credentials and booking records safe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              4. Contact Us
            </h2>
            <p className="text-slate-400">
              If you have any questions regarding our privacy practices or your data, reach out to our team at:
            </p>
            <p className="text-blue-400 font-medium">
              support@studiospace.io
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
