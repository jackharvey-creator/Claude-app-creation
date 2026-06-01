import { ChatBubble } from '@/components/chatbot/ChatBubble'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Demo banner */}
      <div className="text-white text-center text-xs font-semibold py-2 px-4 tracking-wide" style={{ background: '#003A7A' }}>
        RECRUITMENT CHATBOT DEMO — Click the blue bubble in the bottom-right corner to experience the candidate flow
      </div>

      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded" style={{ background: '#0088E0' }} />
            <span className="text-xl font-bold tracking-tight" style={{ color: '#005BAC' }}>
              Comparion<span className="font-light">Insurance</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-900 transition-colors">Personal Insurance</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Business Insurance</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Find an Agent</a>
            <a href="#" className="hover:text-blue-900 transition-colors">About Us</a>
          </nav>
          <button className="hidden md:block px-5 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90" style={{ background: '#0088E0' }}>
            Get a Quote
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#005BAC' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #0088E0 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              A Liberty Mutual Company · Serving 50 States
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Find the Right Coverage.<br />
              <span className="text-white/80">Protect What Matters Most.</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Comparion's independent agents shop multiple carriers to find you the best rates on auto, home, life, and business insurance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90" style={{ background: '#0088E0' }}>
                Get a Free Quote
              </button>
              <button className="px-8 py-3.5 rounded-xl text-white font-semibold text-base border border-white/30 hover:bg-white/10 transition-colors">
                Find an Agent Near Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '15,000+', label: 'Licensed Agents' },
            { value: '50', label: 'States Served' },
            { value: '4.8★', label: 'Customer Rating' },
            { value: '30+', label: 'Carrier Partners' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold" style={{ color: '#005BAC' }}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#005BAC' }}>Insurance Solutions</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Our agents compare rates from top carriers so you get the right protection at the right price.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[
            { icon: '🚗', name: 'Auto Insurance', desc: 'Coverage for cars, trucks & motorcycles' },
            { icon: '🏠', name: 'Home Insurance', desc: 'Protect your home & belongings' },
            { icon: '❤️', name: 'Life Insurance', desc: 'Financial security for your family' },
            { icon: '💼', name: 'Business Insurance', desc: 'Commercial coverage for your company' },
            { icon: '🏥', name: 'Health Insurance', desc: 'Individual & family health plans' },
            { icon: '🚤', name: 'Recreational', desc: 'Boats, RVs, ATVs & more' },
            { icon: '🐾', name: 'Pet Insurance', desc: 'Veterinary care coverage' },
            { icon: '☂️', name: 'Umbrella', desc: 'Extra liability protection' },
          ].map((p) => (
            <div key={p.name} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
              <span className="text-3xl mb-3 block">{p.icon}</span>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-900 transition-colors">{p.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Comparion */}
      <section className="py-16" style={{ background: '#F8F9FB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#005BAC' }}>Why Choose Comparion?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🤝', title: 'Independent Agents', body: 'We work for you, not the insurance company. Our agents compare multiple carriers to find your best rate.' },
              { icon: '⚡', title: 'Fast & Easy', body: 'Get multiple quotes in minutes. Our technology streamlines the process so you spend less time on paperwork.' },
              { icon: '📍', title: 'Local Expertise', body: 'With agents in every state, you get someone who understands your local market and specific coverage needs.' },
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center">
                <span className="text-4xl mb-4 block">{w.icon}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#005BAC' }}>{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers teaser */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: '#005BAC' }}>
          <div>
            <h2 className="text-3xl font-bold mb-3">Join Our Growing Team</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-lg">
              Comparion is expanding across the US. We're looking for motivated sales professionals to join our network of independent agents. Flexible schedule, uncapped earnings, and full training provided.
            </p>
          </div>
          <button
            className="shrink-0 px-8 py-4 rounded-xl font-bold text-base transition-colors hover:bg-gray-50 whitespace-nowrap border-2 border-white"
            style={{ background: '#fff', color: '#005BAC' }}
          >
            Explore Careers
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Comparion Insurance Agency, LLC. A Liberty Mutual Company. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Use</a>
            <a href="#" className="hover:text-gray-600">Accessibility</a>
          </div>
        </div>
      </footer>

      {/* Chat bubble — floats over everything */}
      <ChatBubble />
    </div>
  )
}
