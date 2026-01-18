import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Hair, Makeup, Nails, etc.
  price: text("price").notNull(),
  duration: text("duration").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  specialties: text("specialties").array(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").default("Client"), // e.g., "Regular Client"
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  avatar: text("avatar"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  staffId: integer("staff_id").references(() => staff.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status").default("pending"), // pending, confirmed, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertStaffSchema = createInsertSchema(staff).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, status: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// Types
export type Service = typeof services.$inferSelect;
export type Staff = typeof staff.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;

// Insert Types
export type InsertBooking = typeof insertBookingSchema._type;
export type InsertMessage = typeof insertMessageSchema._type;
export type InsertSubscriber = typeof insertSubscriberSchema._type;
