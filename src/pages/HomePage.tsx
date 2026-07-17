import { ApprovedHome } from '../components/home/ApprovedHome';
import { ScrollScene } from '../components/motion/ScrollScene';
import { PageMeta } from '../components/seo/PageMeta';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="TeachInspire — IA pour formateurs de langues"
        description="Formation IA pour instituts de langues. Vos formateurs apprennent à créer des cours à partir de sources réelles, avec une méthode commune et des critères pédagogiques clairs."
        path="/"
      />
      <ScrollScene>
        <ApprovedHome />
      </ScrollScene>
    </>
  );
}
