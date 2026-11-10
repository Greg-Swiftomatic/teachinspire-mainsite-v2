import { Formation } from '../components/lecap/Formation';
import { PageMeta } from '../components/seo/PageMeta';

export function FormationPage() {
  return (
    <>
      <PageMeta
        title="La formation : 26 leçons, 6 modules, pour une équipe ou en individuel | TeachInspire"
        description="Formation d’équipe : 4 200 € HT jusqu’à 10 formateurs. Formation individuelle : 790 € HT. 26 leçons en 6 modules, des ateliers en direct, Campus et le Studio pendant un an."
        path="/formation"
      />
      <Formation />
    </>
  );
}
