import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="bg-cream">
      <Container className="py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-rust mb-4">
            Erreur 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-navy leading-[1.1] tracking-tight mb-6">
            Page introuvable
          </h1>
          <p className="text-navy/70 text-lg leading-relaxed mb-10">
            Le lien est peut-être incorrect ou la page a ete deplacee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="md" href="/" showArrow>
              Retour a l&apos;accueil
            </Button>
            <Button variant="secondary" size="md" href="/contact" showArrow>
              Contacter Greg
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

