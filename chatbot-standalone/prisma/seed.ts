import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin1234', 12)

  await prisma.user.upsert({
    where: { email: 'admin@comparion.com' },
    update: {},
    create: {
      name: 'Comparion Admin',
      email: 'admin@comparion.com',
      password: hashedPassword,
    },
  })

  console.log('Seed complete!')
  console.log('Login: admin@comparion.com / admin1234')
  console.log('IMPORTANT: Change the password after first login via the database.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
