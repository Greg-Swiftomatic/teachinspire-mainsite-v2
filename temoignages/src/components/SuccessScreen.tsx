import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCopy } from '../i18n';

export function SuccessScreen({
  creditEmail, credited, finished,
}: { creditEmail?: string; credited?: boolean; finished?: boolean }) {
  const c = useCopy().success;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-10"
    >
      <div className="mb-7 grid h-12 w-12 place-items-center bg-rust">
        <Check className="h-6 w-6 text-white" strokeWidth={3} />
      </div>

      <h1 className="mb-4 font-display text-3xl font-semibold md:text-4xl">
        {c.title}
      </h1>

      <p className="mb-6 text-[17px] leading-relaxed text-navy/75">
        {finished ? c.usedFinished : c.usedOngoing} {c.critique}
      </p>

      <div className="mb-6 border-l-2 border-sage bg-sage/10 px-5 py-4">
        <p className="text-[15px] leading-relaxed text-navy/80">
          <strong className="font-semibold">{c.creditStrong}</strong>{' '}
          {credited ? c.creditAdded : c.creditPending} {c.creditTo}
          {creditEmail ? <> (<span className="font-medium">{creditEmail}</span>)</> : null}.
        </p>
      </div>

      <p className="text-[15px] leading-relaxed text-navy/65">
        {c.review}
      </p>

      <p className="mt-8 text-[14px] text-navy/50">
        {c.question} <a className="text-rust underline underline-offset-2"
        href="mailto:greg@teachinspire.me">greg@teachinspire.me</a>
      </p>
    </motion.div>
  );
}
