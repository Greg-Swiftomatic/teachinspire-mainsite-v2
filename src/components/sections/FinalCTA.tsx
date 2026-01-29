import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { TextReveal } from '../ui/TextReveal';

export function FinalCTA() {
  return (
    <section className="bg-cream py-16 lg:py-20 border-t border-navy/5 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-yellow/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-sage/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-navy mb-4">
            <TextReveal delay={0.2}>
              Prêt à créer des cours vraiment sur-mesure ?
            </TextReveal>
          </h2>

          <motion.p
            className="text-lg text-navy-light mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Réservez un appel découverte gratuit de 15 minutes. Sans engagement.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              >
                Réserver mon appel
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button variant="secondary" size="lg" href="/formation">
                Voir le programme
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-sm text-navy-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Questions ?{' '}
            <motion.a
              href="mailto:greg@teachinspire.me"
              className="text-sage hover:text-navy transition-colors duration-200 underline underline-offset-2"
              whileHover={{ scale: 1.05 }}
            >
              greg@teachinspire.me
            </motion.a>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
