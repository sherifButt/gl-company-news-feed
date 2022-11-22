type QuickSearchProps = {
   inputHandler: any
   value: string
}

const QuickSearch:React.FC<QuickSearchProps> = ({ inputHandler, value }) => {
   return (
      <div className='my-8'>
         <label
            htmlFor='search'
            className='block text-sm font-medium text-gray-700'>
            Quick search
         </label>
         <div className='relative flex items-center mt-1'>
            <input
               type='text'
               name='search'
               id='search'
               className='block w-full pr-12 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
               onChange={inputHandler}
               value={value}
            />
            
         </div>
      </div>
   )
}

export default QuickSearch
