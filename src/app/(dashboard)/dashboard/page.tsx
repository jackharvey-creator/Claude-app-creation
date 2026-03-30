import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FiLink, FiFileText, FiCalendar, FiCheckCircle, FiTrendingUp, FiClock } from 'react-icons/fi'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userId = session!.user.id

  const [socialAccounts, postCounts, pendingApprovals, user] = await Promise.all([
    prisma.socialAccount.count({ where: { userId, isActive: true } }),
    prisma.post.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    }),
    prisma.approvalBatch.count({ where: { userId, status: 'PENDING' } }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { linesOfBusiness: true },
    }),
  ])

  const totalPosts = postCounts.reduce((acc, p) => acc + p._count, 0)
  const publishedPosts = postCounts.find((p) => p.status === 'PUBLISHED')?._count ?? 0
  const scheduledPosts = postCounts.find((p) => p.status === 'SCHEDULED')?._count ?? 0

  const stats = [
    { label: 'Connected Platforms', value: socialAccounts, icon: FiLink, color: 'text-blue-600 bg-blue-100', href: '/dashboard/platforms' },
    { label: 'Total Posts', value: totalPosts, icon: FiFileText, color: 'text-purple-600 bg-purple-100', href: '/dashboard/content' },
    { label: 'Scheduled', value: scheduledPosts, icon: FiClock, color: 'text-amber-600 bg-amber-100', href: '/dashboard/schedule' },
    { label: 'Published', value: publishedPosts, icon: FiCheckCircle, color: 'text-green-600 bg-green-100', href: '/dashboard/analytics' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h2>
        <p className="text-gray-600 mt-1">Here&apos;s an overview of your social media activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {socialAccounts === 0 && (
              <Link href="/dashboard/platforms" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <FiLink className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Connect your first social media platform</span>
              </Link>
            )}
            {(user?.linesOfBusiness?.length ?? 0) === 0 && (
              <Link href="/dashboard/preferences" className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <FiFileText className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Select your lines of business</span>
              </Link>
            )}
            <Link href="/dashboard/content" className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <FiTrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Generate new content</span>
            </Link>
            {pendingApprovals > 0 && (
              <Link href="/dashboard/approvals" className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                <FiCalendar className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">{pendingApprovals} batch(es) awaiting your approval</span>
              </Link>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
          <div className="space-y-4">
            <ChecklistItem done={socialAccounts > 0} label="Connect at least one social media platform" />
            <ChecklistItem done={(user?.linesOfBusiness?.length ?? 0) > 0} label="Select your lines of business" />
            <ChecklistItem done={totalPosts > 0} label="Generate your first content" />
            <ChecklistItem done={publishedPosts > 0} label="Publish your first post" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ChecklistItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${done ? 'bg-green-100' : 'bg-gray-100'}`}>
        {done ? (
          <FiCheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
        )}
      </div>
      <span className={`text-sm ${done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{label}</span>
    </div>
  )
}
