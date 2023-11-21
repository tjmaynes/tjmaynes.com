import Link from 'next/link'
import DarkModeButton from './DarkModeButton'

type HeaderLinkProps = {
  name: string
  destination: string
}

const HeaderLink = ({ name, destination }: HeaderLinkProps) => (
  <Link
    href={destination}
    className="text-white/90 no-underline hover:text-white px-1"
    aria-label={name}
  >
    {name.toLocaleUpperCase()}
  </Link>
)

const Header = () => {
  const links: HeaderLinkProps[] = [
    { name: 'Home', destination: '/' },
    { name: 'About', destination: '/about' },
    // { name: 'Posts', destination: '/posts' },
    { name: 'Web Playground', destination: '' },
    { name: 'CV', destination: '/career/cv.pdf' },
  ]

  return (
    <nav className="flex flex-start flex-row bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      {links.map((link) => (
        <HeaderLink key={link.name} {...link} />
      ))}
      <DarkModeButton />
    </nav>
  )
}

export default Header
