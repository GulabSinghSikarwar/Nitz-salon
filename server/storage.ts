import { db } from "./db";
import {
  services,
  staff,
  testimonials,
  bookings,
  messages,
  subscribers,
  type Booking,
  type Message,
  type Subscriber,
  type Service,
  type Staff,
  type Testimonial,
  type InsertBooking,
  type InsertMessage,
  type InsertSubscriber
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getStaff(): Promise<Staff[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createMessage(message: InsertMessage): Promise<Message>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db.insert(subscribers).values(insertSubscriber).returning();
    return subscriber;
  }
}

export const storage = new DatabaseStorage();
