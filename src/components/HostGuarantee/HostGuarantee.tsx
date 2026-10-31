const assurances = [
  {
    title: "Liability Protection",
    description: "Up to $10,000 protection coverage against unexpected spatial or property damages during bookings.",
    icon: "🛡️",
    badge: "Covered",
    bgClass: "bg-[#B45309] hover:bg-[#A14507] border-[#D97706]/40",
  },
  {
    title: "Verified Profiles",
    description: "Every host and studio space goes through a strict identity and quality verification process.",
    icon: "✅",
    badge: "Verified",
    bgClass: "bg-[#581C87] hover:bg-[#4C1D95] border-[#9333EA]/40",
  },
  {
    title: "Equipment Safety",
    description: "Comprehensive gear protection and safety standards ensuring peace of mind for both hosts and creators.",
    icon: "🎥",
    badge: "Secured",
    bgClass: "bg-[#065F46] hover:bg-[#044E38] border-[#10B981]/40",
  },
  {
    title: "24/7 Creator Support",
    description: "Our dedicated support team is available round-the-clock to assist with any production needs.",
    icon: "🎧",
    badge: "24/7 Live",
    bgClass: "bg-[#1E3A8A] hover:bg-[#1E293B] border-[#3B82F6]/40",
  },
];
const HostGuarantee = () => {
    return (
        <section className="py-20 px-4 bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-400 font-semibold text-xs tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            Trust & Security
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base">
            We prioritize your safety, equipment integrity, and peace of mind on every production layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((item) => (
            <div
              key={item.title}
              className={`group relative ${item.bgClass} border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#0F172A]/70 border border-white/10 flex items-center justify-center text-xl shadow-inner text-white">
                    {item.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-black/30 text-white/90 border border-white/10 backdrop-blur-md">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-100/90 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-slate-200">
                <span>Assurance Plan</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default HostGuarantee;