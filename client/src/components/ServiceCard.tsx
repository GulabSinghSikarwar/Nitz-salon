import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden border border-border/50 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
        {/* Descriptive alt text for accessibility */}
        {/* Using the image URL directly from the database schema */}
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute bottom-3 right-3 z-20 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border/50 flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3 h-3 text-primary" />
          {service.duration}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary tracking-wider uppercase">{service.category}</span>
          <span className="font-display font-semibold text-lg">{service.price}</span>
        </div>
        
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>
        
        <Link href={`/booking?service=${service.id}`}>
          <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
            Book Now
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
