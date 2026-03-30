import Link from 'next/link'
import { FiCalendar, FiMail, FiTrendingUp, FiShare2, FiShield, FiZap } from 'react-icons/fi'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <FiShield className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">InsurePost</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Social Media on Autopilot for Insurance Agents
            </h1>
            <p className="text-xl text-primary-100 mb-10">
              AI-powered content creation, smart scheduling, and automated posting across all your
              social platforms. Grow your book of business while we handle your social media.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register" className="bg-white text-primary-700 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors text-lg">
                Start Free Trial
              </Link>
              <Link href="#features" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-lg">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Dominate Social Media
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for insurance professionals. No social media expertise required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiTrendingUp className="h-8 w-8" />}
              title="AI Content Generation"
              description="Our AI analyzes trending insurance topics and creates engaging, compliant content tailored to your lines of business."
            />
            <FeatureCard
              icon={<FiCalendar className="h-8 w-8" />}
              title="Smart Scheduling"
              description="Auto-suggested posting times based on when your audience is most active. Maximize engagement without the guesswork."
            />
            <FeatureCard
              icon={<FiShare2 className="h-8 w-8" />}
              title="Multi-Platform Posting"
              description="Connect Facebook, Instagram, LinkedIn, and Twitter. Post everywhere with a single approval."
            />
            <FeatureCard
              icon={<FiMail className="h-8 w-8" />}
              title="Weekly Email Approval"
              description="Review your upcoming week's content via email. Approve, edit, or reject posts before they go live."
            />
            <FeatureCard
              icon={<FiShield className="h-8 w-8" />}
              title="Insurance-Focused"
              description="Content templates and trends specific to auto, home, life, health, commercial, and more lines of business."
            />
            <FeatureCard
              icon={<FiZap className="h-8 w-8" />}
              title="Stock Media Library"
              description="Access thousands of professional stock images and videos perfect for insurance content."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard step={1} title="Create Account" description="Sign up and tell us about your agency and lines of business." />
            <StepCard step={2} title="Connect Platforms" description="Link your Facebook, Instagram, LinkedIn, and Twitter accounts." />
            <StepCard step={3} title="Set Preferences" description="Choose your tone, schedule, and let AI generate tailored content." />
            <StepCard step={4} title="Approve & Post" description="Review weekly content via email. Approve and we handle the rest." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-700 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Agency?</h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of insurance agents who save 10+ hours per week on social media.
          </p>
          <Link href="/register" className="bg-white text-primary-700 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors text-lg inline-block">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiShield className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold text-white">InsurePost</span>
          </div>
          <p>&copy; 2026 InsurePost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
