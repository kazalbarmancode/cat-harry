const steps = [
{
    step: "01",
    title: "Discover Spaces",
    description: "Provide varition photo stampe, round stages, and podcast gemos indiced by your creative vision.",
    icon: "🔍",
    bgClass: "bg-[#B45309] hover:bg-[#A14507] border-[#D97706]/40",
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description: "Pick your preferred date and time also with flexoile hourly Freaking collect.",
    icon: "📅",
    bgClass: "bg-[#581C87] hover:bg-[#4C1D95] border-[#9333EA]/40",
  },
  {
    step: "03",
    title: "Book Instantly",
    description: "Reserve your atudio space security with tamant confirmation and transparent spicing.",
    icon: "⚡",
    bgClass: "bg-[#065F46] hover:bg-[#044E38] border-[#10B981]/40",
  },
  {
    step: "04",
    title: "Create & Produce",
    description: "ARRVE in the location, irceats professional goal, and brang your creative projects in BIE.",
    icon: "🎬",
    bgClass: "bg-[#1E3A8A] hover:bg-[#1E293B] border-[#3B82F6]/40",
  },
];
const HowItWork = () => {
  return (
    <section className="py-20 px-4 bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold text-xs tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            Seamless Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            How Booking Works
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Get your production up and running in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className={`group relative ${item.bgClass} border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#0F172A]/70 border border-white/10 flex items-center justify-center text-xl shadow-inner text-white">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-serif font-bold text-white/90">
                    {item.step}
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
                <span>Step {item.step}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default HowItWork;