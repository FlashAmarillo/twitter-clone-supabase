import SidebarWrapper from '@/app/components/SidebarWrapper'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex max-h-screen justify-center">
      <SidebarWrapper />
      <main className="max-w-[601px] w-full flex flex-col flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  )
}