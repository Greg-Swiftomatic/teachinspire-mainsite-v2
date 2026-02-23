import { motion } from 'framer-motion';
import type { SourceId } from './sourceConfigs';

interface SourceCardProps {
  id: SourceId;
  label: string;
  sublabel: string;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

export function SourceCard({
  id,
  label,
  sublabel,
  isActive,
  isAnyActive,
  onClick,
}: SourceCardProps) {
  const dimmed = isAnyActive && !isActive;

  return (
    <motion.div
      role="button"
      tabIndex={dimmed ? -1 : 0}
      aria-pressed={isActive}
      aria-label={`Voir la transformation : ${label}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      // Spring physics for hover and tap
      whileHover={dimmed ? undefined : { scale: 1.02, y: -2 }}
      whileTap={dimmed ? undefined : { scale: 0.98 }}
      transition={springTransition}
      animate={{
        opacity: dimmed ? 0.35 : 1,
        filter: dimmed ? 'blur(1px)' : 'blur(0px)',
        scale: isActive ? 1.02 : 1,
        y: isActive ? -2 : 0,
      }}
      className={`
        group cursor-pointer outline-none
        ${dimmed ? 'pointer-events-none' : ''}
      `}
    >
      <div
        className={`
          relative flex items-center gap-4 p-4
          bg-white border overflow-hidden
          transition-colors duration-300 ease-out
          focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2
          ${isActive
            ? 'border-rust'
            : 'border-navy/10 hover:border-navy/25'
          }
        `}
      >
        {/* Accent underline bar — draws on when active */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-rust origin-left transition-transform duration-500 ease-out"
          style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        {/* Icon container with ring animation on active */}
        <div className="relative flex-shrink-0">
          <div
            className={`
              w-12 h-12 flex items-center justify-center
              transition-colors duration-300
              ${isActive ? 'bg-rust/6' : 'bg-sage/10 group-hover:bg-sage/15'}
            `}
          >
            <SourceIcon type={id} isActive={isActive} />
          </div>

          {/* Expanding ring on active */}
          {isActive && (
            <motion.div
              className="absolute inset-0 border-2 border-rust/30"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className={`
              text-sm font-medium truncate transition-colors duration-300
              ${isActive ? 'text-rust' : 'text-navy'}
            `}
          >
            {label}
          </p>
          <p className="text-xs text-navy/50 truncate">{sublabel}</p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
          animate={{
            x: isActive ? 3 : 0,
            color: isActive ? '#B7553D' : 'rgba(44,61,87,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SourceIcon({ type, isActive }: { type: SourceId; isActive: boolean }) {
  const color = isActive ? '#B7553D' : '#2c3d57';

  return (
    <motion.div
      className="w-12 h-12 flex items-center justify-center"
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={springTransition}
    >
      {type === 'video' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" stroke={color} strokeWidth="1.5" />
          <path d="M10 9l5 3-5 3V9z" fill={color} />
        </svg>
      )}
      {type === 'podcast' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="3" width="6" height="10" rx="3" stroke={color} strokeWidth="1.5" />
          <path d="M5 11v1a7 7 0 0014 0v-1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 18v3M9 21h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {type === 'article' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" stroke={color} strokeWidth="1.5" />
          <path d="M8 7h8M8 11h8M8 15h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {type === 'report' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" stroke={color} strokeWidth="1.5" />
          <path d="M7 14v2M11 11v5M15 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </motion.div>
  );
}
