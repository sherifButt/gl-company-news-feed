import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import L1 from '../components/Layouts/OneColLayout'

if (process.env.NODE_ENV !== 'development') {
   console.log = () => {}
   console.error = () => {}
}

const layouts = {
   L1,
}

function MyApp({ Component, pageProps }: AppProps) {
   const Layout =
      typeof Component.layout === 'function'
         ? Component.layout
         : layouts[Component.layout] || L1

   return (
      <SessionProvider session={pageProps.session}>
         <Layout>
            <Component {...pageProps} />
            <ToastContainer />
         </Layout>
      </SessionProvider>
   )
}

export default MyApp
