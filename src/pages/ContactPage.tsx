import { useRef } from 'react';
import { PageMeta } from '../components/seo/PageMeta';
import { ConversationIllustration } from '../components/lecap/Illustrations';
import { Words, order, useMotion } from '../components/lecap/motion';
import { BOOKING_URL, CTA_APPEL } from '../components/lecap/site';
import '../components/lecap/pages.css';
import '../components/lecap/simple.css';

const EMAIL = 'greg@teachinspire.me';

export function ContactPage() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);

  return (
    <div className="lc lc-page" ref={page}>
      <PageMeta
        title="Contact : réserver 15 minutes avec TeachInspire"
        description="Parlons de vos formateurs, de vos contraintes et de la place que l’IA peut prendre dans votre institut de langues."
        path="/contact"
      />

      <section className="lc-wrap" aria-labelledby="contact-titre">
        <div className="lc-green lc-intro" data-surface="green" data-reveal>
          <div className="lc-intro-text">
            <p className="lc-hero-kicker">Contact</p>
            <h1 id="contact-titre"><Words text="Parlons de votre équipe." dot /></h1>
            <p className="lc-hero-lead" data-rise style={order(3)}>
              Vos formateurs, leurs outils, les cours qu’ils préparent, et la place que l’IA peut
              vraiment prendre chez vous.
            </p>
          </div>
          <div data-rise style={order(2)}><ConversationIllustration /></div>
        </div>
      </section>

      <section className="lc-wrap lc-ways" aria-label="Deux façons de nous joindre">
        <article className="lc-tile lc-tile--ask lc-way" data-reveal data-rise>
          <p className="lc-kicker">Le plus simple</p>
          <h2>Réserver un appel de 15 minutes</h2>
          <p>
            15 minutes en visio pour parler de votre équipe : vos outils actuels, les cours
            qu’elle prépare, et là où l’IA peut vraiment aider.
          </p>
          <p>
            Vous repartez avec un avis honnête, même si nous ne travaillons pas ensemble. Sans
            engagement, sans relance insistante.
          </p>
          <a className="lc-btn lc-btn--yellow" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
        </article>

        <article className="lc-tile lc-tile--sand lc-way" data-reveal data-rise style={order(1)}>
          <p className="lc-kicker">Par écrit</p>
          <h2>Écrivez-moi directement</h2>
          <a className="lc-way-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p>Je réponds généralement sous 24 heures.</p>
          <a className="lc-btn lc-btn--line" href={`mailto:${EMAIL}`}>Envoyer un e-mail</a>
        </article>
      </section>
    </div>
  );
}
