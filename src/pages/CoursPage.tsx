import { PageMeta } from '../components/seo/PageMeta';
import { Cours } from '../components/lecap/Cours';

export function CoursPage() {
  return (
    <>
      <PageMeta
        title="Un cours, de A à Z | TeachInspire"
        description="Un cours complet construit avec la méthode TeachInspire : six étapes, du besoin de l’apprenant aux documents imprimés, à ouvrir un par un."
        path="/cours-de-a-a-z"
      />
      <Cours />
    </>
  );
}
