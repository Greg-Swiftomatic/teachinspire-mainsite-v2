import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// À l'arrivée sur une page : en haut, ou sur l'ancre demandée (/formation#programme).
// Le routeur ne le fait pas, et les liens entre l'accueil, Formation et l'Offre en ont besoin.
// À appeler après usePapierMotion, pour que les séquences épinglées aient déjà pris leur place.
export function useAncre() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    const cible = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!cible) {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.requestAnimationFrame(() => cible.scrollIntoView({ block: 'start' }));
    return () => window.cancelAnimationFrame(id);
  }, [pathname, hash]);
}
