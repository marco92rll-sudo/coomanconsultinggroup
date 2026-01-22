import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "cream" | "dark";
  size?: "default" | "small" | "large";
}

const Section = ({ 
  children, 
  className, 
  id,
  variant = "default",
  size = "default"
}: SectionProps) => {
  const variantStyles = {
    default: "bg-background",
    cream: "bg-secondary",
    dark: "bg-primary text-primary-foreground",
  };

  const sizeStyles = {
    small: "section-padding-sm",
    default: "section-padding",
    large: "py-24 md:py-36 lg:py-44",
  };

  return (
    <section
      id={id}
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container-wide"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
