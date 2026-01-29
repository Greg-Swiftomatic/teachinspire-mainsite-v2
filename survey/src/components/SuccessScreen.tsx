import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 mb-6"
      >
        <CheckCircle className="w-10 h-10 text-sage" />
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-bold font-display text-navy mb-4">
        Thanks for completing this!
      </h2>
      
      <p className="text-navy-light text-lg max-w-md mx-auto">
        We'll use your answers to make the training as relevant as possible for you. 
        See you at the kick-off!
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <a
          href="https://teachinspire.me"
          className="inline-flex items-center gap-2 text-sage hover:text-sage-light transition-colors"
        >
          ← Back to TeachInspire
        </a>
      </motion.div>
    </motion.div>
  );
}
