import { useState } from 'react';
import { motion } from 'motion/react';

export function HeroIllustration() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-full max-w-[500px] mx-auto aspect-4/3 md:aspect-square flex items-center justify-center select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background container with soft rounded corners and interactive left-right sway that smoothly returns to static on hover out */}
      <motion.div
        className="hero-banner-inner relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-visible"
        animate={
          isHovered
            ? {
                x: [0, -12, 0, 12, 0],
                transition: {
                  x: {
                    repeat: Infinity,
                    duration: 2.8,
                    ease: 'easeInOut',
                  },
                },
              }
            : {
                x: 0,
                transition: {
                  type: 'spring',
                  stiffness: 90,
                  damping: 18,
                  mass: 0.9,
                },
              }
        }
      >
        {/* Main High-Detail Vector Illustration matching the reference */}
        <svg
          viewBox="0 0 520 500"
          className="w-full h-full max-w-[460px] max-h-[460px] overflow-visible drop-shadow-xs"
        >
          <defs>
            {/* Soft ground shadow blur */}
            <filter id="soft-ground-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>

            {/* Tomato Specular Gradient */}
            <radialGradient id="tomato-specular" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFA696" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#EA5641" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#DB3D28" stopOpacity="1" />
              <stop offset="100%" stopColor="#B32414" stopOpacity="1" />
            </radialGradient>

            {/* Ceramic Bowl Shadow */}
            <linearGradient id="bowl-shading" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E5DC CE" />
            </linearGradient>

            {/* Tomato Slice Seeds Gradient */}
            <radialGradient id="seed-pulp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE199" />
              <stop offset="60%" stopColor="#F58B50" />
              <stop offset="100%" stopColor="#D83E29" />
            </radialGradient>
          </defs>

          {/* 1. Ground contact shadows */}
          <ellipse
            cx="270"
            cy="465"
            rx="180"
            ry="20"
            fill="#EADBCE"
            opacity="0.8"
            filter="url(#soft-ground-blur)"
          />
          <ellipse
            cx="145"
            cy="460"
            rx="65"
            ry="14"
            fill="#D5C5B5"
            opacity="0.6"
            filter="url(#soft-ground-blur)"
          />

          {/* 2. Soft organic cream cloud backdrop */}
          <path
            d="M 125,445 C 50,420 35,320 65,225 C 95,130 160,65 245,45 C 330,25 415,60 455,145 C 495,230 485,355 430,425 C 375,480 200,470 125,445 Z"
            fill="#F6F0E3"
          />

          {/* 3. Playful energetic green lines near tablet - moving more to the right and top */}
          <motion.g
            id="sparks-top-right"
            className="hero-tablet-lines-anim will-change-transform"
            style={{ transformOrigin: '432px 152px' }}
            animate={
              isHovered
                ? {
                    x: [0, 8, 14, 6, 0],
                    y: [0, -7, -12, -5, 0],
                    opacity: [0.7, 1, 0.8, 0.95, 0.7],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: 'easeInOut',
                    },
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0.7,
                    transition: {
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  }
            }
          >
            <path
              d="M 432,152 L 450,136"
              stroke="#75A65E"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 442,178 L 466,172"
              stroke="#75A65E"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 418,126 L 438,104"
              stroke="#75A65E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 452,204 L 476,200"
              stroke="#75A65E"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* 4. Spinach / Basil foliage behind tablet on left - leaves just moving */}
          <motion.g
            id="foliage-left"
            className="hero-foliage-sway will-change-transform"
            style={{ transformOrigin: '152px 410px' }}
            animate={
              isHovered
                ? {
                    rotate: [0, -2.5, 0, 2, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut',
                    },
                  }
                : {
                    rotate: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 80,
                      damping: 18,
                    },
                  }
            }
          >
            {/* Back dark leaf */}
            <g className="hero-foliage-leaf-2 will-change-transform" style={{ transformOrigin: '148px 390px' }}>
              <path
                d="M 148,390 C 112,360 80,320 74,275 C 68,230 92,205 116,215 C 138,225 152,270 156,325 Z"
                fill="#1A3F2A"
              />
              <path
                d="M 148,390 Q 116,295 106,228"
                stroke="#132E1F"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 126,335 Q 102,330 88,312"
                stroke="#132E1F"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 116,285 Q 98,280 88,260"
                stroke="#132E1F"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Middle tall prominent leaf */}
            <g className="hero-foliage-leaf-1 will-change-transform" style={{ transformOrigin: '152px 405px' }}>
              <path
                d="M 152,405 C 132,350 108,280 122,215 C 136,175 162,195 166,245 C 170,295 170,360 156,410 Z"
                fill="#275438"
              />
              <path
                d="M 152,405 Q 142,305 144,202"
                stroke="#193B26"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 146,345 Q 128,335 118,322"
                stroke="#193B26"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 144,285 Q 128,270 122,255"
                stroke="#193B26"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 144,305 Q 158,295 165,280"
                stroke="#193B26"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Front leaf tucked beside tablet */}
            <path
              d="M 160,410 C 150,365 160,305 180,258 C 194,235 208,248 200,288 C 190,335 180,380 166,415 Z"
              fill="#1F472F"
            />
            <path
              d="M 162,410 Q 174,325 188,252"
              stroke="#153522"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* 5. Tilted Tablet Graphic (tilted ~7 degrees clockwise) - tablet moves little right and left */}
          <motion.g
            className="hero-tablet-move will-change-transform"
            style={{ transformOrigin: '280px 255px' }}
            animate={
              isHovered
                ? {
                    x: [0, 8, 0, -8, 0],
                    rotate: [0, 1.2, 0, -1.2, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2.8,
                      ease: 'easeInOut',
                    },
                  }
                : {
                    x: 0,
                    rotate: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 90,
                      damping: 18,
                    },
                  }
            }
          >
            <g id="tablet-group" transform="rotate(7, 280, 255)">
            {/* Tablet Outer Body - Forest Green Bezel */}
            <rect
              x="142"
              y="58"
              width="268"
              height="384"
              rx="34"
              fill="#1D3F2C"
              stroke="#142F21"
              strokeWidth="2"
            />

            {/* Tablet White Screen Margin */}
            <rect
              x="154"
              y="70"
              width="244"
              height="360"
              rx="26"
              fill="#FFFFFF"
            />

            {/* Tablet Cream Inner Screen */}
            <rect
              x="159"
              y="75"
              width="234"
              height="350"
              rx="22"
              fill="#FAF6ED"
            />

            {/* Top Speaker / Camera Notch */}
            <rect
              x="251"
              y="86"
              width="50"
              height="7"
              rx="3.5"
              fill="#E5D9C4"
            />
            <circle cx="276" cy="89.5" r="1.8" fill="#1D3F2C" />

            {/* --- TOP RECIPE CARD: GOURMET SALAD BOWL --- */}
            {/* Card Background */}
            <rect
              x="170"
              y="102"
              width="212"
              height="184"
              rx="16"
              fill="#F4EFE3"
            />

            {/* Soft Shadow Under Bowl */}
            <ellipse
              cx="276"
              cy="234"
              rx="66"
              ry="11"
              fill="#E5DC CE"
            />

            {/* White Ceramic Bowl */}
            <path
              d="M 194,178 Q 198,230 276,232 Q 354,230 358,178 C 348,181 312,185 276,185 C 240,185 204,181 194,178 Z"
              fill="url(#bowl-shading)"
            />
            {/* Soft bottom rim curve shading */}
            <path
              d="M 210,202 Q 224,230 276,232 Q 328,230 342,202 Q 314,224 276,224 Q 238,224 210,202 Z"
              fill="#E4DBCB"
            />

            {/* --- INGREDIENTS INSIDE THE BOWL --- */}
            {/* 1. Deep Salad Greens (Spinach & mixed fresh leaves) */}
            {/* Back lush leaf crown */}
            <path
              d="M 258,155 C 250,132 272,125 285,138 C 298,124 316,132 312,154 Z"
              fill="#245435"
            />
            <circle cx="276" cy="144" r="12" fill="#2E6641" />
            <circle cx="295" cy="148" r="11" fill="#3A7B4F" />

            {/* Left green clusters */}
            <path
              d="M 198,178 C 193,162 206,148 222,156 C 234,162 230,180 220,183 Z"
              fill="#224E31"
            />
            <circle cx="224" cy="172" r="14" fill="#2D633E" />
            <circle cx="214" cy="180" r="10" fill="#3B7D50" />

            {/* Right green clusters */}
            <path
              d="M 354,178 C 358,162 344,148 328,156 C 316,162 320,180 330,183 Z"
              fill="#224E31"
            />
            <circle cx="334" cy="170" r="13" fill="#2B603D" />

            {/* 2. Golden Roasted Potatoes & Chickpeas */}
            {/* Golden chunk upper left */}
            <path
              d="M 228,158 Q 248,145 258,164 Q 242,176 228,158 Z"
              fill="#E6A841"
            />
            <path
              d="M 233,158 Q 246,149 253,161"
              stroke="#F6C768"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Golden chunk upper right */}
            <path
              d="M 296,154 Q 318,150 326,168 Q 306,178 296,154 Z"
              fill="#E6A841"
            />
            <path
              d="M 302,155 Q 318,153 322,166"
              stroke="#F6C768"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Center roasted wedges & chickpea bites */}
            <circle cx="266" cy="162" r="7" fill="#EDB656" />
            <circle cx="264" cy="160" r="3" fill="#FCE5A4" opacity="0.8" />

            <circle cx="305" cy="176" r="6.5" fill="#E4A640" />
            <circle cx="303" cy="174" r="2.5" fill="#FCE5A4" opacity="0.8" />

            <circle cx="242" cy="184" r="6" fill="#E4A640" />
            <circle cx="282" cy="186" r="6" fill="#F0BC5E" />

            {/* 3. Juicy Ripe Red Tomato Halves & Slices */}
            {/* Center Main Tomato Slice */}
            <ellipse cx="272" cy="180" rx="23" ry="17" fill="#DD442E" />
            <ellipse cx="272" cy="180" rx="18" ry="13" fill="#EA553E" />
            {/* Tomato pulp pockets and golden seeds */}
            <ellipse cx="264" cy="179" rx="5" ry="4" fill="url(#seed-pulp)" />
            <circle cx="264" cy="179" r="1.5" fill="#FFF2CE" />

            <ellipse cx="280" cy="179" rx="5" ry="4" fill="url(#seed-pulp)" />
            <circle cx="280" cy="179" r="1.5" fill="#FFF2CE" />

            <ellipse cx="272" cy="185" rx="4" ry="3" fill="url(#seed-pulp)" />
            <circle cx="272" cy="185" r="1.2" fill="#FFF2CE" />

            {/* Right Tomato Half */}
            <circle cx="316" cy="172" r="14" fill="#DD442E" />
            <circle cx="316" cy="172" r="11" fill="#EA553E" />
            <ellipse cx="314" cy="171" rx="4" ry="3" fill="url(#seed-pulp)" />
            <circle cx="314" cy="171" r="1.3" fill="#FFF2CE" />
            <ellipse cx="319" cy="174" rx="3.5" ry="2.5" fill="url(#seed-pulp)" />
            <circle cx="319" cy="174" r="1" fill="#FFF2CE" />

            {/* Left Tomato Wedge */}
            <path
              d="M 232,172 C 228,184 242,194 252,185 C 254,174 241,168 232,172 Z"
              fill="#DD442E"
            />
            <circle cx="241" cy="179" r="2" fill="#F58B50" />

            {/* 4. White Feta / Mozzarella Cubes */}
            <polygon points="258,168 263,164 267,168 262,172" fill="#FFFFFF" />
            <polygon points="250,176 254,173 257,177 253,180" fill="#FFFFFF" />
            <circle cx="294" cy="172" r="2.8" fill="#FFFFFF" />
            <circle cx="300" cy="166" r="2.2" fill="#FFFFFF" />

            {/* 5. Fresh Green Herb Flecks */}
            <circle cx="271" cy="172" r="1.3" fill="#2E6941" />
            <circle cx="277" cy="174" r="1.1" fill="#2E6941" />
            <circle cx="266" cy="186" r="1.2" fill="#2E6941" />
            <circle cx="308" cy="170" r="1.3" fill="#2E6941" />
            <circle cx="236" cy="166" r="1.2" fill="#2E6941" />


            {/* --- BOTTOM 3 RECIPE PREVIEW CARDS --- */}
            {/* Card 1 (Left) */}
            <rect
              x="170"
              y="298"
              width="64"
              height="84"
              rx="13"
              fill="#EFEAE0"
            />
            {/* Mini Salad Bowl */}
            <ellipse cx="202" cy="334" rx="20" ry="11" fill="#FFFFFF" />
            <ellipse cx="202" cy="330" rx="16" ry="8" fill="#2E643E" />
            <circle cx="198" cy="329" r="3.5" fill="#DD442E" />
            <circle cx="206" cy="331" r="3.5" fill="#E6A841" />
            {/* Rounded Placeholder Bar below */}
            <rect
              x="182"
              y="360"
              width="40"
              height="6"
              rx="3"
              fill="#E0D6C5"
            />

            {/* Card 2 (Center) */}
            <rect
              x="244"
              y="298"
              width="64"
              height="84"
              rx="13"
              fill="#EFEAE0"
            />
            {/* Mini Pasta / Stew Bowl */}
            <ellipse cx="276" cy="334" rx="20" ry="11" fill="#FFFFFF" />
            <ellipse cx="276" cy="330" rx="16" ry="8" fill="#E5943F" />
            <circle cx="272" cy="329" r="4" fill="#DD442E" />
            <ellipse cx="280" cy="328" rx="4" ry="2.2" fill="#2D633E" />
            {/* Rounded Placeholder Bar below */}
            <rect
              x="256"
              y="360"
              width="40"
              height="6"
              rx="3"
              fill="#E0D6C5"
            />

            {/* Card 3 (Right) */}
            <rect
              x="318"
              y="298"
              width="64"
              height="84"
              rx="13"
              fill="#EFEAE0"
            />
            {/* Mini Roasted Veg Bowl */}
            <ellipse cx="350" cy="334" rx="20" ry="11" fill="#FFFFFF" />
            <ellipse cx="350" cy="330" rx="16" ry="8" fill="#3B7A4F" />
            <circle cx="346" cy="330" r="3.8" fill="#E6A841" />
            <circle cx="354" cy="329" r="3.2" fill="#DD442E" />
            {/* Rounded Placeholder Bar below */}
            <rect
              x="330"
              y="360"
              width="40"
              height="6"
              rx="3"
              fill="#E0D6C5"
            />
          </g>
        </motion.g>

          {/* 6. Plump Red Tomato on Bottom Left in Foreground - moves away and comes back */}
          <g id="foreground-tomato">
            {/* Tomato Shadow */}
            <motion.g
              className="hero-tomato-shadow-anim will-change-transform"
              style={{ transformOrigin: '142px 454px' }}
              animate={
                isHovered
                  ? {
                      scale: [1, 0.94, 1.03, 0.98, 1],
                      x: [0, -4, 3, -1, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 2.8,
                        ease: 'easeInOut',
                      },
                    }
                  : {
                      scale: 1,
                      x: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 90,
                        damping: 18,
                      },
                    }
              }
            >
              <ellipse
                cx="142"
                cy="454"
                rx="42"
                ry="9"
                fill="#1A3423"
                opacity="0.25"
              />
            </motion.g>

            {/* Tomato Character Body & Calyx */}
            <motion.g
              className="hero-tomato-anim will-change-transform"
              style={{ transformOrigin: '142px 406px' }}
              animate={
                isHovered
                  ? {
                      x: [0, -6, 5, -2, 0],
                      y: [0, -5, -3, 1, 0],
                      rotate: [0, -3, 2, -1, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 2.8,
                        ease: 'easeInOut',
                      },
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 90,
                        damping: 18,
                      },
                    }
              }
            >
              {/* Tomato Body */}
              <circle cx="142" cy="406" r="46" fill="url(#tomato-specular)" />

              {/* Deep curvature 3D shadow on bottom right */}
              <path
                d="M 120,442 C 140,457 172,450 183,420 C 187,404 183,382 173,372 C 187,398 176,438 145,447 C 132,450 123,446 120,442 Z"
                fill="#A71F11"
                opacity="0.85"
              />

              {/* Soft highlight arc on top left */}
              <ellipse
                cx="126"
                cy="384"
                rx="24"
                ry="16"
                fill="#FFA494"
                opacity="0.55"
                transform="rotate(-25, 126, 384)"
              />
              <ellipse
                cx="122"
                cy="379"
                rx="12"
                ry="7"
                fill="#FFFFFF"
                opacity="0.45"
                transform="rotate(-25, 122, 379)"
              />

              {/* Star-shaped Dark Green Calyx / Stem */}
              <path
                d="M 142,365 
                   L 146,346 
                   L 142,354 
                   L 134,345 
                   L 138,355 
                   L 126,354 
                   L 137,360 
                   L 129,370 
                   L 140,366 
                   L 146,376 
                   L 146,365 
                   L 156,368 
                   L 147,361 
                   L 157,355 
                   L 146,357 Z"
                fill="#163724"
              />
              {/* Calyx curved stem stub */}
              <path
                d="M 141,357 C 140,344 146,338 150,336"
                stroke="#163724"
                strokeWidth="3.8"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          </g>
        </svg>

        {/* Floating badge: Dinner ready in 25 mins (Positioned towards the left over tablet) */}
        <div className="absolute top-2 sm:top-5 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-xs rounded-2xl px-4 py-2.5 shadow-md border border-[#E2DDD3] flex items-center gap-3 whitespace-nowrap animate-fade-in pointer-events-none">
          <div className="w-8 h-8 rounded-xl bg-[#FDEEEB] text-[#E05A47] flex items-center justify-center font-bold text-sm">
            🍴
          </div>
          <div className="text-left">
            <p className="text-[10px] text-[#697A70] font-medium leading-none">Dinner ready in</p>
            <p className="text-xs font-bold text-[#193324] mt-0.5">25 mins</p>
          </div>
        </div>

        {/* Floating badge: Using 4 ingredients From your fridge (Bottom Right) */}
        <div className="absolute bottom-2 sm:bottom-5 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-xs rounded-2xl px-4 py-2.5 shadow-md border border-[#E2DDD3] flex items-center gap-3 whitespace-nowrap pointer-events-none">
          <div className="w-8 h-8 rounded-xl bg-[#E8F0EA] text-[#1E3A2B] flex items-center justify-center text-sm font-bold">
            🧊
          </div>
          <div className="text-left">
            <p className="text-[10px] text-[#697A70] font-medium leading-none">Using 4 ingredients</p>
            <p className="text-xs font-bold text-[#193324] mt-0.5">From your fridge</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ClockIllustration() {
  return (
    <div className="group relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center select-none cursor-pointer">
      <svg
        viewBox="0 0 280 260"
        className="w-full h-full overflow-visible drop-shadow-xs"
      >
        {/* Soft ground shadows with timer hop squash/stretch */}
        <g className="timer-shadow-squash will-change-transform">
          <ellipse
            cx="126"
            cy="242"
            rx="78"
            ry="11"
            fill="#ECE5D8"
            opacity="0.9"
          />
          <ellipse
            cx="122"
            cy="242"
            rx="52"
            ry="6"
            fill="#DFD6C5"
            opacity="0.6"
          />
        </g>

        {/* Decorative leafy branch behind clock on the right side with swaying animation */}
        <g id="botanical-leaves-right" className="leaves-branch-sway will-change-transform">
          {/* Main arching stem */}
          <path
            d="M 174,212 Q 206,182 222,142 Q 236,104 246,84"
            stroke="#193826"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Leaf 1 (lower right pointing down-right) */}
          <g
            className="leaf-anim-1 will-change-transform"
            style={{ transformOrigin: '186px 196px' }}
          >
            <path
              d="M 186,196 C 206,202 232,216 235,208 C 236,200 214,185 190,188 Z"
              fill="#2B523B"
            />
            <path
              d="M 190,191 Q 212,198 230,205"
              stroke="#183524"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Leaf 2 (mid-lower pointing right) */}
          <g
            className="leaf-anim-2 will-change-transform"
            style={{ transformOrigin: '204px 171px' }}
          >
            <path
              d="M 204,171 C 226,177 258,174 260,164 C 256,154 225,156 208,164 Z"
              fill="#346146"
            />
            <path
              d="M 208,167 Q 235,165 254,163"
              stroke="#1C3C2A"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Leaf 3 (mid-upper pointing up-right) */}
          <g
            className="leaf-anim-3 will-change-transform"
            style={{ transformOrigin: '218px 140px' }}
          >
            <path
              d="M 218,140 C 242,135 264,115 260,105 C 250,98 226,115 218,132 Z"
              fill="#2B533C"
            />
            <path
              d="M 219,134 Q 242,122 256,108"
              stroke="#183524"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Leaf 4 (top-most oval leaf with expressive flutter) */}
          <g
            className="leaf-anim-4 will-change-transform"
            style={{ transformOrigin: '230px 105px' }}
          >
            <path
              d="M 230,105 C 245,85 248,56 238,51 C 228,53 222,80 228,98 Z"
              fill="#3A6B4D"
            />
            <path
              d="M 229,100 Q 236,75 238,56"
              stroke="#1F422D"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Leaf 5 (inner small leaf) */}
          <g
            className="leaf-anim-5 will-change-transform"
            style={{ transformOrigin: '197px 185px' }}
          >
            <path
              d="M 197,185 C 208,188 222,192 224,186 C 220,180 207,178 196,182 Z"
              fill="#234631"
            />
          </g>
        </g>

        {/* Timer Chime Waves (sound radiating as timer goes off) */}
        <g id="timer-chime-waves" className="timer-chime-waves will-change-transform">
          {/* Left ringing chime arcs */}
          <path
            d="M 88,38 C 82,48 82,60 88,70"
            stroke="#E55B37"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 74,28 C 64,44 64,66 74,82"
            stroke="#E55B37"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          {/* Right ringing chime arcs */}
          <path
            d="M 164,38 C 170,48 170,60 164,70"
            stroke="#E55B37"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 178,28 C 188,44 188,66 178,82"
            stroke="#E55B37"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          {/* Top vibration ripples */}
          <path
            d="M 112,14 Q 126,6 140,14"
            stroke="#E55B37"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 104,7 Q 126,-4 148,7"
            stroke="#E55B37"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Complete Clock / Timer Assembly that shakes/vibrates when timer is off */}
        <g id="clock-timer-assembly" className="timer-ringing-body will-change-transform">
          {/* Clock Stand / Base at the bottom */}
          <path
            d="M 88,212 Q 83,232 94,236 L 158,236 Q 169,232 164,212 Z"
            fill="#1A3C2A"
          />
          <path
            d="M 94,236 L 158,236"
            stroke="#11291C"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Clock Crown / Top Button mechanism (bounces when buzzer goes off) */}
          <g className="timer-crown-bounce will-change-transform">
            {/* Crown neck */}
            <rect x="117" y="38" width="18" height="18" rx="2" fill="#1B3F2C" />
            <line
              x1="126"
              y1="39"
              x2="126"
              y2="52"
              stroke="#2D5F43"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Crown horizontal button cap */}
            <rect
              x="107"
              y="24"
              width="38"
              height="18"
              rx="8"
              fill="#214632"
              stroke="#163324"
              strokeWidth="1.5"
            />
            <path
              d="M 114,28 Q 126,26 138,28"
              stroke="#3C6E50"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Clock Outer Body (Deep forest green rim) */}
          <circle
            cx="126"
            cy="140"
            r="76"
            fill="#204430"
            stroke="#153222"
            strokeWidth="3.5"
          />
          {/* Inner bezel highlight ring */}
          <circle
            cx="126"
            cy="140"
            r="72.5"
            fill="none"
            stroke="#2E5C42"
            strokeWidth="1.5"
            opacity="0.45"
          />

          {/* Clock Dial Face (Cream/Warm Off-White) */}
          <circle
            cx="126"
            cy="140"
            r="56"
            fill="#FCF9F2"
            stroke="#E6DFD2"
            strokeWidth="1"
          />

          {/* 15-Minute Quarter Wedge (12:00 to 3:00) in Terracotta/Paprika Orange */}
          <path
            d="M 126,140 L 126,84 A 56,56 0 0,1 182,140 Z"
            fill="#E55B37"
          />

          {/* Hour Tick Marks (12 in total) */}
          {/* 12 o'clock - Bold Dark Green */}
          <line
            x1="126"
            y1="89"
            x2="126"
            y2="98"
            stroke="#173525"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 1 o'clock - Ochre / Golden Orange inside wedge */}
          <line
            x1="152"
            y1="96"
            x2="148"
            y2="103"
            stroke="#CA7328"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 2 o'clock - Ochre / Golden Orange inside wedge */}
          <line
            x1="171"
            y1="115"
            x2="164"
            y2="119"
            stroke="#CA7328"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 3 o'clock - Bold Dark Green */}
          <line
            x1="177"
            y1="140"
            x2="168"
            y2="140"
            stroke="#173525"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 4 o'clock */}
          <line
            x1="171"
            y1="165"
            x2="164"
            y2="161"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 5 o'clock */}
          <line
            x1="152"
            y1="184"
            x2="148"
            y2="177"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 6 o'clock - Bold Dark Green */}
          <line
            x1="126"
            y1="191"
            x2="126"
            y2="182"
            stroke="#173525"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 7 o'clock */}
          <line
            x1="100"
            y1="184"
            x2="104"
            y2="177"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 8 o'clock */}
          <line
            x1="81"
            y1="165"
            x2="88"
            y2="161"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 9 o'clock - Bold Dark Green */}
          <line
            x1="75"
            y1="140"
            x2="84"
            y2="140"
            stroke="#173525"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 10 o'clock */}
          <line
            x1="81"
            y1="115"
            x2="88"
            y2="119"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 11 o'clock */}
          <line
            x1="100"
            y1="96"
            x2="104"
            y2="103"
            stroke="#173525"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Faint Shadow Hand pointing down-left to ~7:30 */}
          <line
            x1="126"
            y1="140"
            x2="110"
            y2="157"
            stroke="#E5D9C7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Main Active Hand pointing into the 15-min orange sector (~1:40) with rapid twitch */}
          <g className="timer-hand-twitch will-change-transform">
            <line
              x1="126"
              y1="140"
              x2="143"
              y2="123"
              stroke="#173525"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Center Pivot Cap */}
          <circle cx="126" cy="140" r="6.5" fill="#173525" />
          <circle cx="126" cy="140" r="2.5" fill="#29543B" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
