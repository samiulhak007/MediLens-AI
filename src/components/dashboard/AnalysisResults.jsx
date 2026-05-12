import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Stethoscope, 
  Pill, 
  AlertCircle, 
  FileText, 
  Utensils, 
  Info,
  Calendar,
  Activity,
  ClipboardCheck,
  CheckCircle2,
  Download,
  Share2,
  Copy,
  Trash2
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const AnalysisResults = ({ data, onDownload, onShare, onDiscard }) => {
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="secondary" icon={Copy} onClick={() => {
          navigator.clipboard.writeText(data.plain_language_summary);
          alert("Summary copied!");
        }}>
          Copy Summary
        </Button>
        <Button variant="secondary" icon={Share2} onClick={onShare}>
          Share Report
        </Button>
        <Button icon={Download} onClick={onDownload}>
          Download PDF
        </Button>
        <Button variant="danger" icon={Trash2} onClick={onDiscard}>
          Discard
        </Button>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Patient & Doctor Info */}
        <motion.div variants={item}>
          <Card className="h-full">
            <div className="flex items-center space-x-3 mb-6">
              <User className="text-brand-cyan" />
              <h3 className="text-xl font-bold">General Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Patient Name</p>
                <p className="font-bold">{data.patient_info?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Age / Gender</p>
                <p className="font-bold">{data.patient_info?.age || "N/A"} / {data.patient_info?.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Doctor Name</p>
                <div className="flex items-center">
                  <Stethoscope size={14} className="mr-1.5 text-brand-cyan" />
                  <p className="font-bold">{data.doctor_info?.name || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Date</p>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5 text-brand-cyan" />
                  <p className="font-bold">{data.patient_info?.date || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Hospital / Clinic</p>
              <p className="font-bold text-brand-cyan">{data.doctor_info?.hospital || "N/A"}</p>
            </div>
          </Card>
        </motion.div>

        {/* Card 7: AI Confidence Score */}
        <motion.div variants={item}>
          <Card className="h-full flex flex-col justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Info size={16} className="text-white/20" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-brand-cyan/20 mb-4">
                <span className="text-3xl font-syne font-extrabold text-brand-cyan">{data.confidence_score}%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Extraction Confidence</h3>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Our AI is highly confident in the extracted data. Please verify medicine names with your pharmacist.
              </p>
            </div>
            {/* Background decorative pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-cyan/5 rounded-full blur-3xl animate-pulse" />
          </Card>
        </motion.div>

        {/* Card 2: Medications Table */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Pill className="text-brand-cyan" />
                <h3 className="text-xl font-bold">Prescribed Medications</h3>
              </div>
              <Badge variant="info">{data.medications?.length} Identified</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-white/40 text-xs uppercase tracking-widest">
                    <th className="pb-4 font-medium">Medicine</th>
                    <th className="pb-4 font-medium">Dosage</th>
                    <th className="pb-4 font-medium">Frequency</th>
                    <th className="pb-4 font-medium">Duration</th>
                    <th className="pb-4 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.medications?.map((med, idx) => (
                    <tr key={idx} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-8 rounded-full bg-${med.color_code || 'brand-cyan'}`} />
                          <div>
                            <p className="font-bold text-white group-hover:text-brand-cyan transition-colors">{med.name}</p>
                            <p className="text-xs text-white/30 italic">{med.generic_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-mono text-sm">{med.dosage}</td>
                      <td className="py-4 text-sm">{med.frequency}</td>
                      <td className="py-4 text-sm">{med.duration}</td>
                      <td className="py-4">
                        <Badge variant="neutral" className="bg-white/5 border-none">{med.purpose}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Card 3: Drug Interactions */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className={data.drug_interactions?.length > 0 ? "border-amber-500/20" : ""}>
            <div className="flex items-center space-x-3 mb-8">
              <AlertCircle className={data.drug_interactions?.length > 0 ? "text-amber-500" : "text-brand-emerald"} />
              <h3 className="text-xl font-bold">Drug Interaction Analysis</h3>
            </div>
            
            {data.drug_interactions?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.drug_interactions.map((interaction, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border ${
                    interaction.severity === 'high' ? 'bg-red-500/5 border-red-500/20' : 
                    interaction.severity === 'moderate' ? 'bg-amber-500/5 border-amber-500/20' : 
                    'bg-brand-cyan/5 border-brand-cyan/20'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap gap-2">
                        {interaction.drugs.map((d, i) => (
                          <Badge key={i} variant="neutral">{d}</Badge>
                        ))}
                      </div>
                      <Badge variant={interaction.severity === 'high' ? 'danger' : interaction.severity === 'moderate' ? 'warning' : 'info'}>
                        {interaction.severity.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{interaction.description}</p>
                    <div className="flex items-start space-x-2 text-xs text-white/50 bg-black/20 p-3 rounded-lg">
                      <ClipboardCheck size={14} className="shrink-0 mt-0.5" />
                      <p><span className="font-bold text-white/70">Recommendation:</span> {interaction.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-brand-emerald" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white">No Significant Interactions Found</h4>
                <p className="text-white/40 max-w-sm">Our AI hasn't detected any dangerous combinations between the prescribed medications.</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Card 4: Plain Language Summary */}
        <motion.div variants={item}>
          <Card className="h-full bg-gradient-to-br from-brand-card to-brand-navy border-brand-cyan/10">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="text-brand-cyan" />
              <h3 className="text-xl font-bold">Plain Language Summary</h3>
            </div>
            <p className="text-white/70 leading-relaxed text-lg italic">
              "{data.plain_language_summary}"
            </p>
          </Card>
        </motion.div>

        {/* Card 5: Side Effects & Precautions */}
        <motion.div variants={item}>
          <Card className="h-full">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="text-brand-purple" />
              <h3 className="text-xl font-bold">Side Effects & Precautions</h3>
            </div>
            <div className="space-y-6">
              {data.medications?.slice(0, 3).map((med, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-sm font-bold text-brand-purple">{med.name}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {med.side_effects?.map((effect, i) => (
                      <li key={i} className="text-xs text-white/50 flex items-center">
                        <div className="w-1 h-1 bg-brand-purple rounded-full mr-2" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/40 italic mt-1">Precaution: {med.precautions}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Card 6: Dietary & Lifestyle */}
        <motion.div variants={item}>
          <Card className="h-full">
            <div className="flex items-center space-x-3 mb-6">
              <Utensils className="text-brand-emerald" />
              <h3 className="text-xl font-bold">Dietary & Lifestyle</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-brand-emerald uppercase tracking-widest">Recommended ✅</p>
                <ul className="space-y-2">
                  {data.dietary_recommendations?.recommended?.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start">
                      <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full mr-2 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Avoid ❌</p>
                <ul className="space-y-2">
                  {data.dietary_recommendations?.avoid?.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs font-bold text-brand-cyan uppercase tracking-widest mb-4">Lifestyle Tips 💡</p>
              <div className="flex flex-wrap gap-2">
                {data.dietary_recommendations?.lifestyle_tips?.map((tip, i) => (
                  <Badge key={i} variant="info" className="bg-brand-cyan/5">{tip}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card 8: Follow-up & Warnings */}
        <motion.div variants={item}>
          <Card className="h-full border-red-500/10">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="text-red-500" />
              <h3 className="text-xl font-bold">Warnings & Follow-up</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-xs font-bold text-red-500 uppercase mb-3">Red Flag Symptoms 🚩</p>
                <div className="flex flex-wrap gap-2">
                  {data.red_flag_symptoms?.map((symptom, i) => (
                    <span key={i} className="text-xs text-red-200/70">• {symptom}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white/40 uppercase mb-2">Follow-up Instructions</p>
                <p className="text-sm text-white/70">{data.followup_instructions}</p>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AnalysisResults;
