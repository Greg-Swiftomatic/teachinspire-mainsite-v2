type ProofIconName = 'award' | 'calendar' | 'screen' | 'team';

interface ProofItem {
  icon: ProofIconName;
  label: string;
  value: string;
}

const proofItems: ProofItem[] = [
  { icon: 'award', label: 'Certifié Qualiopi', value: 'éligible au financement OPCO' },
  { icon: 'calendar', label: 'Programme', value: 'de 3 mois' },
  { icon: 'screen', label: 'Studio inclus', value: 'pendant 1 an' },
  { icon: 'team', label: "Formation d'équipe", value: '1 à 15 formateurs' },
];

export function HeroProofStrip() {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-5 border-t border-navy/10 pt-6 lg:grid-cols-4 lg:gap-x-0">
      {proofItems.map(({ icon, label, value }) => (
        <li
          key={label}
          className="flex min-w-0 items-start gap-3 lg:px-4 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-navy/10"
        >
          <ProofIcon name={icon} />
          <p className="text-xs leading-5 text-navy-light sm:text-sm">
            <span className="block">{label}</span>
            <strong className="font-semibold text-navy">{value}</strong>
          </p>
        </li>
      ))}
    </ul>
  );
}

function ProofIcon({ name }: { name: ProofIconName }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage/15 text-navy" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {name === 'award' && (
          <>
            <path d="M16 4.5l2.2 1.7 2.8-.1.8 2.7 2.3 1.6-1 2.6.8 2.7-2.4 1.5-.9 2.7-2.8-.3-2.2 1.6-2.1-1.8-2.8.1-.7-2.7-2.3-1.7 1.1-2.6-.7-2.7 2.4-1.4 1-2.7 2.7.3z" />
            <path d="M12.2 20.1l-1.4 7.1 5.1-2.4 4.7 2.6-1.1-7.2M13.3 12.5l1.8 1.8 3.7-4" />
          </>
        )}
        {name === 'calendar' && (
          <>
            <path d="M7 8.5h18v17H7zM7 13h18M11 5.5v5.7M21 5.5v5.7" />
            <path d="M11 17h2M16 17h2M21 17h1M11 21h2M16 21h2M21 21h1" />
          </>
        )}
        {name === 'screen' && (
          <>
            <path d="M5 7.5h22v15H5zM11 26h10M16 22.5V26" />
            <path d="M13 12l7 3.3-7 3.2z" />
          </>
        )}
        {name === 'team' && (
          <>
            <circle cx="12" cy="11" r="4" /><circle cx="22.5" cy="12.5" r="3" />
            <path d="M4.5 26c.4-5.1 3.2-8 7.5-8s7.2 2.9 7.5 8M19.2 19.2c4.6-.9 7.7 1.3 8.3 5.6" />
          </>
        )}
      </svg>
    </span>
  );
}
