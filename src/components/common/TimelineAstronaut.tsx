/** Two crewmates on the Experience timeline — one flees, one chases with a knife. */
export function TimelineAstronaut() {
  return (
    <>
      {/* Fleeing crewmate */}
      <div
        className="pointer-events-none absolute left-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 animate-astronaut-climb md:block"
        aria-hidden="true"
      >
        <CrewmateSvg
          body="#22d3ee"
          shadow="#0891b2"
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]"
        />
      </div>

      {/* Impostor with knife */}
      <div
        className="pointer-events-none absolute left-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 animate-alien-chase md:block"
        style={{ animationDelay: '0.35s' }}
        aria-hidden="true"
      >
        <CrewmateSvg
          body="#ef4444"
          shadow="#b91c1c"
          showKnife
          className="drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
        />
      </div>
    </>
  )
}

interface CrewmateSvgProps {
  body: string
  shadow: string
  showKnife?: boolean
  className?: string
}

function CrewmateSvg({
  body,
  shadow,
  showKnife = false,
  className = '',
}: CrewmateSvgProps) {
  return (
    <svg viewBox="0 0 56 72" className={`h-full w-full ${className}`} fill="none">
      {/* backpack */}
      <rect x="6" y="28" width="10" height="22" rx="4" fill={shadow} />
      {/* legs */}
      <rect x="16" y="52" width="10" height="14" rx="4" fill={body} />
      <rect x="30" y="52" width="10" height="14" rx="4" fill={body} />
      <rect x="16" y="60" width="10" height="6" rx="3" fill={shadow} />
      <rect x="30" y="60" width="10" height="6" rx="3" fill={shadow} />
      {/* body */}
      <ellipse cx="28" cy="34" rx="18" ry="22" fill={body} />
      {/* belly shade */}
      <ellipse cx="30" cy="38" rx="11" ry="14" fill={shadow} opacity="0.35" />
      {/* visor */}
      <ellipse cx="34" cy="28" rx="11" ry="8" fill="#67e8f9" />
      <ellipse cx="34" cy="28" rx="11" ry="8" fill="#0e7490" opacity="0.35" />
      <ellipse cx="31" cy="25" rx="4" ry="2.5" fill="#ecfeff" opacity="0.75" />

      {showKnife && (
        <g className="origin-center animate-astronaut-arm">
          {/* arm holding knife */}
          <path
            d="M40 36 C46 30 48 22 46 16"
            stroke={body}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* knife handle */}
          <rect
            x="43"
            y="10"
            width="4"
            height="10"
            rx="1"
            fill="#78716c"
            transform="rotate(-25 45 15)"
          />
          {/* blade */}
          <path
            d="M40 8 L52 2 L50 12 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="0.5"
          />
        </g>
      )}

      {!showKnife && (
        <>
          {/* spooked arms up */}
          <path
            d="M14 34 C8 26 10 16 16 12"
            stroke={body}
            strokeWidth="5"
            strokeLinecap="round"
            className="origin-center animate-astronaut-arm"
          />
          <path
            d="M42 34 C48 26 46 16 40 12"
            stroke={body}
            strokeWidth="5"
            strokeLinecap="round"
            className="origin-center animate-astronaut-arm"
            style={{ animationDelay: '0.2s' }}
          />
        </>
      )}
    </svg>
  )
}
