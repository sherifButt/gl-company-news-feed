import React, { ReactComponentElement, useEffect, useState } from 'react'
import { dateHelper } from '../../helpers/dateHelper'
import { ICompanyNews, ICompanyNewsProps } from '../../types'

const classNames: any = (...classes: any[]) => {
   return classes.filter(Boolean).join(' ')
}

const NewsTable: any = (props: ICompanyNewsProps) => {
   const [news, setNews] = useState(props.data)
   useEffect(() => {
      setNews(props.data)
   }, [props.data])
   return (
      <div>
         <div className='flex flex-col mt-8'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
               <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                     <table
                        className='min-w-full border-separate'
                        style={{ borderSpacing: 0 }}>
                        <thead className='bg-gray-50'>
                           <tr>
                              <th
                                 scope='col'
                                 className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'>
                                 Content
                              </th>
                              <th
                                 scope='col'
                                 className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'>
                                 Date
                              </th>
                              <th
                                 scope='col'
                                 className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'>
                                 Type
                              </th>
                              <th
                                 scope='col'
                                 className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'>
                                 Publication/Account
                              </th>
                           </tr>
                        </thead>
                        <tbody className='bg-white'>
                           {news.length > 0 &&
                              news?.map((article: any, articleIdx: number) => (
                                 <tr key={article.title}>
                                    <td
                                       className={classNames(
                                          articleIdx !== news.length - 1
                                             ? 'border-b border-gray-200'
                                             : '',
                                          'sm:whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                       )}>
                                       {article.title}
                                    </td>
                                    <td
                                       className={classNames(
                                          articleIdx !== news.length - 1
                                             ? 'border-b border-gray-200'
                                             : '',
                                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                       )}>
                                       {dateHelper(article.date).alphabet}
                                    </td>
                                    <td
                                       className={classNames(
                                          articleIdx !== news.length - 1
                                             ? 'border-b border-gray-200'
                                             : '',
                                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell'
                                       )}>
                                       News
                                    </td>
                                    <td
                                       className={classNames(
                                          articleIdx !== news.length - 1
                                             ? 'border-b border-gray-200'
                                             : '',
                                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                       )}>
                                       {new URL(article.url).hostname}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewsTable
