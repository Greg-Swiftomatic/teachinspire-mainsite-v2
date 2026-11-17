import { Plateforme } from '../components/lecap/Plateforme';
import { PageMeta } from '../components/seo/PageMeta';

export function StudioPage() {
  return (
    <>
      <PageMeta
        title="La plateforme : Campus et le Studio, un an pour chaque formateur | TeachInspire"
        description="Campus pour le parcours, les travaux et le groupe ; le Studio et ses quatre outils (Prompts, Transcription, Audio, Documents) pour préparer les cours. Compris dans la formation, pendant un an."
        path="/studio"
      />
      <Plateforme />
    </>
  );
}
