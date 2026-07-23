import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, LogIn } from 'lucide-react';

export interface Session {
  session: string;
  firstName: string;
  email: string;
  alreadySubmitted: boolean;
}

export function LoginGate({ onLogin }: { onLogin: (s: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<Session> & { error?: string };
      if (!res.ok || !data.session) {
        throw new Error(data.error || 'Connexion impossible.');
      }
      onLogin({
        session: data.session,
        firstName: data.firstName ?? '',
        email: data.email ?? email,
        alreadySubmitted: Boolean(data.alreadySubmitted),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible.');
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 border border-navy/12 bg-white p-6 md:p-8">
        <span className="ti-label">Réservé aux participants</span>
        <h2 className="mb-3 font-display text-2xl font-semibold leading-snug">
          Connectez-vous avec votre compte Studio
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed text-navy/70">
          Le questionnaire (et les 30 minutes de crédits audio offertes) est
          réservé aux participants de la formation. Utilisez les identifiants de
          votre compte <strong className="font-medium">studio.teachinspire.me</strong>.
        </p>

        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-[14px] font-medium">
              Email du compte
            </label>
            <input
              id="login-email"
              className="ti-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-[14px] font-medium">
              Mot de passe
            </label>
            <input
              id="login-password"
              className="ti-input"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="border-l-2 border-rust bg-rust/10 px-4 py-3 text-[14px]">
              {error}
            </p>
          )}

          <div className="mt-1 flex items-center justify-between gap-4">
            <a
              className="text-[13.5px] text-rust underline underline-offset-2"
              href="https://studio.teachinspire.me/forgot-password.html"
              target="_blank"
              rel="noreferrer"
            >
              Mot de passe oublié ?
            </a>
            <button type="submit" className="ti-btn-primary" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Se connecter
            </button>
          </div>
        </form>
      </div>

      <p className="text-[13px] leading-relaxed text-navy/50">
        Vos identifiants sont vérifiés directement auprès du Studio et ne sont
        ni enregistrés ni conservés par ce formulaire.
      </p>
    </motion.div>
  );
}
