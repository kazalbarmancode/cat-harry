import { FileText, ShieldAlert, CheckCircle2, Scale, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
const TermsPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto space-y-12">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Last updated: November 2026
          </p>
        </div>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              By accessing or using StudioSpace, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              2. Use License & Account Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Users must provide accurate information when registering an account. You are responsible for maintaining the confidentiality of your account credentials and password. StudioSpace reserves the right to suspend or terminate accounts that violate community guidelines or misuse booking privileges.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              3. Studio Bookings & Cancellations
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              All studio reservations made through StudioSpace are subject to availability and host confirmation. Cancellations and rescheduling must adhere to our policy guidelines outlined on your dashboard. Users are held financially accountable for any damage caused to studio equipment during their booked sessions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              4. Contact Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              If you have any questions regarding these Terms of Service, please reach out to our legal support team at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              support@studiospace.io
            </p>
          </section>

        </div>

      </div>
    </div>
    );
};

export default TermsPage;