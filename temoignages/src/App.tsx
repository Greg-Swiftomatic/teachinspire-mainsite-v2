import { useState } from 'react';
import { motion } from 'framer-motion';
import { TestimonialForm } from './components/TestimonialForm';
import { SuccessScreen } from './components/SuccessScreen';

const LOGO_URL =
  'https://res.cloudinary.com/ducvoebot/image/upload/v1747991665/Teachinspire_logo_transparent_yjt3uf.png';

function readToken(): string | null {
  const t = new URLSearchParams(window.location.search).get('t');
  if (!t) return null;
  return /^[A-Za-z0-9_-]{6,64}$/.test(t) ? t : null;
}

export default function App() {
  const [done, setDone] = useState(false);
  const [creditEmail, setCreditEmail] = useState<string>('');
  const token = readToken();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-navy/10 px-5 py-5">
        <div className="mx-auto w-full max-w-[680px]">
          <img src={LOGO_URL} alt="TeachInspire" className="h-9 w-auto" />
        </div>
      </header>

      <main className="flex-1 px-5 py-10 md:py-14">
        <div className="mx-auto w-full max-w-[680px]">
          {done ? (
              <SuccessScreen key="ok" creditEmail={creditEmail} />
            ) : (
              <motion.div key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}>
                <div className="mb-10">
                  <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
                    Formation TeachInspire
                  </span>
                  <h1 className="mb-4 font-display text-3xl font-semibold leading-tight md:text-[42px]">
                    Votre retour sur la formation
                  </h1>
                  <p className="text-[17px] leading-relaxed text-navy/75">
                    7 minutes, pas plus. La plupart des questions sont à cocher.
                    L&apos;objectif est de comprendre ce que la formation a changé
                    (ou pas) dans votre façon de préparer vos cours.
                  </p>
                  <p className="mt-4 border-l-2 border-yellow bg-yellow/10 px-4 py-3 text-[15px] leading-relaxed text-navy/80">
                    <strong className="font-semibold">
                      60 minutes de crédits audio vous sont offertes
                    </strong>{' '}
                    dès l&apos;envoi de vos réponses, quel que soit leur contenu,
                    et que vous acceptiez ou non d&apos;être cité·e.
                  </p>
                </div>

                <TestimonialForm
                  token={token}
                  onSuccess={(email?: string) => {
                    setCreditEmail(email ?? '');
                    setDone(true);
                  }}
                />
              </motion.div>
            )}
        </div>
      </main>

      <footer className="border-t border-navy/10 px-5 py-6">
        <div className="mx-auto w-full max-w-[680px] text-[13px] text-navy/45">
          TeachInspire, formation IA pour formateurs de langues.
        </div>
      </footer>
    </div>
  );
}
