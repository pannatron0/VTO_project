import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, History } from "lucide-react";

export const VlugsHeader = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Try-On", icon: Clock },
    { path: "/history", label: "History", icon: History },
  ];


  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group">
            <motion.h1
              className="text-2xl md:text-3xl font-display font-semibold tracking-wider text-gradient"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              VLUGS
            </motion.h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-vlugs-silver"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};