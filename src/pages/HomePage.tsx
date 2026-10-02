import { Accueil } from '../components/papier/Accueil';
import { PageMeta } from '../components/seo/PageMeta';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="TeachInspire : formation IA pour instituts de langues"
        description="Vos formateurs créent un cours sur mesure pour chaque apprenant avec l'IA : une méthode en quatre étapes, l'IA prépare, le formateur décide. 4 200 € HT jusqu'à 10 formateurs, finançable OPCO."
        path="/"
      />
      <Accueil />
    </>
  );
}
