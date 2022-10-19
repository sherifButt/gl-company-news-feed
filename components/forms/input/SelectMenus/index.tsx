import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps {
   data: any
   className: string
   inputHandler: any
   value: string
   selectedCompany: any
   setSelectedCompany:any
}

const SelectMenus: any = (props: IProps) => {
   return (
      <div className={props.className}>
         <label
            htmlFor='location'
            className='block ml-8 text-sm font-medium text-gray-400 sb-2'>
            Company
         </label>
         <div className='flex flex-row flex-wrap justify-between sm:flex-nowrap'>
            <div className='pt-1 mr-1'>
                   <Image
                       
                  alt='logo'
                  width={50}
                  height={50}
                  src='/a4cb9e_5333a86d65ff4e8b8af141e1c8f82a1c_mv2.png'
               />
            </div>
            <select
               id='location'
               name='location'
               className='w-full py-2 pr-10 text-base border-gray-300 rounded-md pl- focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
               //    defaultValue='Apple Inc.'
               value={props.value}
               placeholder='select value..'
               onChange={(e)=>{props.setSelectedCompany(e.target.value)}}>
               {props.data?.map((company: any, idx: number) => (
                  <option key={idx} value={company.companyname}>
                     {company.companyname}
                  </option>
               ))}
            </select>
            <div className='w-full mt-4 sm:mt-0 sm:ml-2 sm:flex-none sm:w-auto'>
                   <Link href={`/news/${props.selectedCompany}`} passHref>
                       <a>
                           <button
                               
                          type='button'
                          className='inline-flex items-center justify-center object-center w-full px-4 py-2 text-sm font-medium text-white uppercase bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'>
                          get news
                       </button>
                       </a>
                   </Link>
            </div>
         </div>
      </div>
   )
}

export default SelectMenus
