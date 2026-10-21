import { useRef } from 'react';
import { gsap } from 'gsap';
import { BOOKING_URL } from '../../assets/assets';
import { AppelFinal, Bouton, Illustration, Rythme, Sur, Titre } from './Papier';
import { chiffres, garde, livrables, modules, publicCible } from './offre-data';
import { usePapierMotion } from './usePapierMotion';
import './formation.css';

// Le dossier de Katrin : un document par module, avec son vrai contenu.
function DocModule({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <p className="pe-doc-type">Fiche apprenant</p>
          <h4>Katrin V.</h4>
          <dl className="fo-fiche">
            <dt>Métier</dt><dd>Coordinatrice logistique</dd>
            <dt>Niveau</dt><dd>B1+ en français</dd>
            <dt>Situations</dt><dd>Appels de transporteurs, retards, réclamations</dd>
          </dl>
          <p className="pe-annot fo-note">son vrai besoin&nbsp;!</p>
        </>
      );
    case 1:
      return (
        <>
          <p className="pe-doc-type">Calendrier · 8 semaines · 24&nbsp;h</p>
          <ol className="fo-calendrier">
            <li><b>S1</b> Se présenter, présenter son poste</li>
            <li><b>S2</b> Suivre une commande</li>
            <li className="fo-cible"><b>S3</b> Prendre un appel, clarifier un retard</li>
            <li><b>S4</b> Négocier un nouveau créneau</li>
          </ol>
          <p className="pe-annot fo-note">séance choisie</p>
        </>
      );
    case 2:
      return (
        <>
          <p className="pe-doc-type">Sources retenues</p>
          <ul className="fo-sources">
            <li><span>▶</span>Vlog d&apos;un chauffeur routier : les temps de conduite</li>
            <li><span>▶</span>Témoignage : une tournée pleine d&apos;imprévus</li>
          </ul>
          <p className="fo-petit">Transcrites, passages utiles repérés</p>
        </>
      );
    case 3:
      return (
        <>
          <p className="pe-doc-type">Fiche de séance 3 · 90&nbsp;min</p>
          <p className="fo-tache"><b>Tâche finale :</b> simuler l&apos;appel d&apos;un transporteur qui annonce un retard.</p>
          <ul className="fo-criteres">
            <li>comprend le problème</li>
            <li>demande une précision utile</li>
            <li>confirme la suite</li>
          </ul>
        </>
      );
    case 4:
      return (
        <>
          <p className="pe-doc-type">Dialogue audio · 2 voix</p>
          <div className="fo-onde" aria-hidden="true">
            {Array.from({ length: 34 }, (_, k) => (
              <i key={k} style={{ height: `${18 + Math.round(Math.abs(Math.sin(k * 1.7)) * 26)}px` }} />
            ))}
          </div>
          <p className="fo-replique">« Je vous appelle pour la livraison de jeudi… »</p>
          <p className="fo-petit">+ exercices de compréhension, entraînement, simulation</p>
        </>
      );
    default:
      return (
        <>
          <p className="pe-doc-type">Pack final</p>
          <ul className="fo-pack">
            <li>Support apprenant</li>
            <li>Dialogue audio</li>
            <li>Guide enseignant</li>
            <li>Plan de cours</li>
          </ul>
          <span className="pe-tampon fo-tampon">validé</span>
        </>
      );
  }
}

// La séquence épinglée : à chaque module, un document se pose sur le dossier.
function sequence(scope: HTMLElement, bureau: boolean) {
  if (!bureau) return;
  const zone = scope.querySelector<HTMLElement>('.fo-sequence');
  if (!zone) return;
  const docs = gsap.utils.toArray<HTMLElement>('.fo-doc', zone);
  const items = gsap.utils.toArray<HTMLElement>('.fo-module', zone);
  const n = docs.length;

  zone.classList.add('est-epingle');
  gsap.set(docs, { yPercent: -50, xPercent: 0 });
  gsap.set(docs.slice(1), { x: 160, y: 40, rotate: 7, opacity: 0 });
  gsap.set(docs[0], { rotate: -1.5 });
  gsap.set(zone.querySelector('.fo-tampon'), { scale: 2.4, opacity: 0, rotate: 10 });

  const actif = (k: number) => items.forEach((item, j) => item.classList.toggle('est-actif', j === k));
  actif(0);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: zone,
      start: 'top top+=96',
      end: `+=${n * 70}%`,
      pin: true,
      scrub: 0.6,
      // le texte change quand le document du module est presque posé
      onUpdate: (self) => actif(Math.min(n - 1, Math.floor(self.progress * tl.duration() + 0.7))),
      onLeaveBack: () => actif(0),
    },
  });

  for (let i = 1; i < n; i++) {
    tl.to(docs[i], { x: 0, y: 0, rotate: i % 2 ? 1.5 : -1.5, duration: 1, ease: 'power2.out' }, i - 1);
    tl.to(docs[i], { opacity: 1, duration: 0.2, ease: 'none' }, i - 1);
    docs.slice(0, i).forEach((precedent, k) => {
      const recul = i - k;
      tl.to(precedent, { x: -recul * 22, y: -recul * 16, scale: 1 - recul * 0.04, duration: 1, ease: 'power2.out' }, i - 1);
    });
    tl.to(zone.querySelector('.fo-rail i'), { scaleY: (i + 1) / n, duration: 1, ease: 'none' }, i - 1);
  }
  tl.to(zone.querySelector('.fo-tampon'), { scale: 1, opacity: 1, rotate: -12, duration: 0.4, ease: 'power3.in' }, n - 1.3);
  tl.to({}, { duration: 0.5 });
}

export function Formation() {
  const ref = useRef<HTMLDivElement>(null);
  usePapierMotion(ref, sequence);

  return (
    <div className="pe-page fo" ref={ref}>
      <section className="pe-section fo-hero" aria-labelledby="fo-titre">
        <div className="pe-cadre fo-hero-grille">
          <div>
            <p className="pe-sur">La formation · Créez des Cours Sur-Mesure</p>
            <Titre as="h1" id="fo-titre" texte="Du besoin de l'apprenant au cours validé, en six modules." souligne="validé," immediat />
            <p className="pe-intro" data-monte>
              Un parcours pour toute l&apos;équipe. Chaque formateur part d&apos;un vrai apprenant et
              repart avec son cours complet, et une méthode à refaire pour le suivant. L&apos;IA
              prépare, le formateur décide.
            </p>
            <div className="pe-actions" data-monte>
              <Bouton href={BOOKING_URL}>Réserver 15 minutes →</Bouton>
              <Bouton href="#programme" variante="trait">Voir le programme</Bouton>
            </div>
            <p className="fo-pratique" data-monte>
              4&nbsp;200&nbsp;€&nbsp;HT jusqu&apos;à 10 formateurs · Finançable par votre OPCO
            </p>
          </div>
          <div className="fo-hero-visuel">
            <Illustration nom="02-cours-complet" alt="Un cours complet posé sur un bureau : support apprenant, guide enseignant, plan de cours et dialogue audio." eager />
            <p className="pe-annot fo-hero-note" data-monte>un cours complet, à la fin du parcours ↑</p>
          </div>
        </div>
        <div className="pe-cadre">
          <ul className="pe-chiffres fo-chiffres">
            {chiffres.map((c) => (
              <li key={c.label} data-monte>
                <b data-compte={c.valeur} data-suffixe={c.suffixe}>{c.valeur}{c.suffixe}</b>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section pe-calme fo-public" aria-labelledby="fo-public-titre">
        <div className="pe-cadre fo-public-grille">
          <Titre id="fo-public-titre" texte="Cette formation est pour votre équipe si…" />
          <ul>
            {publicCible.map((item) => (
              <li key={item.fort} data-monte>
                <span aria-hidden="true">→</span>
                <p>{item.avant}<strong>{item.fort}</strong>{item.apres}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="programme" className="pe-section fo-programme" aria-labelledby="fo-programme-titre">
        <div className="pe-cadre">
          <Sur>Le programme</Sur>
          <Titre id="fo-programme-titre" texte="Un vrai apprenant, suivi de bout en bout." />
          <p className="pe-intro" data-monte>
            Dans les démonstrations, vous suivez Katrin, coordinatrice logistique de niveau B1+, qui
            doit gérer les appels des transporteurs. Dans les mises en pratique, chaque formateur
            suit son propre apprenant. À chaque module, son dossier s&apos;enrichit d&apos;un document.
          </p>
        </div>
        <div className="pe-cadre fo-sequence">
          <span className="fo-rail" aria-hidden="true"><i /></span>
          <ol className="fo-modules">
            {modules.map((m, i) => (
              <li className="fo-module" key={m.numero}>
                <div className="fo-module-texte" data-monte>
                  <p className="fo-module-num">Module {m.numero}</p>
                  <h3>{m.nom}</h3>
                  <div className="fo-module-corps">
                    <div>
                      <p>{m.resume}</p>
                      <p className="fo-remis"><b>Chaque formateur remet :</b> {m.remis}</p>
                    </div>
                  </div>
                </div>
                <div className="pe-doc fo-doc" data-monte>
                  <DocModule i={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pe-section pe-calme fo-garde" aria-labelledby="fo-garde-titre">
        <div className="pe-cadre">
          <Sur>À la fin du parcours</Sur>
          <Titre id="fo-garde-titre" texte="Ce que chaque formateur garde." />
          <ol className="fo-garde-liste">
            {garde.map((g, i) => (
              <li key={g.titre} data-monte>
                <span className="fo-garde-num">{i + 1}</span>
                <h3>{g.titre}</h3>
                <p>{g.texte}</p>
              </li>
            ))}
          </ol>
          <p className="fo-livrables-titre" data-monte>Le premier cours complet contient :</p>
          <ul className="fo-livrables">
            {livrables.map((l) => (
              <li className="pe-doc" key={l.titre} data-monte>
                <h3>{l.titre}</h3>
                <p>{l.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section fo-outils" aria-labelledby="fo-outils-titre">
        <div className="pe-cadre">
          <Sur>Les outils</Sur>
          <Titre id="fo-outils-titre" texte="N'importe quelle IA, et le Studio inclus." />
          <p className="pe-intro" data-monte>
            Les démonstrations se font sur Gemini, avec un compte gratuit. La méthode marche aussi
            avec ChatGPT, Claude ou Mistral : elle ne dépend pas d&apos;un outil. Pour la
            production, le Studio est inclus pendant 6&nbsp;mois.
          </p>
          <ul className="fo-studio">
            <li data-monte><b>Prompts</b><span>en accès libre</span></li>
            <li data-monte><b>Audio</b><span>60&nbsp;min de synthèse vocale par mois</span></li>
            <li data-monte><b>Transcription</b><span>10&nbsp;h par mois</span></li>
            <li data-monte><b>Documents</b><span>mise en forme et export PDF</span></li>
          </ul>
          <div className="fo-decide" data-monte>
            <p>À chaque étape, l&apos;IA prépare et le formateur décide :</p>
            <ul>
              <li><b>Il cadre</b> le contexte, l&apos;objectif et le niveau.</li>
              <li><b>Il vérifie</b> chaque résultat contre les sources.</li>
              <li><b>Il adapte</b>, puis valide la version qu&apos;il utilisera en cours.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pe-section pe-calme fo-deroule" aria-labelledby="fo-deroule-titre">
        <div className="pe-cadre">
          <div className="fo-deroule-grille">
            <div>
              <Sur>Le déroulé</Sur>
              <Titre id="fo-deroule-titre" texte="Une formation d'équipe, à votre rythme." />
              <div className="fo-formats">
                <article data-monte>
                  <h3>25 capsules vidéo</h3>
                  <p>Courtes, environ 3&nbsp;h&nbsp;40 au total. Chaque formateur avance entre les ateliers, sur son propre temps.</p>
                </article>
                <article data-monte>
                  <h3>10&nbsp;h en direct</h3>
                  <p>Un lancement d&apos;1&nbsp;h, puis 6 ateliers de 1&nbsp;h&nbsp;30 sur vos cas réels. Les replays restent dans la communauté.</p>
                </article>
                <article data-monte>
                  <h3>6 mises en pratique</h3>
                  <p>Une par module, sur l&apos;apprenant de chaque formateur. Pas de quiz : des documents utilisables en classe.</p>
                </article>
                <article data-monte>
                  <h3>Un campus pendant 12 mois</h3>
                  <p>La formation, la communauté et le Studio sous un seul lien, pour partager les créations de l&apos;équipe.</p>
                </article>
              </div>
            </div>
            <Illustration nom="05-equipe-B" alt="Un atelier en direct sur un ordinateur portable : le calendrier de formation à l'écran, l'équipe de l'institut connectée." />
          </div>
          <Rythme />
        </div>
      </section>

      <section className="pe-section pe-sombre fo-prix" data-sombre aria-labelledby="fo-prix-titre">
        <div className="pe-cadre fo-prix-grille">
          <div>
            <Sur>Le prix</Sur>
            <Titre id="fo-prix-titre" texte="Un prix par institut, pas par formateur." />
          </div>
          <div>
            <p className="fo-prix-montant">
              <span data-compte="4200">4&nbsp;200</span>&nbsp;€&nbsp;HT
              <small>jusqu&apos;à 10 formateurs</small>
            </p>
            <ul className="fo-prix-points">
              <li data-monte>Puis 250&nbsp;€&nbsp;HT par formateur supplémentaire.</li>
              <li data-monte>Finançable par votre OPCO, avec le portage administratif d&apos;un organisme partenaire certifié Qualiopi.</li>
              <li data-monte>Paiement en 3 fois sans frais possible.</li>
            </ul>
            <div className="pe-actions" data-monte>
              <Bouton href="/offre" variante="clair">Voir l&apos;offre détaillée →</Bouton>
              <Bouton href={BOOKING_URL} variante="trait">Réserver 15 minutes</Bouton>
            </div>
          </div>
        </div>
      </section>

      <AppelFinal lienOffre />
    </div>
  );
}
