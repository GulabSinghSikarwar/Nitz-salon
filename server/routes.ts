import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { services, staff, testimonials } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Services
  app.get(api.services.list.path, async (req, res) => {
    const data = await storage.getServices();
    res.json(data);
  });

  app.get(api.services.get.path, async (req, res) => {
    const service = await storage.getService(Number(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  // Staff
  app.get(api.staff.list.path, async (req, res) => {
    const data = await storage.getStaff();
    res.json(data);
  });

  // Testimonials
  app.get(api.testimonials.list.path, async (req, res) => {
    const data = await storage.getTestimonials();
    res.json(data);
  });

  // Bookings
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json({ id: booking.id, message: "Booking confirmed successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Subscribe
  app.post(api.subscribe.create.path, async (req, res) => {
    try {
      const input = api.subscribe.create.input.parse(req.body);
      await storage.createSubscriber(input);
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      // Handle unique constraint error
      if (err instanceof Error && 'code' in err && err.code === '23505') {
         return res.status(400).json({ message: "Email already subscribed" });
      }
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    console.log("Seeding database...");
    
    // Seed Services
    await db.insert(services).values([
      {
        name: "Signature Haircut & Style",
        description: "A precision cut tailored to your face shape and lifestyle, finished with a professional blowout.",
        category: "Hair",
        price: "$85+",
        duration: "60 min",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true
      },
      {
        name: "Balayage Color",
        description: "Hand-painted highlights for a natural, sun-kissed look with seamless growth.",
        category: "Hair",
        price: "$200+",
        duration: "180 min",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true
      },
      {
        name: "Bridal Makeup",
        description: "Flawless, long-lasting makeup application for your special day. Includes trial.",
        category: "Makeup",
        price: "$250",
        duration: "90 min",
        image: "https://images.unsplash.com/photo-1487412947132-26c5c112a118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true
      },
      {
        name: "Luxury Spa Manicure",
        description: "Exfoliation, massage, and polish for rejuvenated hands and nails.",
        category: "Nails",
        price: "$55",
        duration: "45 min",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: false
      },
      {
        name: "Hydrating Facial",
        description: "Deep cleansing and hydration to restore your skin's natural glow.",
        category: "Spa",
        price: "$120",
        duration: "75 min",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true
      }
    ]);

    // Seed Staff
    await db.insert(staff).values([
      {
        name: "Elena Rossi",
        role: "Senior Stylist",
        bio: "With over 10 years of experience, Elena specializes in precision cutting and creative color.",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        specialties: ["Haircutting", "Color Correction", "Balayage"]
      },
      {
        name: "David Chen",
        role: "Makeup Artist",
        bio: "David brings editorial expertise to every appointment, creating looks that enhance natural beauty.",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        specialties: ["Bridal Makeup", "Editorial", "Special Effects"]
      },
      {
        name: "Sarah Johnson",
        role: "Esthetician",
        bio: "Sarah is passionate about skincare and helping clients achieve their healthiest complexion.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        specialties: ["Facials", "Chemical Peels", "Waxing"]
      }
    ]);

    // Seed Testimonials
    await db.insert(testimonials).values([
      {
        name: "Jessica M.",
        role: "Client since 2018",
        content: "The best salon experience I've ever had. Elena listened to exactly what I wanted and delivered perfectly.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Amanda K.",
        role: "Bride",
        content: "David made me feel so beautiful on my wedding day. The makeup lasted all night!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Rachel T.",
        role: "Regular Customer",
        content: "I always look forward to my appointments here. The atmosphere is so relaxing and the staff is wonderful.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
      }
    ]);
    
    console.log("Database seeded successfully.");
  }
}
