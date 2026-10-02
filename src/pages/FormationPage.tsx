import { Formation } from '../components/papier/Formation';
import { PageMeta } from '../components/seo/PageMeta';

export function FormationPage() {
  return (
    <>
      <PageMeta
        title="Formation IA pour instituts de langues | TeachInspire"
        description="En six modules, vos formateurs apprennent à créer un cours sur mesure pour chaque apprenant, à partir de vidéos, podcasts et documents authentiques. 25 capsules, 10 h d'ateliers en direct, finançable OPCO."
        path="/formation"
      />
      <Formation />
    </>
  );
}
