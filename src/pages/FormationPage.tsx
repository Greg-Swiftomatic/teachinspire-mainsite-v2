import { ApprovedFormation } from '../components/formation/ApprovedFormation';
import { ScrollScene } from '../components/motion/ScrollScene';
import { PageMeta } from '../components/seo/PageMeta';

export function FormationPage() {
  return (
    <>
      <PageMeta
        title="Formation IA pour instituts de langues | TeachInspire"
        description="En 3 mois, vos formateurs apprennent à transformer une vidéo, un podcast ou un document en cours sur mesure, avec une méthode commune et des supports prêts à utiliser."
        path="/formation"
      />
      <ScrollScene>
        <ApprovedFormation />
      </ScrollScene>
    </>
  );
}
