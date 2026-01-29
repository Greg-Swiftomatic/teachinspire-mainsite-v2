import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveyForm } from './components/SurveyForm';
import { SuccessScreen } from './components/SuccessScreen';

const LOGO_URL = "https://res.cloudinary.com/ducvoebot/image/upload/v1747991665/Teachinspire_logo_transparent_yjt3uf.png";

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <header className="py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <img 
            src={LOGO_URL} 
            alt="TeachInspire" 
            className="h-10 w-auto"
          />
        </div>
      </header>

      <main className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <SuccessScreen key="success" />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold font-display text-navy mb-3">
                    Pre-Course Questionnaire
                  </h1>
                  <p className="text-navy-light text-lg">
                    AI 101 for Language Teachers
                  </p>
                  <p className="text-navy/60 mt-2">
                    A few quick questions so we can get to know you before we start. Takes about 2 minutes.
                  </p>
                </div>

                <SurveyForm onSuccess={() => setIsSubmitted(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-6 px-4 border-t border-navy/10">
        <div className="max-w-2xl mx-auto text-center text-sm text-navy/50">
          © {new Date().getFullYear()} TeachInspire. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
