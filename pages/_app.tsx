import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <div className='inset-0 h-screen bg-gray-100 '>
         <div className="px-4 sm:px-6 lg:px-8">
           <Component {...pageProps} />
           <ToastContainer />
         </div>
      </div>
   )
}

export default MyApp
