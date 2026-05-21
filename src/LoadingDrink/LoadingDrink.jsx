import "./LoadingDrink.css";

export default function LoadingDrink() {
  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <svg
          className="drinker"
          viewBox="0 0 140 130"
          width="160"
          height="150"
          aria-label="Person sipping matcha"
        >
          {/* Steam wisps above cup */}
          <path d="M100 42 Q103 35 100 28" className="steam steam-1" />
          <path d="M108 42 Q111 35 108 28" className="steam steam-2" />
          <path d="M116 42 Q119 35 116 28" className="steam steam-3" />

          {/* Matcha cup — trapezoid shape */}
          <polygon points="92,44 126,44 122,62 96,62" className="cup-body" />
          <rect x="91" y="40" width="36" height="6" rx="3" className="cup-rim" />
          {/* Matcha liquid surface */}
          <ellipse cx="109" cy="46" rx="14" ry="3" className="matcha-surface" />

          {/* Cup handle */}
          <path d="M126 48 Q136 48 136 54 Q136 60 126 60" className="cup-handle" />

          {/* Arm — side-on, reaching forward to cup */}
          <path
            d="M68 62 Q80 56 92 50"
            className="limb arm"
            strokeLinecap="round"
          />

          {/* Body */}
          <line x1="68" y1="46" x2="68" y2="90" className="limb body" />

          {/* Head — side profile */}
          <circle cx="68" cy="32" r="16" className="head" />
          {/* Ear */}
          <ellipse cx="55" cy="33" rx="4" ry="5" className="head" />
          {/* Eye */}
          <circle cx="72" cy="30" r="2.5" className="eye" />
          {/* Nose bump */}
          <path d="M80 36 Q85 38 80 40" className="nose" />
          {/* Smile */}
          <path d="M76 42 Q80 46 76 47" className="mouth" />

          {/* Hair */}
          <path
            d="M52 28 Q56 14 68 16 Q80 14 82 24"
            className="hair"
          />

          {/* Legs */}
          <line x1="68" y1="90" x2="52" y2="122" className="limb leg" />
          <line x1="68" y1="90" x2="78" y2="122" className="limb leg" />

          {/* Feet */}
          <line x1="52" y1="122" x2="40" y2="124" className="limb foot" />
          <line x1="78" y1="122" x2="90" y2="124" className="limb foot" />
        </svg>

        <p className="loading-text">Heading to checkout…</p>
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
