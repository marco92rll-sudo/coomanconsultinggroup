import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-sm border-b border-divider" 
          : "bg-transparent"
      )}
    >
      <div className="container-wide py-4 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-medium tracking-tight">
          Cooman Consulting Group
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#how-it-works" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a 
            href="#program" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Program
          </a>
          <a 
            href="#fit" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Is This For You
          </a>
        </nav>

        <Button variant="hero" size="sm">
          Request Diagnostic
        </Button>
      </div>
    </header>
  );
};

export default Header;
