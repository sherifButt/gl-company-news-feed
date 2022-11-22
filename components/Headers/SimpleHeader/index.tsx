import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const navigation = [{ name: 'About', href: '#' }]

const SimpleHeader: React.FC = () => {
   const { data: session }: any = useSession()
   return (
      <header className='bg-blue-600'>
         <nav
            className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
            aria-label='Top'>
            <div className='flex items-center justify-between w-full py-6 border-b border-blue-500 lg:border-none'>
               <div className='flex items-center'>
                  <Link passHref href='/'>
                     <a>
                        <div className='w-12 h-12 p-1 bg-gray-100 rounded-full aspect-1'>
                           <span className='sr-only'>Your Company</span>
                           <Image
                              height={40}
                              width={40}
                              src='/gaialens_icon_logo.webp'
                              alt=''
                           />
                        </div>
                     </a>
                  </Link>
                  <div className='hidden ml-10 space-x-8 lg:block'>
                     {navigation.map(link => (
                        <a
                           key={link.name}
                           href={link.href}
                           className='text-base font-medium text-white hover:text-blue-50'>
                           {link.name}
                        </a>
                     ))}
                  </div>
               </div>

               <div className='ml-10 space-x-4'>
                  {session ? (
                     <div className='flex flex-row gap-2 items-center text-white'>
                        <Image
                           className='h-8 w-8 rounded-full bg-white border-2 '
                           width={30}
                           height={30}
                           src={session.user.image}
                           alt='avatar image'
                        />
                        <a>
                           hi, {session.user.name}
                          
                        </a>
                        <button
                           onClick={() => signOut()}
                           className='inline-block px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-opacity-75'>
                           SignOut
                        </button>
                     </div>
                  ) : (
                     <button
                        onClick={() => signIn()}
                        className='inline-block px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-opacity-75'>
                        Get Started
                     </button>
                  )}
               </div>
            </div>
            <div className='flex flex-wrap justify-center py-4 space-x-6 lg:hidden'>
               {navigation.map(link => (
                  <a
                     key={link.name}
                     href={link.href}
                     className='text-base font-medium text-white hover:text-blue-50'>
                     {link.name}
                  </a>
               ))}
            </div>
         </nav>
      </header>
   )
}

export default SimpleHeader
