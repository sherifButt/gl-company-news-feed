interface IDateHelper {
  alphabet: string
  numeric: string
}

export const dateHelper = (date: any): IDateHelper => {
  const MONTH_NAMES_LONG:string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const MONTH_NAMES_SHORT:string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const time:any[] = date.split("T")[0].split("-");

  const year:number = time?.[0];
  const month:number = time?.[1];
  const day:number = time?.[2];

  const numeric:string = `${day} ${month} ${year}`;
  const alphabet:string = `${day} ${MONTH_NAMES_LONG[month - 1]} ${year}`;

  return { alphabet, numeric };
};
