import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create a demo user
  const hashedPassword = await bcrypt.hash('demo1234', 12)

  const user = await prisma.user.upsert({
    where: { email: 'demo@insurepost.com' },
    update: {},
    create: {
      name: 'Demo Agent',
      email: 'demo@insurepost.com',
      password: hashedPassword,
      agencyName: 'Demo Insurance Agency',
      preferences: {
        create: {
          tone: 'PROFESSIONAL',
          includeHashtags: true,
          includeEmojis: false,
          includeCtA: true,
          weeklyEmailDay: 1,
          weeklyEmailTime: '09:00',
        },
      },
      scheduleSettings: {
        create: {
          postsPerWeek: 5,
          preferredDays: [1, 2, 3, 4, 5],
          preferredTimes: ['09:00', '12:00', '17:00'],
          useAutoSchedule: true,
          timezone: 'America/New_York',
        },
      },
    },
  })

  // Add lines of business
  const lines = ['AUTO', 'HOME', 'LIFE', 'HEALTH', 'COMMERCIAL'] as const

  for (const line of lines) {
    await prisma.userLineOfBusiness.upsert({
      where: { userId_line: { userId: user.id, line } },
      update: { isActive: true },
      create: { userId: user.id, line, isActive: true },
    })
  }

  // Add demo social accounts
  const platforms = ['FACEBOOK', 'LINKEDIN'] as const

  for (const platform of platforms) {
    await prisma.socialAccount.upsert({
      where: { userId_platform: { userId: user.id, platform } },
      update: {},
      create: {
        userId: user.id,
        platform,
        accountName: `Demo Agent (${platform.toLowerCase()})`,
        accountId: `demo_${platform.toLowerCase()}`,
        accessToken: 'demo_token',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    })
  }

  // Create some sample content templates
  const templates = [
    {
      lineOfBusiness: 'AUTO' as const,
      platform: 'FACEBOOK' as const,
      content: 'Spring is here! Time for a vehicle safety check. Make sure your auto insurance covers roadside assistance.',
      hashtags: ['AutoInsurance', 'DriveSafe', 'SpringDriving'],
      tone: 'PROFESSIONAL' as const,
    },
    {
      lineOfBusiness: 'HOME' as const,
      platform: 'LINKEDIN' as const,
      content: 'Your home is your biggest investment. Schedule a free coverage review with us today!',
      hashtags: ['HomeInsurance', 'CoverageReview', 'InsuranceAgent'],
      tone: 'PROFESSIONAL' as const,
    },
    {
      lineOfBusiness: 'LIFE' as const,
      platform: 'FACEBOOK' as const,
      content: 'Life insurance rates are at historic lows. Protect your family\'s future - get a free quote today.',
      hashtags: ['LifeInsurance', 'FamilyProtection', 'FinancialPlanning'],
      tone: 'FRIENDLY' as const,
    },
  ]

  for (const template of templates) {
    await prisma.contentTemplate.create({ data: template })
  }

  console.log('Seed complete!')
  console.log('Demo login: demo@insurepost.com / demo1234')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
