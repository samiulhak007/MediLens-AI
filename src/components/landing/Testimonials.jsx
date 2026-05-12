import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Card from '../ui/Card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya R.",
      role: "Caregiver",
      image: "https://i.pravatar.cc/100?img=32",
      quote: "MediLens AI helped me understand my father's complex prescription in Tamil. Life-changing for our family.",
      rating: 5
    },
    {
      name: "Dr. Sameer K.",
      role: "General Physician",
      image: "https://i.pravatar.cc/100?img=12",
      quote: "The drug interaction alert caught a serious conflict my pharmacist missed. An essential tool for patient safety.",
      rating: 5
    },
    {
      name: "James T.",
      role: "Patient",
      image: "https://i.pravatar.cc/100?img=44",
      quote: "Finally, an AI tool that explains medicine in plain English. My elderly mom uses it herself now without any help.",
      rating: 5
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Loved by Patients & Pros</h2>
          <p className="text-white/60">Join thousands who trust MediLens AI for their medical clarity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-white/5 border-white/5 flex flex-col p-8">
                <div className="flex text-amber-400 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg italic text-white/80 mb-8 flex-grow">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-cyan/20" />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-sm text-white/40">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
