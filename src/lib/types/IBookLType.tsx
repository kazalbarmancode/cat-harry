export default interface IBooking {
  _id?: string;
  studioId: string;
  studioTitle: string;
  image?: string;
  price: number | string;
  location: string;
  date: string; 
  userEmail: string;
  status:string,
  userName: string;
  createdAt?: string | Date;
}