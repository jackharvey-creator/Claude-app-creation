import { LineOfBusiness, Platform } from '@prisma/client'

// Content templates organized by line of business
const CONTENT_TEMPLATES: Record<string, string[]> = {
  AUTO: [
    "Did you know that bundling your auto and home insurance could save you up to 25%? Contact us today for a free quote and see how much you could save!",
    "Spring is here! Time for a vehicle safety check. Make sure your auto insurance covers roadside assistance - it's a small add-on that can save you big headaches.",
    "Teen driver in the family? We offer great rates for young drivers with good grades. Ask about our Good Student Discount today!",
    "Distracted driving is the #1 cause of accidents. Put down your phone and stay safe on the road. We're here if you need us, but we'd rather you didn't!",
    "Planning a road trip? Make sure your auto coverage travels with you. Call us to review your policy before you hit the open road!",
    "Hail season is coming. Is your vehicle covered for comprehensive damage? A quick policy review could save you thousands. Let's chat!",
    "New car? Congratulations! Let us help you find the right coverage at the best price. We compare rates from multiple carriers to get you the best deal.",
    "Did you know your credit score can affect your auto insurance rates? We can help you find the most competitive rates regardless of your credit situation.",
  ],
  HOME: [
    "Your home is your biggest investment. Make sure it's properly protected. Schedule a free coverage review with us today!",
    "Spring storms are on the way. Is your home insurance up to date? Now is the perfect time to review your coverage and make sure you're protected.",
    "Did you know that standard home insurance doesn't cover floods? If you live in a flood-prone area, we can help you get the right coverage.",
    "Home renovation planned? Don't forget to update your insurance policy! Increased home value means you need increased coverage.",
    "Thinking about a home security system? Many insurance companies offer discounts for homes with monitored security. Ask us about potential savings!",
    "Fire prevention starts at home. Check your smoke detectors, create an escape plan, and make sure your home insurance is comprehensive.",
    "Working from home? Your standard homeowners policy may not cover your business equipment. Let us help you close that coverage gap.",
    "Winter is coming! Protect your pipes from freezing and your home from ice dams. Prevention is cheaper than a claim - but we're here if you need us.",
  ],
  LIFE: [
    "Life insurance isn't just about death - it's about protecting the life you've built. Term life rates are at historic lows. Get a free quote today!",
    "If someone depends on your income, you need life insurance. It's that simple. Let's find the right coverage for your family's needs.",
    "New parent? Congratulations! Now is the perfect time to secure your family's financial future with affordable life insurance.",
    "Did you know you can lock in low life insurance rates while you're young and healthy? Don't wait - the best time to buy is today.",
    "Life insurance can help pay off your mortgage, fund your kids' education, and replace lost income. What would your family do without your paycheck?",
    "Whole life insurance builds cash value over time. It's protection AND an investment. Ask us how it works!",
    "Just got married? Adding life insurance to your financial plan is one of the best wedding gifts you can give each other.",
    "Business owners: Key person life insurance protects your company if you or a critical team member passes away unexpectedly.",
  ],
  HEALTH: [
    "Open enrollment is around the corner! Don't miss your chance to review and update your health insurance plan. We can help you compare options.",
    "Understanding your health insurance deductible can save you money. Let us walk you through your plan options so you can make the best choice.",
    "Did you know preventive care is typically covered at 100% by most health plans? Schedule those annual checkups - they're included in your coverage!",
    "Self-employed? You have more health insurance options than you think. We specialize in finding affordable coverage for entrepreneurs.",
    "Medicare turning 65? Don't navigate the maze alone. We help you understand Parts A, B, C, and D, plus Medigap and Advantage plans.",
    "Health Savings Accounts (HSAs) paired with high-deductible plans can be a smart financial strategy. Let us show you how to maximize your benefits.",
    "Small business owners: Offering health insurance helps attract and retain top talent. Ask about our group health plans today!",
    "Prescription costs too high? We can help you find plans with better drug formularies and lower copays. Every dollar matters.",
  ],
  COMMERCIAL: [
    "Does your business have the right liability coverage? A single lawsuit could put everything at risk. Let's review your commercial policy today.",
    "Business owners: General liability, professional liability, property insurance - are you covered on all fronts? We can help fill the gaps.",
    "Workers' compensation insurance isn't just required by law - it protects your employees AND your business. Make sure you're properly covered.",
    "Cyber liability insurance is no longer optional. Data breaches cost businesses an average of $4.45 million. Is your business protected?",
    "Starting a new business? Congratulations! Let us help you build an insurance foundation that grows with your company.",
    "Commercial auto insurance is different from personal auto. If your employees drive for work, make sure you have the right business coverage.",
    "Business interruption insurance can keep your company afloat during unexpected closures. Don't wait for a disaster to wish you had it.",
    "Professional liability (E&O) insurance protects your business when a client claims your advice or service caused them financial harm.",
  ],
  UMBRELLA: [
    "An umbrella policy provides an extra layer of protection beyond your auto and home insurance limits. For just a few dollars a month, you get millions in additional coverage.",
    "High net worth? An umbrella policy is essential. It protects your assets when standard policy limits aren't enough. Let's talk about your options.",
    "Did you know an umbrella policy can protect you from lawsuits, even ones that aren't covered by your other insurance? It's affordable peace of mind.",
  ],
  FLOOD: [
    "Standard homeowners insurance does NOT cover flood damage. Don't wait for the next storm - get flood insurance today. There's typically a 30-day waiting period.",
    "Even if you're not in a high-risk flood zone, flooding can happen anywhere. Over 25% of flood claims come from low-to-moderate risk areas.",
    "Hurricane season is approaching. Flood insurance has a 30-day waiting period - don't wait until it's too late to protect your property.",
  ],
  MOTORCYCLE: [
    "Riding season is here! Make sure your motorcycle insurance is active and up to date. We offer competitive rates for all types of riders.",
    "Custom parts on your bike? Standard motorcycle insurance may not cover aftermarket upgrades. Let us customize your coverage to match your ride.",
  ],
  BOAT: [
    "Headed to the water this summer? Make sure your boat insurance covers liability, hull damage, and personal property. Get a quote before you launch!",
    "Boat insurance rates vary widely. Let us compare multiple carriers to find you the best coverage at the best price. Fair winds ahead!",
  ],
  RV: [
    "Planning an RV adventure? Full-timer or weekend warrior, we have RV insurance options tailored to your lifestyle. Hit the road with confidence!",
    "RV insurance is more than just auto coverage. It protects your home-on-wheels, personal belongings, and liability. Let's find the right plan for you.",
  ],
  RENTERS: [
    "Renting? Your landlord's insurance does NOT cover your belongings. Renters insurance is surprisingly affordable - often less than $15/month!",
    "Renters insurance covers theft, fire, water damage, and liability. For the cost of a couple of coffees a month, protect everything you own.",
  ],
  PET: [
    "Your fur baby deserves the best care! Pet insurance helps cover unexpected vet bills so you never have to choose between your pet and your budget.",
    "Did you know the average emergency vet visit costs $800-$1500? Pet insurance gives you peace of mind when the unexpected happens.",
  ],
  TRAVEL: [
    "Vacation planned? Travel insurance protects your investment from trip cancellations, medical emergencies abroad, and lost luggage.",
    "Traveling internationally? A medical emergency overseas without travel insurance can cost tens of thousands. Protect yourself for pennies a day.",
  ],
  DISABILITY: [
    "Your ability to earn income is your most valuable asset. Disability insurance replaces a portion of your paycheck if illness or injury prevents you from working.",
    "1 in 4 workers will experience a disability before retirement. Don't assume it won't happen to you. Protect your income with disability insurance.",
  ],
  LONG_TERM_CARE: [
    "70% of Americans over 65 will need some form of long-term care. Planning now can protect your retirement savings and give your family peace of mind.",
    "Long-term care insurance covers what Medicare doesn't: nursing homes, assisted living, and in-home care. The best time to plan is before you need it.",
  ],
  ANNUITIES: [
    "Looking for guaranteed income in retirement? Annuities can provide a steady paycheck for life. Let's explore whether an annuity fits your plan.",
    "Fixed annuities offer predictable growth with no market risk. If you're nearing retirement and want stability, let's talk about your options.",
  ],
  MEDICARE: [
    "Turning 65? Medicare can be confusing, but we make it simple. Original Medicare, Advantage Plans, Supplements - we'll help you find the right fit.",
    "Medicare Annual Enrollment is Oct 15 - Dec 7. Now is the time to review your plan and make sure it still meets your needs. Free consultations available!",
    "Did you know Medicare doesn't cover everything? Dental, vision, hearing, and prescription drugs may need separate coverage. Let us help you fill the gaps.",
  ],
}

const HASHTAG_MAP: Record<string, string[]> = {
  AUTO: ['AutoInsurance', 'CarInsurance', 'DriveSafe', 'InsuranceAgent', 'SaveOnInsurance'],
  HOME: ['HomeInsurance', 'HomeOwners', 'ProtectYourHome', 'InsuranceTips', 'HomeSweetHome'],
  LIFE: ['LifeInsurance', 'FamilyProtection', 'FinancialPlanning', 'InsuranceMatters', 'ProtectYourFamily'],
  HEALTH: ['HealthInsurance', 'OpenEnrollment', 'HealthCoverage', 'InsuranceAdvice', 'StayHealthy'],
  COMMERCIAL: ['BusinessInsurance', 'CommercialInsurance', 'SmallBusiness', 'BusinessOwner', 'RiskManagement'],
  UMBRELLA: ['UmbrellaInsurance', 'ExtraCoverage', 'AssetProtection', 'InsurancePlanning'],
  FLOOD: ['FloodInsurance', 'FloodProtection', 'NaturalDisaster', 'StormReady'],
  MOTORCYCLE: ['MotorcycleInsurance', 'RiderLife', 'BikeInsurance', 'MotorcycleSeason'],
  BOAT: ['BoatInsurance', 'MarineInsurance', 'BoatingLife', 'SummerFun'],
  RV: ['RVInsurance', 'RVLife', 'RoadTrip', 'FullTimeRV'],
  RENTERS: ['RentersInsurance', 'Renting', 'ApartmentLife', 'ProtectYourStuff'],
  PET: ['PetInsurance', 'PetHealth', 'FurBaby', 'PetParents'],
  TRAVEL: ['TravelInsurance', 'TravelSafe', 'VacationReady', 'TravelProtection'],
  DISABILITY: ['DisabilityInsurance', 'IncomeProtection', 'FinancialSecurity'],
  LONG_TERM_CARE: ['LongTermCare', 'ElderCare', 'RetirementPlanning', 'AgingGracefully'],
  ANNUITIES: ['Annuities', 'RetirementIncome', 'FinancialPlanning', 'RetirementReady'],
  MEDICARE: ['Medicare', 'Medicare65', 'MedicareEnrollment', 'SeniorHealth'],
}

const PLATFORM_ADJUSTMENTS: Record<string, { maxLength: number; style: string }> = {
  FACEBOOK: { maxLength: 500, style: 'conversational and engaging' },
  INSTAGRAM: { maxLength: 300, style: 'visual and inspiring with emojis' },
  LINKEDIN: { maxLength: 600, style: 'professional and authoritative' },
  TWITTER: { maxLength: 280, style: 'concise and punchy' },
}

export interface GeneratedPost {
  platform: Platform
  content: string
  imageUrl: string | null
  hashtags: string[]
  lineOfBusiness: LineOfBusiness
}

export function generatePostsForUser(
  lines: LineOfBusiness[],
  platforms: Platform[],
  options: {
    includeHashtags: boolean
    includeEmojis: boolean
    includeCtA: boolean
    tone: string
  }
): GeneratedPost[] {
  const posts: GeneratedPost[] = []

  for (const line of lines) {
    const templates = CONTENT_TEMPLATES[line] || []
    if (templates.length === 0) continue

    for (const platform of platforms) {
      // Pick a random template
      const template = templates[Math.floor(Math.random() * templates.length)]
      const adjustment = PLATFORM_ADJUSTMENTS[platform]

      let content = template

      // Adjust for platform length
      if (adjustment && content.length > adjustment.maxLength) {
        content = content.substring(0, adjustment.maxLength - 3) + '...'
      }

      // Add emojis for certain platforms
      if (options.includeEmojis && (platform === 'INSTAGRAM' || platform === 'FACEBOOK')) {
        const emojis = ['💡', '✅', '🏠', '🚗', '💪', '📞', '⭐', '🔒', '💰', '🎯']
        const emoji = emojis[Math.floor(Math.random() * emojis.length)]
        content = `${emoji} ${content}`
      }

      // Add hashtags
      const lineHashtags = HASHTAG_MAP[line] || ['Insurance', 'InsuranceAgent']
      const selectedHashtags = options.includeHashtags
        ? lineHashtags.sort(() => Math.random() - 0.5).slice(0, 3)
        : []

      posts.push({
        platform,
        content,
        imageUrl: `/api/placeholder/${line.toLowerCase()}`,
        hashtags: selectedHashtags,
        lineOfBusiness: line,
      })
    }
  }

  return posts
}

// Stock image URLs per line of business (placeholders - in production use Unsplash API)
export const STOCK_IMAGE_QUERIES: Record<string, string> = {
  AUTO: 'car insurance safety driving',
  HOME: 'beautiful home family house',
  LIFE: 'happy family protection security',
  HEALTH: 'health wellness doctor medical',
  COMMERCIAL: 'business office professional',
  UMBRELLA: 'umbrella protection rain',
  FLOOD: 'flood water damage prevention',
  MOTORCYCLE: 'motorcycle riding freedom',
  BOAT: 'boat sailing water',
  RV: 'rv camping adventure',
  RENTERS: 'apartment renting modern',
  PET: 'pet dog cat veterinarian',
  TRAVEL: 'travel vacation airplane',
  DISABILITY: 'workplace health safety',
  LONG_TERM_CARE: 'elderly care nursing',
  ANNUITIES: 'retirement savings planning',
  MEDICARE: 'senior health medicare',
}
