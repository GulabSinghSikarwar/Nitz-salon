import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStaff } from "@/hooks/use-salon";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function Team() {
  const { data: staff, isLoading } = useStaff();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Meet The Artists</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our talented team of stylists, colorists, and beauty experts dedicated to making you look and feel your absolute best.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-muted/30 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                  
                  {/* Social Overlay */}
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
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.specialties?.slice(0, 3).map((specialty, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
