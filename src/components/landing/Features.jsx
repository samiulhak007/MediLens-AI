import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scan, 
  AlertTriangle, 
  MessageSquare, 
  Globe, 
  FileDown, 
  ShieldCheck 
} from 'lucide-react';
import Card from '../ui/Card';

const Features = () => {
  const features = [
    {
      icon: Scan,
      title: "Smart Prescription OCR",
      description: "Reads printed and handwritten prescriptions with high accuracy using state-of-the-art vision AI.",
      color: "cyan"
    },
    {
      icon: AlertTriangle,
      title: "Drug Interaction Alerts",
      description: "Flags dangerous medicine combinations to keep you and your loved ones safe.",
      color: "red"
    },
    {
      icon: MessageSquare,
      title: "Plain Language Explanations",
      description: "No medical jargon. Get clear, easy-to-understand explanations of your medications.",
      color: "emerald"
    },
    {
      icon: Globe,
      title: "Multilingual Reports",
      description: "Get your analysis in English, Hindi, Tamil, Spanish, or French instantly.",
      color: "purple"
    },
    {
      icon: FileDown,
      title: "Downloadable PDF Report",
      description: "Generate professional medical reports you can share with your doctor or pharmacist.",
      color: "blue"
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description: "Your medical data is encrypted and secure. We never share your data without consent.",
      color: "indigo"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Intelligent Features for <br />
            <span className="text-brand-cyan">Better Healthcare</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Experience a suite of AI-powered tools designed to provide clarity and safety for your medical journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full border-white/5 hover:border-brand-cyan/30 hover:bg-brand-card-hover transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                <div className={`w-14 h-14 rounded-2xl bg-brand-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-7 h-7 text-brand-cyan`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
