import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useServices, useTestimonials } from "@/hooks/use-salon";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Quote, ChevronRight } from "lucide-react";

export default function Home() {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const { data: testimonials, isLoading: isLoadingTestimonials } = useTestimonials();

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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash Salon Interior */}
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
              <Link href="/services">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg bg-transparent text-white border-white hover:bg-white hover:text-black backdrop-blur-sm">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-background">
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
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden"
            >
              {/* Unsplash Woman with beautiful hair */}
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
                <Link href="/team">
                  <Button className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background overflow-hidden">
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
