export default interface IStudioTypes {
  _id: string;
  title: string;
  image: string;
  price?: number | string;
  hourlyRate?: number | string;
  location: string;
  overview?: string;
  description?: string;
  ownerName?: string;
}