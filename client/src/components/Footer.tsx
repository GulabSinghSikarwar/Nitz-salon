import { Link } from "wouter";
import { Scissors, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribe } from "@/hooks/use-salon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";

export function Footer() {
  const subscribeMutation = useSubscribe();
  const form = useForm({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof insertSubscriberSchema>) => {
    subscribeMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <footer className="bg-muted/30 pt-16 pb-8 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Scissors className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-display font-bold">Lumière Salon</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Experience luxury hair care and beauty services tailored to your unique style. Where elegance meets expertise.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/team" className="hover:text-primary transition-colors">Meet the Team</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Visit Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Elegance Blvd,<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>(310) 555-0123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@lumieresalon.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive offers and beauty tips.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <Input
                placeholder="Your email address"
                className="bg-background border-border/60 focus:ring-primary/20"
                {...form.register("email")}
              />
              <Button 
                type="submit" 
                disabled={subscribeMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumière Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
