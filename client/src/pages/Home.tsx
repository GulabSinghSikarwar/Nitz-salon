import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useServices, useTestimonials, useStaff, useSendMessage } from "@/hooks/use-salon";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Quote, ChevronRight, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { useState } from "react";

export default function Home() {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const { data: testimonials, isLoading: isLoadingTestimonials } = useTestimonials();
  const { data: staff, isLoading: isLoadingStaff } = useStaff();
  
  const sendMessage = useSendMessage();
  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onContactSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    sendMessage.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const [galleryFilter, setGalleryFilter] = useState("All");
  const galleryItems = [
    { id: 1, category: "Hair", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop" },
    { id: 2, category: "Color", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2576&auto=format&fit=crop" },
    { id: 3, category: "Styling", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop" },
    { id: 4, category: "Makeup", image: "https://images.unsplash.com/photo-1487412947132-28c53bfa373f?q=80&w=2670&auto=format&fit=crop" },
    { id: 5, category: "Hair", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop" },
    { id: 6, category: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop" },
  ];
  const galleryCategories = ["All", "Hair", "Color", "Styling", "Makeup", "Nails"];
  const filteredGallery = galleryFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  const featuredServices = services?.filter(s => s.featured).slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop"
            alt="Luxury Salon Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide uppercase">
              Award Winning Luxury Salon
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
              Redefining Your <br />
              <span className="text-primary italic">Signature Style</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the pinnacle of hair artistry and personalized beauty services in an atmosphere of refined elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/booking">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-xl shadow-primary/20">
                  Book Appointment
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg bg-transparent text-white border-white hover:bg-white hover:text-black backdrop-blur-sm">
                  View Services
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" className="py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-display font-bold mb-4">Our Curated Services</h2>
              <p className="text-muted-foreground text-lg">
                Discover our range of premium treatments designed to enhance your natural beauty and well-being.
              </p>
            </div>
            <Link href="/services">
              <Button variant="ghost" className="group text-primary hover:text-primary/80 hover:bg-primary/5">
                View Full Menu <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoadingServices ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-muted/50 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredServices?.map((service) => (
                <motion.div key={service.id} variants={item} className="h-full">
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* About / Philosophy Section */}
      <section id="about" className="py-24 bg-muted/30 border-y border-border/40 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop"
                alt="Stylist working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-display text-2xl font-bold italic">
                  "Beauty is not just how you look, but how you feel."
                </p>
                <p className="mt-2 text-white/80">— Sarah Jenkins, Founder</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                The Art of <span className="text-primary">Elegance</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At Lumière, we believe that every client is a canvas and every service is a masterpiece waiting to happen. Our philosophy is rooted in the belief that true luxury lies in the details.
                </p>
                <p>
                  Our team of master stylists and colorists are dedicated to staying at the forefront of global trends while respecting the timeless principles of beauty. We use only the finest, eco-conscious products to ensure your hair not only looks spectacular but remains healthy.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h3 className="text-3xl font-display font-bold text-foreground">15+</h3>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-foreground">5k+</h3>
                  <p className="text-muted-foreground">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-foreground">20+</h3>
                  <p className="text-muted-foreground">Expert Staff</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-foreground">100%</h3>
                  <p className="text-muted-foreground">Organic Products</p>
                </div>
              </div>

              <div className="pt-4">
                <a href="#team">
                  <Button className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                    Meet Our Team
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Meet The Artists</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Our talented team of stylists, colorists, and beauty experts dedicated to making you look and feel your absolute best.
          </p>
          
          {isLoadingStaff ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-muted/30 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {staff?.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4">
                      <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
                        <Instagram className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 px-4 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-muted/20 border-y border-border/40 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            A visual journey through our finest work and transformations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {galleryCategories.map((cat) => (
              <Button
                key={cat}
                variant={galleryFilter === cat ? "default" : "outline"}
                onClick={() => setGalleryFilter(cat)}
                className="rounded-full px-6"
              >
                {cat}
              </Button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group rounded-xl overflow-hidden aspect-[4/5]"
                >
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-display text-xl tracking-wide font-medium">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-background overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Client Love</h2>
            <p className="text-muted-foreground text-lg">
              Hear from our wonderful community of clients who have experienced the Lumière difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingTestimonials ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-muted/30 animate-pulse rounded-2xl" />
              ))
            ) : (
              testimonials?.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-muted/20 p-8 rounded-3xl border border-border/50 relative"
                >
                  <Quote className="absolute top-8 right-8 text-primary/20 w-10 h-10" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-8 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {t.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold font-display">{t.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30 border-y border-border/40 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us for appointments, inquiries, or just to say hello.
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h2 className="text-3xl font-display font-bold mb-8">Get In Touch</h2>
              <div className="space-y-6 text-left">
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
                      <span>Mon - Fri</span><span>9:00 AM - 8:00 PM</span>
                      <span>Saturday</span><span>10:00 AM - 6:00 PM</span>
                      <span>Sunday</span><span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.6200791409395!2d-118.40035632360814!3d34.07596167314774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d14789%3A0x293115e85d894676!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1709923831411!5m2!1sen!2sus"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  className="grayscale opacity-80 hover:opacity-100 transition-opacity"
                ></iframe>
              </div>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-lg border border-border/50">
              <h2 className="text-3xl font-display font-bold mb-6">Send a Message</h2>
              <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Jane Doe" className="h-12 rounded-xl" {...form.register("name")} />
                    {form.formState.errors.name && <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="jane@example.com" type="email" className="h-12 rounded-xl" {...form.register("email")} />
                    {form.formState.errors.email && <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Inquiry about..." className="h-12 rounded-xl" {...form.register("subject")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-xl resize-none p-4" {...form.register("message")} />
                  {form.formState.errors.message && <p className="text-destructive text-xs">{form.formState.errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl text-lg bg-primary hover:bg-primary/90" disabled={sendMessage.isPending}>
                  {sendMessage.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready for your transformation?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Book your appointment today and step into a world of beauty and relaxation.
          </p>
          <Link href="/booking">
            <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25">
              Book Appointment Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
