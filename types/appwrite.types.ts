import { Models } from "node-appwrite";

export interface Events extends Models.Document {
  title: string;
  date: Date;
  venue: string;
  dressCode: string;
}

export interface Tickets extends Models.Document {
  type: string;
  price: Number;
  maxNumber: string;
  couponCode: string;
  couponUrl: string;
  openTime: Date;
  closeTime: Date;
  event: Events;
}

export interface LineUp extends Models.Document {
  name: string;
  performanceCharges: number;
  performanceDuration: number;
  event: Events;
}
