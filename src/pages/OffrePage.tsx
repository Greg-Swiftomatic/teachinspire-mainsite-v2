import { Offre } from '../components/papier/Offre';
import { PageMeta } from '../components/seo/PageMeta';

export function OffrePage() {
  return (
    <>
      <PageMeta
        title="L'offre en détail : formation IA pour instituts de langues | TeachInspire"
        description="Prix, contenu, programme, calendrier et financement OPCO de la formation Créez des Cours Sur-Mesure : 4 200 € HT jusqu'à 10 formateurs, 25 capsules, 10 h d'ateliers en direct."
        path="/offre"
      />
      <Offre />
    </>
  );
}
