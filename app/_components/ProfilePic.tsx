import Image from 'next/image'

export const ProfilePic = () => {
  return (
    <Image
      className="border-4 border-black  drop-shadow-xl shadow-black rounded-full"
      src="/images/profile.jpg"
      alt="TJ Maynes"
      width={130}
      height={130}
      priority
    />
  )
}
