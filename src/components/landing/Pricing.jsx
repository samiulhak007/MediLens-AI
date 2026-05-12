import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for occasional use",
      features: [
        "5 analyses per month",
        "PDF download",
        "English only",
        "Basic interaction check",
        "Email support"
      ],
      buttonText: "Start Free",
      variant: "secondary"
    },
    {
      name: "Pro",
      price: "299",
      period: "/month",
      description: "For patients with chronic needs",
      features: [
        "Unlimited analyses",
        "All 5 languages",
        "Full prescription history",
        "Priority support",
        "Advanced drug alerts",
        "Family account (up to 3)"
      ],
      buttonText: "Get Pro Now",
      variant: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For clinics and hospitals",
      features: [
        "White-label reports",
        "API access",
        "Bulk analysis",
        "Dedicated account manager",
        "Custom integrations",
        "Compliance documentation"
      ],
      buttonText: "Contact Sales",
      variant: "secondary"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/60">Choose the plan that fits your healthcare needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card 
                className={`relative h-full flex flex-col p-8 ${
                  plan.popular ? 'border-brand-cyan shadow-[0_0_30px_rgba(0,212,255,0.1)]' : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-cyan text-brand-navy px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-syne font-extrabold">
                      {plan.price !== "Custom" ? `₹${plan.price}` : plan.price}
                    </span>
                    {plan.period && <span className="text-white/50">{plan.period}</span>}
                  </div>
                  <p className="text-white/50 text-sm mt-2">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-3 text-sm">
                      <Check className="w-5 h-5 text-brand-cyan shrink-0" />
                      <span className="text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant={plan.variant} className="w-full">
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
