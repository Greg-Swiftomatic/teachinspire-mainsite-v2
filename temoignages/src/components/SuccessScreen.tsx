import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SuccessScreen({ creditEmail }: { creditEmail?: string }) {
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
        Merci, c&apos;est enregistré.
      </h1>

      <p className="mb-6 text-[17px] leading-relaxed text-navy/75">
        Vos réponses nous servent à améliorer la formation. Les critiques
        comptent autant que les compliments.
      </p>

      <div className="mb-6 border-l-2 border-sage bg-sage/10 px-5 py-4">
        <p className="text-[15px] leading-relaxed text-navy/80">
          <strong className="font-semibold">Vos 30 minutes de crédits audio</strong>{' '}
          seront ajoutées sous 48 heures à votre compte Studio
          {creditEmail ? <> (<span className="font-medium">{creditEmail}</span>)</> : null}.
        </p>
      </div>

      <p className="text-[15px] leading-relaxed text-navy/65">
        Si vous avez autorisé la publication, Grégory vous enverra la version
        exacte du texte avant toute mise en ligne. Rien ne sera publié sans
        votre accord écrit.
      </p>

      <p className="mt-8 text-[14px] text-navy/50">
        Une question ? <a className="text-rust underline underline-offset-2"
        href="mailto:greg@teachinspire.me">greg@teachinspire.me</a>
      </p>
    </motion.div>
  );
}
