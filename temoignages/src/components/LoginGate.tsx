import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, LogIn } from 'lucide-react';
import { isLang, useCopy, type Lang } from '../i18n';

export interface Session {
  session: string;
  firstName: string;
  fullName: string;
  formVersion: string;
  /** Langue de l'invitation, null sans invitation (on garde celle du lien). */
  lang: Lang | null;
  email: string;
  alreadySubmitted: boolean;
}

export function LoginGate({ lang, onLogin }: { lang: Lang; onLogin: (s: Session) => void }) {
  const c = useCopy().login;
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
        body: JSON.stringify({ email, password, lang }),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<Omit<Session, 'lang'>> & {
        lang?: unknown;
        error?: string;
      };
      if (!res.ok || !data.session) {
        throw new Error(data.error || c.failed);
      }
      onLogin({
        session: data.session,
        firstName: data.firstName ?? '',
        fullName: data.fullName ?? data.firstName ?? '',
        formVersion: data.formVersion ?? 'mi-parcours',
        lang: isLang(data.lang) ? data.lang : null,
        email: data.email ?? email,
        alreadySubmitted: Boolean(data.alreadySubmitted),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : c.failed);
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
        <span className="ti-label">{c.label}</span>
        <h2 className="mb-3 font-display text-2xl font-semibold leading-snug">
          {c.title}
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed text-navy/70">
          {c.introBefore} <strong className="font-medium">studio.teachinspire.me</strong>
          {c.introAfter}
        </p>

        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-[14px] font-medium">
              {c.email}
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
              {c.password}
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
              href={`https://studio.teachinspire.me/forgot-password?next=${encodeURIComponent(window.location.href)}`}
            >
              {c.forgot}
            </a>
            <button type="submit" className="ti-btn-primary" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {c.submit}
            </button>
          </div>
        </form>
      </div>

      <p className="text-[13px] leading-relaxed text-navy/50">
        {c.privacy}
      </p>
    </motion.div>
  );
}
