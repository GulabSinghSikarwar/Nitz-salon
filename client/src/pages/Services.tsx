import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useServices } from "@/hooks/use-salon";
import { ServiceCard } from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useServices();

  const categories = Array.from(new Set(services?.map(s => s.category) || []));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From precision cuts to transformative color and rejuvenating treatments, explore our full menu of luxury services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted/30 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} id={category.toLowerCase()}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-display font-bold">{category}</h2>
                  <div className="h-px bg-border flex-grow" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services?.filter(s => s.category === category).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="py-20 bg-primary/5 border-y border-border/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Not sure what you need?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Schedule a complimentary 15-minute consultation with one of our master stylists to discuss your hair goals.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
