'use client'

// Inline SVG scene illustrations for each story panel
function SceneSocialMedia() {
  return (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <rect width="160" height="200" fill="#F0F6FF"/>

      {/* Woman - body */}
      <rect x="52" y="108" width="56" height="52" rx="10" fill="#003087"/>
      {/* Blazer lapels */}
      <path d="M80 108 L68 120 L80 118 L92 120 Z" fill="#002070"/>
      {/* Shirt */}
      <rect x="74" y="108" width="12" height="14" fill="white"/>

      {/* Head */}
      <ellipse cx="80" cy="84" rx="22" ry="24" fill="#F4C2A1"/>
      {/* Hair */}
      <ellipse cx="80" cy="68" rx="22" ry="14" fill="#2C1A0E"/>
      <ellipse cx="58" cy="78" rx="6" ry="12" fill="#2C1A0E"/>
      <ellipse cx="102" cy="78" rx="6" ry="12" fill="#2C1A0E"/>
      {/* Face */}
      <circle cx="73" cy="83" r="2.5" fill="#333"/>
      <circle cx="87" cy="83" r="2.5" fill="#333"/>
      <path d="M74 93 Q80 98 86 93" stroke="#C47A5A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Raised eyebrow (frustrated) */}
      <path d="M70 77 Q73 74 76 76" stroke="#2C1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M84 76 Q87 74 90 77" stroke="#2C1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Arms */}
      <rect x="30" y="112" width="24" height="10" rx="5" fill="#F4C2A1"/>
      <rect x="106" y="112" width="24" height="10" rx="5" fill="#F4C2A1"/>

      {/* Phone in hand */}
      <rect x="24" y="100" width="28" height="46" rx="5" fill="#1A2B4A"/>
      <rect x="27" y="104" width="22" height="38" rx="3" fill="white"/>
      {/* Social feed on phone */}
      <rect x="29" y="107" width="18" height="5" rx="1" fill="#E8F0FE"/>
      <rect x="29" y="114" width="18" height="5" rx="1" fill="#E8F0FE"/>
      <rect x="29" y="121" width="18" height="5" rx="1" fill="#E8F0FE"/>
      <rect x="29" y="128" width="14" height="5" rx="1" fill="#E8F0FE"/>

      {/* Notification badge */}
      <rect x="14" y="92" width="66" height="22" rx="6" fill="#DC2626"/>
      <text x="47" y="100" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">⚠️ INSURANCE NOTICE</text>
      <text x="47" y="109" textAnchor="middle" fontSize="5.5" fill="white">Your premium is going up</text>

      {/* Notification tail */}
      <path d="M38 114 L34 120 L42 114" fill="#DC2626"/>

      {/* Frustration stars */}
      <text x="108" y="80" fontSize="14" opacity="0.7">😤</text>
    </svg>
  )
}

function SceneTheAd() {
  return (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <rect width="160" height="200" fill="#F0F6FF"/>

      {/* Phone */}
      <rect x="40" y="20" width="80" height="140" rx="12" fill="#1A2B4A"/>
      <rect x="44" y="28" width="72" height="124" rx="8" fill="white"/>

      {/* Social feed header */}
      <rect x="44" y="28" width="72" height="18" rx="8" fill="#003087"/>
      <circle cx="56" cy="37" r="5" fill="white" opacity="0.3"/>
      <rect x="64" y="34" width="28" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="64" y="39" width="18" height="2" rx="1" fill="white" opacity="0.3"/>

      {/* Ad card on feed */}
      <rect x="48" y="52" width="64" height="92" rx="6" fill="#EBF4FF" stroke="#BFD7F5" strokeWidth="1"/>
      {/* Sponsored label */}
      <text x="52" y="62" fontSize="5" fill="#93A8C4">Sponsored</text>
      {/* Ad image area */}
      <rect x="48" y="65" width="64" height="36" fill="#003087"/>
      {/* Shield icon */}
      <path d="M80 70 L70 74 L70 84 Q70 90 80 93 Q90 90 90 84 L90 74 Z" fill="white" opacity="0.2"/>
      <path d="M80 70 L70 74 L70 84 Q70 90 80 93 Q90 90 90 84 L90 74 Z" stroke="white" strokeWidth="1.5" fill="none"/>
      <path d="M75 82 L79 86 L86 78" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Ad text */}
      <text x="80" y="110" textAnchor="middle" fontSize="6.5" fill="#003087" fontWeight="bold">No hassle. No spam.</text>
      <text x="80" y="120" textAnchor="middle" fontSize="6" fill="#003087">Real agent + smart tech.</text>
      <text x="80" y="130" textAnchor="middle" fontSize="5.5" fill="#5A7A9F">Every quote includes a</text>
      <text x="80" y="137" textAnchor="middle" fontSize="5.5" fill="#5A7A9F">dedicated licensed agent.</text>
      {/* CTA button */}
      <rect x="54" y="140" width="52" height="14" rx="7" fill="#003087"/>
      <text x="80" y="149.5" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Get my free quote →</text>

      {/* Finger tapping */}
      <ellipse cx="80" cy="160" rx="6" ry="8" fill="#F4C2A1" opacity="0.9"/>
      <rect x="77" y="152" width="6" height="18" rx="3" fill="#F4C2A1"/>
      {/* Tap ripple */}
      <circle cx="80" cy="147" r="8" stroke="#003087" strokeWidth="1" opacity="0.3"/>
      <circle cx="80" cy="147" r="13" stroke="#003087" strokeWidth="0.5" opacity="0.15"/>

      {/* Heart reaction */}
      <text x="118" y="100" fontSize="14" opacity="0.8">❤️</text>
    </svg>
  )
}

function SceneHandoff() {
  return (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <rect width="160" height="200" fill="#F0F6FF"/>

      {/* Chat interface on phone */}
      <rect x="38" y="16" width="84" height="148" rx="12" fill="#1A2B4A"/>
      <rect x="42" y="24" width="76" height="132" rx="8" fill="#F5F9FF"/>

      {/* Chat header */}
      <rect x="42" y="24" width="76" height="26" rx="8" fill="white"/>
      <rect x="42" y="38" width="76" height="12" fill="white"/>
      {/* Agent avatar in header */}
      <circle cx="56" cy="37" r="8" fill="#003087"/>
      <text x="56" y="40.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">AR</text>
      {/* Agent name */}
      <rect x="68" y="32" width="30" height="4" rx="2" fill="#003087" opacity="0.7"/>
      <rect x="68" y="38" width="22" height="3" rx="1.5" fill="#93A8C4"/>
      {/* Online dot */}
      <circle cx="64" cy="46" r="3" fill="#22C55E"/>

      {/* Bot message bubble 1 */}
      <rect x="46" y="56" width="52" height="18" rx="6" rx-bottom-left="2" fill="#EBF4FF" stroke="#C7D9F0" strokeWidth="0.5"/>
      <text x="72" y="64" textAnchor="middle" fontSize="5" fill="#1A2B4A">Hi! I'm Alex's assistant.</text>
      <text x="72" y="71" textAnchor="middle" fontSize="5" fill="#1A2B4A">Let's get you a quote!</text>

      {/* Bot message bubble 2 */}
      <rect x="46" y="78" width="48" height="14" rx="6" fill="#EBF4FF" stroke="#C7D9F0" strokeWidth="0.5"/>
      <text x="70" y="84" textAnchor="middle" fontSize="4.5" fill="#1A2B4A">What type of coverage</text>
      <text x="70" y="90" textAnchor="middle" fontSize="4.5" fill="#1A2B4A">are you shopping for?</text>

      {/* Option buttons */}
      <rect x="46" y="96" width="22" height="10" rx="5" fill="white" stroke="#005EB8" strokeWidth="0.8"/>
      <text x="57" y="103" textAnchor="middle" fontSize="4.5" fill="#005EB8">🚗 Auto</text>
      <rect x="71" y="96" width="22" height="10" rx="5" fill="white" stroke="#005EB8" strokeWidth="0.8"/>
      <text x="82" y="103" textAnchor="middle" fontSize="4.5" fill="#005EB8">🏠 Home</text>

      {/* User reply bubble */}
      <rect x="62" y="110" width="50" height="14" rx="6" fill="#003087"/>
      <text x="87" y="120" textAnchor="middle" fontSize="5" fill="white">🚗🏠 Auto + Home</text>

      {/* Progress dots / typing */}
      <circle cx="52" cy="132" r="3" fill="#EBF4FF" stroke="#C7D9F0" strokeWidth="0.5"/>
      <circle cx="52" cy="132" r="2" fill="#005EB8" opacity="0.6"/>
      <circle cx="59" cy="132" r="2" fill="#005EB8" opacity="0.4"/>
      <circle cx="66" cy="132" r="2" fill="#005EB8" opacity="0.2"/>

      {/* Salesforce notification */}
      <rect x="6" y="90" width="30" height="36" rx="5" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <rect x="6" y="90" width="30" height="8" rx="5" fill="#00A1E0"/>
      <rect x="6" y="94" width="30" height="4" fill="#00A1E0"/>
      <text x="21" y="96" textAnchor="middle" fontSize="4.5" fill="white" fontWeight="bold">Salesforce</text>
      <text x="21" y="106" textAnchor="middle" fontSize="4" fill="#374151">New Lead!</text>
      <text x="21" y="113" textAnchor="middle" fontSize="3.5" fill="#6B7280">Sarah M. — Auto+Home</text>
      <text x="21" y="120" textAnchor="middle" fontSize="3.5" fill="#6B7280">Assigned: Alex Rivera</text>

      {/* Arrow from chat to SF */}
      <path d="M42 120 L36 118" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="2,2" markerEnd="url(#arrow)"/>

      {/* Checkmark badge */}
      <circle cx="130" cy="60" r="14" fill="#22C55E"/>
      <path d="M123 60 L128 66 L137 54" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const PANELS = [
  {
    scene: <SceneSocialMedia />,
    step: '01',
    headline: 'The frustration',
    body: "She's scrolling Instagram when another premium increase hits her inbox. Sound familiar?",
  },
  {
    scene: <SceneTheAd />,
    step: '02',
    headline: 'Your ad stands out',
    body: 'No spam promised. A real licensed agent. Smart tech that does the work. She taps.',
  },
  {
    scene: <SceneHandoff />,
    step: '03',
    headline: 'Two minutes later',
    body: "Lead captured. Salesforce record created. Alex has a warm, pre-qualified prospect ready to quote.",
  },
]

export function StoryStrip() {
  return (
    <div className="py-2">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
        How your clients find you
      </p>

      <div className="space-y-4">
        {PANELS.map((panel, i) => (
          <div key={i}>
            <div className="flex gap-4 bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-sm">
              {/* Illustration */}
              <div className="w-28 flex-shrink-0 bg-[#F0F6FF]">
                {panel.scene}
              </div>

              {/* Text */}
              <div className="flex-1 py-4 pr-4 flex flex-col justify-center">
                <span className="text-xs font-bold text-[#005EB8] tracking-widest mb-1">
                  STEP {panel.step}
                </span>
                <p className="text-sm font-bold text-[#003087] mb-1 leading-tight">
                  {panel.headline}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {panel.body}
                </p>
              </div>
            </div>

            {/* Connector arrow */}
            {i < PANELS.length - 1 && (
              <div className="flex items-center justify-center py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-blue-200" />
                  <svg className="w-3 h-3 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bridge to demo */}
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <div className="w-px h-4 bg-blue-200" />
        <div className="flex items-center gap-2 bg-[#003087] text-white text-xs font-semibold px-4 py-2 rounded-full">
          <span>Try the live demo below</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
