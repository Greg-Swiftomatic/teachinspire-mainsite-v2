import { Home } from '../components/lecap/Home';
import { PageMeta } from '../components/seo/PageMeta';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="TeachInspire : vos formateurs créent des cours sur mesure avec l’IA"
        description="Une formation pour les instituts de langues et les formateurs indépendants : une méthode en six modules pour partir du métier de chaque apprenant et arriver à un cours prêt à enseigner."
        path="/"
      />
      <Home />
    </>
  );
}
