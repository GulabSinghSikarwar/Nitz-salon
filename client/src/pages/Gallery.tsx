import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Hardcoded gallery images for demo since these aren't in the schema, 
// but in a real app would likely come from an API or CMS
const galleryItems = [
  { id: 1, category: "Hair", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop" },
  { id: 2, category: "Color", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2576&auto=format&fit=crop" },
  { id: 3, category: "Styling", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop" },
  { id: 4, category: "Makeup", image: "https://images.unsplash.com/photo-1487412947132-28c53bfa373f?q=80&w=2670&auto=format&fit=crop" },
  { id: 5, category: "Hair", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop" },
  { id: 6, category: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop" },
  { id: 7, category: "Styling", image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=2535&auto=format&fit=crop" },
  { id: 8, category: "Color", image: "https://images.unsplash.com/photo-1492106087820-71f171ce71d0?q=80&w=2574&auto=format&fit=crop" },
];

const categories = ["All", "Hair", "Color", "Styling", "Makeup", "Nails"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual journey through our finest work and transformations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className="rounded-full px-6"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
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

      <Footer />
    </div>
  );
}
