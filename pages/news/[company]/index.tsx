import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import { freshNews } from '../../../data'
import { toast } from 'react-toastify'
import QuickSearch from '../../../components/forms/input/QuickSearch'
import NewsTable from '../../../components/NewsTable'
import { prisma } from '../../../db'
import { ICompanyNewsProps } from '../../../types'

/**
 * Function to check if a certain date is older than today's date by n days
 * @param checkedDate News date to check
 * @param howOld when should the news expire? in days
 * @returns boolean true if Fresh false if expired (old)
 */
const isFreshData = (checkedDate: Date, howOld: number): boolean => {
   const today: Date = new Date()
   const yesterday: Date = new Date(today)
   yesterday.setDate(yesterday.getDate() - howOld)
   //   console.log('newsData[0].date', checkedDate)
   const newsPublishedDate: Date = new Date(checkedDate)

   // if news are fresh?
   if (newsPublishedDate > yesterday) return true
   else return false
}

/**
 * To fetch News form GAIA lense company news official API
 * @param companyName company name
 * @returns company news object
 */
const fetchNews: any = async (companyName: string) => {
   const options: any = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
         'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RapidAPI_Host,
      },
   }
   const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_NEWS_PUBLIC_AP}/news?companyname=${companyName}`,
      options
   )
   const freshNews: any = await response.json()

   return await freshNews
}
/**
 * Get data from postgres database
 * @param companyName company name
 * @returns array with news object
 */
const getDataFromDB: any = async (companyName: string) => {
   const newsData: any[] = await prisma.news_data.findMany({
      where: { companyname: { contains: companyName } },
      orderBy: [{ date: 'desc' }],
   })

   return await newsData
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const companyName: string = context.query.company

   // get news where company name contained in the query and sort list descending
   getDataFromDB: try {
      // get data from db
      let newsData: any = await getDataFromDB(companyName)

      // check if no data: (might be a db connection issue), user should be notified in front end via toster
      if (!newsData) throw Error(' no data or no db connection!')

      // check if latest news is fresh in tables
      // if no News OR there is expired (1day) news, will proceed to fetch new News
      if (
         newsData.length == 0 ||
         (newsData.length > 0 && !isFreshData(newsData[0].date, 2))
      ) {
         // News is Old OR No News
         // fetch News from API as we have expired data
         fetchAndStoreFreshData: try {
            // console.log(`Fetching ${companyName} data ✓`)
            const freshNews: any[] = await fetchNews(companyName)

            if (!freshNews) throw Error(`${companyName} has no fresh data!`)
            // console.log(freshNews[0].title)

            // is News repeated?
            if (newsData.find((item: any) => item.title == freshNews[0].title))
               // if Yes
               break fetchAndStoreFreshData

            // if No
            // then create news object to send to db
            const newsToStore = {
               request_id: freshNews[0]?.request_id,
               companyname: freshNews[0]?.companyname,
               url: freshNews[0]?.url,
               insider: freshNews[0]?.insider,
               outsider: freshNews[0]?.outsider,
               ceo: freshNews[0]?.ceo,
               title: freshNews[0]?.title,
               date: new Date(freshNews[0]?.date),
               company_rel: freshNews[0]?.company_rel,
               insider_rel: freshNews[0]?.insider_rel,
               outsider_rel: freshNews[0]?.outsider_rel,
               ceo_rel: freshNews[0]?.ceo_rel,
            }

            const savedFreshNews: any = await prisma.news_data.create({
               data: newsToStore,
            })

            // get data from db
            newsData = await getDataFromDB(companyName)

            console.log('savedFreshNews', savedFreshNews)
            // save company to data base
         } catch (err: any) {
            console.error('Error while saving fresh data:', err.message)
            return {
               props: {
                  data: JSON.parse(JSON.stringify(newsData)),
                  companyName,
                  message: '⚠️ FAILURE:  Connecting to News api!',
               },
            }
         }
      }

      // News is Fresh and ready to display
      return {
         props: { data: JSON.parse(JSON.stringify(newsData)), companyName },
      }
   } catch (err: any) {
      // Error
      console.error(`Error while Getting new data:`, err.message)
      return {
         props: {
            data: [],
            companyName,
            message: err.message,
         },
      }
   }
}

const filterNewsTitle = (filter: string, array: any[]): any[] => {
   return array.filter(item =>
      item.title.toUpperCase().includes(filter.toUpperCase())
   )
}

const CompanyNews: NextPage<ICompanyNewsProps> = (props: ICompanyNewsProps) => {
   const [data, setData] = useState(props.data)
   const [filteredData, setFilteredData] = useState(props.data)
   const [searchValue, setSearchValue] = useState('')

   useEffect(() => {
      // alert user in case of db problems
      if (props.message) toast(props.message)
   }, [props.message])
   return (
      <div className=''>
         <Head>
            <title>{props.companyName} News Feed</title>
            <meta
               name={`Gaia lens Company news feed`}
               content='news related to companies listed in the stock market'
            />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <div className='py-4'>
            <Link href='/' passHref>
               <a>
                  <p>← back to companies List</p>
               </a>
            </Link>
         </div>
         <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
               <h1 className='text-xl font-semibold text-gray-900'>
                  {props.companyName} News Feed
               </h1>
            </div>
         </div>
         <QuickSearch
            inputHandler={(e: any) => {
               setSearchValue(previous => e.target.value)
               setFilteredData(filterNewsTitle(e.target.value, data))
            }}
            value={searchValue}
         />

         <NewsTable data={filteredData} />
      </div>
   )
}

export default CompanyNews
