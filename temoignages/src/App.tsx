import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TestimonialForm } from './components/TestimonialForm';
import { SuccessScreen } from './components/SuccessScreen';
import { LoginGate, type Session } from './components/LoginGate';
import { COPY, CopyContext, langFromUrl, type Lang } from './i18n';

const LOGO_URL =
  // Recadré sur le logo : l'image source a de larges marges transparentes.
  'https://res.cloudinary.com/ducvoebot/image/upload/c_crop,x_110,y_246,w_830,h_540/v1747991665/Teachinspire_logo_transparent_yjt3uf.png';

function readToken(): string | null {
  const t = new URLSearchParams(window.location.search).get('t');
  if (!t) return null;
  return /^[A-Za-z0-9_-]{6,64}$/.test(t) ? t : null;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [done, setDone] = useState(false);
  const [credited, setCredited] = useState(false);
  const [step, setStep] = useState(1);
  const token = readToken();
  const finished = session?.formVersion === 'fin-de-parcours';
  // L'invitation fait foi une fois connecté ; avant, le lien porte ?lang=.
  const [urlLang] = useState<Lang>(langFromUrl);
  const lang: Lang = session?.lang ?? urlLang;
  const c = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = c.meta.title;
  }, [lang, c]);

  const phase: 'login' | 'already' | 'form' | 'done' = done
    ? 'done'
    : !session
      ? 'login'
      : session.alreadySubmitted
        ? 'already'
        : 'form';

  return (
    <CopyContext.Provider value={c}>
      <div className="flex min-h-screen flex-col bg-cream">
        <header className="border-b border-navy/10 px-5 py-5">
          <div className="mx-auto flex w-full max-w-[680px] items-center justify-between">
            <img src={LOGO_URL} alt="TeachInspire" className="h-11 w-auto" />
            {session && <span className="text-[13px] text-navy/55">{session.email}</span>}
          </div>
        </header>

        <main className="flex-1 px-5 py-10 md:py-14">
          <div className="mx-auto w-full max-w-[680px]">
            {phase === 'done' ? (
              <SuccessScreen creditEmail={session?.email} credited={credited} finished={finished} />
            ) : phase === 'already' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10"
              >
                <h1 className="mb-4 font-display text-3xl font-semibold md:text-4xl">
                  {c.app.thanks(session?.firstName ?? '')}
                </h1>
                <p className="text-[17px] leading-relaxed text-navy/75">
                  {c.app.already}{' '}
                  <a
                    className="text-rust underline underline-offset-2"
                    href="mailto:greg@teachinspire.me"
                  >
                    greg@teachinspire.me
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-10">
                  <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
                    {c.app.eyebrow}
                  </span>
                  <h1 className="mb-4 font-display text-3xl font-semibold leading-tight md:text-[42px]">
                    {phase === 'form' && session?.firstName
                      ? c.app.hello(session.firstName)
                      : c.app.title}
                  </h1>
                  {step === 1 && (<>
                  <p className="text-[17px] leading-relaxed text-navy/75">
                    {c.app.intro}
                    {finished ? c.app.goalFinished : c.app.goalOngoing}
                  </p>
                  <p className="mt-4 border-l-2 border-yellow bg-yellow/10 px-4 py-3 text-[15px] leading-relaxed text-navy/80">
                    <strong className="font-semibold">
                      {c.app.creditStrong}
                    </strong>{' '}
                    {c.app.creditRest}
                  </p>
                  </>)}
                </div>

                {phase === 'login' ? (
                  <LoginGate lang={lang} onLogin={setSession} />
                ) : (
                  <TestimonialForm
                    token={token}
                    session={session!.session}
                    fullName={session!.fullName}
                    onStepChange={setStep}
                    finished={finished}
                    lang={lang}
                    onSuccess={(c) => {
                      setCredited(c);
                      setDone(true);
                    }}
                  />
                )}
              </motion.div>
            )}
          </div>
        </main>

        <footer className="border-t border-navy/10 px-5 py-6">
          <div className="mx-auto w-full max-w-[680px] text-[13px] text-navy/45">
            {c.app.footer}
          </div>
        </footer>
      </div>
    </CopyContext.Provider>
  );
}
