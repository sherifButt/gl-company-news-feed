export interface ICompanyNews {
   id: string,
   companyname: string
   url?: string
   insider?: string
   outsider?: string
   ceo?: string
   title?: string
   date?: Date
   company_rel?: number
   insider_rel?: number
   outsider_rel?: number
   ceo_rel?: number
}

export interface INewsData extends Array<ICompanyNews>{ }

export interface ICompanyNewsProps {
   data: INewsData
   companyName:string
   message?: string
}

export interface IFetchCompanyOptions {
    method: string,
    headers: {
        'X-RapidAPI-Key': string,
        'X-RapidAPI-Host':string
    }
}