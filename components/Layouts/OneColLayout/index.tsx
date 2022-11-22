import Head from 'next/head'
import SimpleHeader from '../../Headers/SimpleHeader'

const OneColLayout: React.FC = ({ children }: any) => {
   return (
      <>
         <Head>
            <title>Company News Feed</title>
            <meta
               name='Gaia lens Company news feed'
               content='news related to companies listed in the stock market'
            />
            <link rel='icon' href='/favicon.ico' />
           </Head>
           <SimpleHeader/>
         <div className='inset-0 h-screen bg-gray-100 '>
               <div className='px-4 sm:px-6 lg:px-8'>
                   {children}
               </div>
         </div>
      </>
   )
}

export default OneColLayout
