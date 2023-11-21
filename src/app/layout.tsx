import './globals.css'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
import { Providers } from '@/app/_hooks/providers'

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
