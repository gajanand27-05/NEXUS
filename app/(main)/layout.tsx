export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </div>
  )
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4">
      <NavItem href="/events" label="Discover" icon="Search" />
      <NavItem href="/me/events" label="My Events" icon="Calendar" />
      <NavItem href="/passport" label="Passport" icon="User" />
    </nav>
  )
}

function NavItem({ href, label }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-indigo-600 transition-colors text-xs"
    >
      <div className="size-6 rounded" />
      <span>{label}</span>
    </a>
  )
}
