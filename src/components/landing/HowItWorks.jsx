import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload",
      description: "Drag & drop your prescription image or take a clear photo.",
      color: "from-brand-cyan to-blue-500"
    },
    {
      icon: Cpu,
      title: "Analyze",
      description: "MediLens AI reads and interprets every detail using Vision LLM.",
      color: "from-brand-emerald to-teal-500"
    },
    {
      icon: Download,
      title: "Download",
      description: "Get your full medical report as a professional PDF.",
      color: "from-brand-purple to-indigo-500"
    }
  ];

  return (
    <section className="py-24 bg-brand-navy/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
          <p className="text-white/60">Simple, fast, and intelligent medical analysis in three easy steps.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-cyan/20 via-brand-emerald/20 to-brand-purple/20 -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="flex-1 text-center"
            >
              <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${step.color} p-0.5 mb-6 shadow-xl`}>
                <div className="w-full h-full bg-brand-navy rounded-[1.4rem] flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
