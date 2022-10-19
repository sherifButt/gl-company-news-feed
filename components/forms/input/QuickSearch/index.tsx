const QuickSearch = ({inputHandler,value}:any) => {
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
            <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
               {/* <kbd className='inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded'>
                  ⌘K
               </kbd> */}
            </div>
         </div>
      </div>
   )
}

export default QuickSearch
