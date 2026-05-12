import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-cyan transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/50 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Is MediLens AI a replacement for a doctor?",
      answer: "Absolutely not. MediLens AI is an informational assistant designed to help you understand your prescriptions better. You should always consult with a qualified medical professional for diagnosis and treatment."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI uses state-of-the-art vision models and medical knowledge bases, achieving over 99% accuracy on clear prescription images. However, handwriting can sometimes be ambiguous, so always verify with your pharmacist."
    },
    {
      question: "Is my prescription data private?",
      answer: "Yes. Your data is encrypted and handled with the highest security standards. We do not sell your personal health information to third parties."
    },
    {
      question: "Which languages are supported?",
      answer: "Currently we support English, Hindi, Tamil, Spanish, and French for both analysis and report generation."
    },
    {
      question: "Can I use it on mobile?",
      answer: "Yes! MediLens AI is fully responsive and works perfectly on smartphones and tablets."
    }
  ];

  return (
    <section className="py-24 bg-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h2>
          <p className="text-white/60">Everything you need to know about MediLens AI.</p>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
