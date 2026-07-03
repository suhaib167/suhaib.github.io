'use client';
import { motion,AnimatePresence } from 'framer-motion';
import { X,Download } from 'lucide-react';
export default function ResumeModal({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}){
  return <AnimatePresence>{isOpen&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <motion.div initial={{scale:0.8}} animate={{scale:1}} exit={{scale:0.8}} onClick={e=>e.stopPropagation()} className="bg-secondary rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative">
      <div className="flex justify-between items-center p-4 border-b border-white/10"><h2 className="text-xl font-heading font-semibold">Resume</h2><button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button></div>
      <div className="p-6 overflow-auto" style={{height:'calc(90vh - 70px)'}}>
        <iframe src="/resume.pdf" className="w-full h-full rounded-lg" title="Resume"/>
        <div className="mt-4 flex justify-center"><a href="/resume.pdf" download className="px-6 py-3 bg-accent text-background rounded-lg font-semibold flex items-center gap-2"><Download size={18}/> Download PDF</a></div>
      </div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
