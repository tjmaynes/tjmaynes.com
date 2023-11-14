import './globals.css'
import type { Metadata } from 'next'
import { Footer, Header } from './_components'
import { Providers } from './_hooks/providers'

export const metadata: Metadata = {
  title: 'TJ Maynes',
  description: 'A blog dedicated to my ramblings, learnings and other things.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </body>
  </html>
)

export default RootLayout
