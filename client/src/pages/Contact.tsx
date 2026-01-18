import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendMessage } from "@/hooks/use-salon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const sendMessage = useSendMessage();
  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    sendMessage.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us for appointments, inquiries, or just to say hello.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">123 Elegance Blvd<br />Beverly Hills, CA 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">(310) 555-0123</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@lumieresalon.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Opening Hours</h3>
                    <div className="text-muted-foreground grid grid-cols-2 gap-x-8">
                      <span>Mon - Fri</span>
                      <span>9:00 AM - 8:00 PM</span>
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.6200791409395!2d-118.40035632360814!3d34.07596167314774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d14789%3A0x293115e85d894676!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1709923831411!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-3xl shadow-lg border border-border/50">
            <h2 className="text-3xl font-display font-bold mb-6">Send a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    placeholder="Jane Doe" 
                    className="h-12 rounded-xl"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    placeholder="jane@example.com" 
                    type="email" 
                    className="h-12 rounded-xl"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  placeholder="Inquiry about..." 
                  className="h-12 rounded-xl"
                  {...form.register("subject")}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="min-h-[150px] rounded-xl resize-none p-4"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-xs">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-lg bg-primary hover:bg-primary/90"
                disabled={sendMessage.isPending}
              >
                {sendMessage.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
