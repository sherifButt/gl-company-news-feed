import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import SelectMenus from '../components/forms/input/SelectMenus'
import { ICompanyNews } from '../types'

export const getServerSideProps: any = async (context: any) => {
   fetchingData: try {
      console.log('fetching companyname ✓')
      const options: any = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
            'X-RapidAPI-Host':
               process.env.NEXT_PUBLIC_X_RapidAPI_Host_COMPANYNAME,
         },
      }
      const response: any = await fetch(
         `${process.env.NEXT_PUBLIC_COMPANY_NAMES}`,
         options
      )
      const companyNames: any = await response.json()
      if (!companyNames) throw Error(`Company names has no fresh data!`)
      return {
         props: { companies: companyNames },
      }
   } catch (err) {
      console.error(`error while fetching company names`)
   }
}

const Home: NextPage = (props: any) => {
  const [selectedCompany, setSelectedCompany] = useState('Apple Inc.')
   return (
      <div className='flex h-screen m-auto align-middle'>
         <Head>
            <title>Company News Feed</title>
            <meta
               name='Gaia lens Company news feed'
               content='news related to companies listed in the stock market'
            />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <SelectMenus
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            data={props.companies}
            inputHandler={(e: any) => setSelectedCompany(e.target.selected)}
            value={selectedCompany}
            className='m-auto align-middle w-96'
         />

         {/* <ul>
            {props.companies.map((item: any, idx: number) => (
               <li key={idx}>
                  <Link href={`/news/${item.companyname}`}>
                     <a> {item.companyname}</a>
                  </Link>
               </li>
            ))}
         </ul> */}
      </div>
   )
}

export default Home
