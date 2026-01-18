import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import type { 
  Service, Staff, Testimonial, 
  InsertBooking, InsertMessage, InsertSubscriber 
} from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// === SERVICES ===
export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

export function useService(id: number) {
  return useQuery({
    queryKey: [api.services.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.services.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch service");
      return api.services.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// === STAFF ===
export function useStaff() {
  return useQuery({
    queryKey: [api.staff.list.path],
    queryFn: async () => {
      const res = await fetch(api.staff.list.path);
      if (!res.ok) throw new Error("Failed to fetch staff");
      return api.staff.list.responses[200].parse(await res.json());
    },
  });
}

// === TESTIMONIALS ===
export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return api.testimonials.list.responses[200].parse(await res.json());
    },
  });
}

// === BOOKINGS ===
export function useCreateBooking() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.bookings.create.input>) => {
      const validated = api.bookings.create.input.parse(data);
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.bookings.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit booking");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Booking Requested",
        description: "We'll confirm your appointment shortly via email.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// === CONTACT FORM ===
export function useSendMessage() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.contact.create.input>) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
}

// === SUBSCRIPTION ===
export function useSubscribe() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.subscribe.create.input>) => {
      const validated = api.subscribe.create.input.parse(data);
      const res = await fetch(api.subscribe.create.path, {
        method: api.subscribe.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }
      return api.subscribe.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not subscribe at this time.",
        variant: "destructive",
      });
    },
  });
}
