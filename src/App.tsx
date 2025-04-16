import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  Key, Lock, Shield, Clock, Phone, MapPin, 
  CheckCircle, Award, Users, Car, Building, 
  Wrench, Menu, X, ChevronRight, Mail, Instagram,
  Facebook, Twitter, Send, ArrowRight
} from 'lucide-react';
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    icon: any;
    title: string;
    description: string;
    image: string;
    color: string;
  } | null>(null);
  const [mousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  const services = [
    { 
      icon: Key, 
      title: 'Emergency Lockout', 
      description: 'Fast help when you’re locked out of your home, car, or office.',
      image: '/your-services-images/emergency-lockout.jpg',
      color: 'from-blue-600 to-cyan-400'
    },
    { 
      icon: Car, 
      title: 'Car Key Replacement', 
      description: 'Quick replacement of lost or malfunctioning car keys and remotes.',
      image: '/your-services-images/transponder-keys.jpg',
      color: 'from-indigo-600 to-blue-400'
    },
    { 
      icon: Lock, 
      title: 'Rekeying & Lock Change', 
      description: 'Update or change locks to keep your property secure.',
      image: '/your-services-images/locks-rekeyed.jpg',
      color: 'from-cyan-500 to-teal-400'
    },
    { 
      icon: Building, 
      title: 'Residential & Commercial', 
      description: 'Locksmith services for both homes and businesses.',
      image: 'your-services-images/residential-commercial.jpg',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: Wrench, 
      title: 'Ignition Repair', 
      description: 'Repair or replace faulty ignition systems in vehicles.',
      image: '/your-services-images/ignitions-replaced.jpg',
      color: 'from-blue-600 to-cyan-500'
    }
  ];
  
  const features = [
    { icon: Clock, text: '24/7 Emergency Service', color: 'text-blue-400', bg: 'bg-blue-950' },
    { icon: Award, text: 'Best in Columbus', color: 'text-cyan-500', bg: 'bg-cyan-950' },
    { icon: Users, text: 'Trusted by 1000+ Clients', color: 'text-purple-200', bg: 'bg-purple-950' },
  ];

  const NavLink: React.FC<{ active: boolean; children: React.ReactNode; onClick: () => void; href: string }> = ({ active, children, onClick, href }) => (
    <a
      href={href}
      onClick={onClick}
      className={`relative font-medium transition-all ${active ? 'text-cyan-300' : 'text-blue-100 hover:text-blue-200'}`}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </a>
  );

  const MobileNavLink: React.FC<{ children: React.ReactNode; onClick: () => void; href: string }> = ({ children, onClick, href }) => (
    <a
      href={href}
      onClick={onClick}
      className="text-2xl font-medium py-4 border-b border-blue-800/30 flex items-center justify-between text-blue-100"
    >
      <span>{children}</span>
      <ChevronRight className="w-5 h-5 text-blue-400" />
    </a>
  );

  const Feature: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-cyan-400" />
      </div>
      <span className="text-blue-100">{text}</span>
    </div>
  );

  const ServiceModal: React.FC<{ service: typeof services[0] | null; onClose: () => void }> = ({ service, onClose }) => {
    if (!service) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-blue-950/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl shadow-blue-500/20"
        >
          <div className="relative h-64">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-blue-950/50 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-200 hover:bg-blue-900"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
              <service.icon size={32} className="text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-blue-100">{service.title}</h3>
            <p className="text-lg text-blue-200/90 mb-6">{service.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+16145308596" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call for Service
              </a>
              <button
                onClick={onClose}
                className="bg-blue-800/50 px-6 py-3 rounded-xl font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden">
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed w-12 h-12 pointer-events-none mix-blend-difference z-50"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      >
        <motion.div 
          className="w-full h-full bg-white rounded-full opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-blue-950/90 to-blue-950/0 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center rotate-12">
                <Key className="w-6 h-6 text-white rotate-12" />
              </div>
              <h1
                onClick={() => window.location.reload()}
                className="cursor-pointer text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-300"
              >
                Columbus Central
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              <NavLink active={activeSection === 'home'} onClick={() => setActiveSection('home')} href="#">Home</NavLink>
              <NavLink active={activeSection === 'services'} onClick={() => setActiveSection('services')} href="#services">Services</NavLink>
              <NavLink active={activeSection === 'about'} onClick={() => setActiveSection('about')} href="#about">About</NavLink>
              <NavLink active={activeSection === 'contact'} onClick={() => setActiveSection('contact')} href="#contact">Contact</NavLink>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex"
            >
              <a 
                href="tel:+16145308596" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                +1 (614) 530-8596
              </a>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-blue-900/50"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0.1 }}
            className="fixed inset-0 z-30 bg-gradient-to-b from-blue-950 to-blue-900 backdrop-blur-lg flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              <MobileNavLink onClick={() => {setActiveSection('home'); setMobileMenuOpen(false)}} href="#">Home</MobileNavLink>
              <MobileNavLink onClick={() => {setActiveSection('services'); setMobileMenuOpen(false)}} href="#services">Services</MobileNavLink>
              <MobileNavLink onClick={() => {setActiveSection('about'); setMobileMenuOpen(false)}} href="#about">About</MobileNavLink>
              <MobileNavLink onClick={() => {setActiveSection('contact'); setMobileMenuOpen(false)}} href="#contact">Contact</MobileNavLink>
            </div>
            
            <div className="mt-auto pb-12">
              <a 
                href="tel:+16145308596" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 text-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now:+1 (614) 530-8596
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-transparent z-10" />
          
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -right-1/4 -top-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -left-1/4 -bottom-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"
          />
          
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-[20%] right-[10%] w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-xl blur-sm"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 45, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-[60%] left-[5%] w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-300 rounded-full blur-sm"
              animate={{
                y: [0, 40, 0],
                rotate: [0, -45, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-[20%] right-[20%] w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-300 rounded-2xl blur-sm"
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                rotate: [0, 90, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24 z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.5, duration: 1, type: "spring" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400">Columbus</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-200 to-cyan-300">Central</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400">Locksmith</span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl mb-12 text-blue-200/90"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Securing Your World with{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  Advanced Solutions
                </span>
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <a 
                  href="tel:+16145308596" 
                  className="group bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg transform transition-all hover:translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity transform scale-x-0 group-hover:scale-x-100 origin-left" />
                  <Phone className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Call Now</span>
                </a>
                
                <a 
                  href="#services" 
                  className="group bg-blue-900/30 backdrop-blur border border-blue-500/30 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg hover:bg-blue-800/40 transition-all transform hover:translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden"
                >
                  <Shield className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Our Services</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all relative z-10" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-20 flex justify-center items-center mt-20"
            >
              <motion.div 
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-40 h-40 bg-blue-950/30 backdrop-blur-lg border border-blue-400/20 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Lock size={64} className="text-blue-300 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent z-10" />
      </section>

      <div className="relative bg-blue-950/50 backdrop-blur-lg py-12 shadow-xl border-t border-b border-blue-800/20 z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group flex flex-col items-center gap-4 bg-blue-900/20 backdrop-blur border border-blue-500/10 p-6 rounded-xl hover:bg-blue-800/30 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden"
              >
                <div className={`${feature.bg} w-16 h-16 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 relative z-10`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <span className="font-semibold text-lg text-center relative z-10">{feature.text}</span>
                <motion.div 
                  className="absolute -bottom-1/2 -right-1/2 w-40 h-40 bg-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <section id="services" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
              Comprehensive locksmith solutions for residential, commercial, and automotive needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-blue-900/30 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
                </div>

                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-100 mb-2">{service.title}</h3>
                  <p className="text-blue-200/80 mb-4">{service.description}</p>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-cyan-300 font-medium flex items-center gap-2 group-hover:text-cyan-200 transition-colors"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedService && (
            <ServiceModal 
              service={selectedService} 
              onClose={() => setSelectedService(null)} 
            />
          )}
        </AnimatePresence>
      </section>

      <section id="about" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                About Us
              </span>
            </h2>
            <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
              Your Trusted Locksmith Experts in Columbus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden h-96 shadow-xl shadow-blue-500/20">
                <img 
                  src="/your-services-images/about-team.jpg" 
                  alt="Columbus Central Locksmith Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-lg inline-block"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-semibold">Serving Since 2010</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-blue-100 mb-4">
                Protecting Columbus, One Lock at a Time
              </h3>
              <p className="text-blue-200/90 mb-6">
                At Columbus Central Locksmith, we've been securing homes, businesses, and vehicles throughout Central Ohio for over a decade. Our team of certified locksmiths brings expertise, reliability, and rapid response to every job, 24/7.
              </p>
              <div className="space-y-4 mb-8">
                <Feature text="Family-owned and operated" />
                <Feature text="Fully licensed and insured" />
                <Feature text="24/7 emergency availability" />
                <Feature text="Latest locksmith technology" />
              </div>
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            <div className="text-center p-6 bg-blue-900/20 rounded-xl border border-blue-500/10">
              <span className="block text-4xl font-bold text-cyan-300 mb-2">10K+</span>
              <span className="text-blue-200/80">Happy Clients</span>
            </div>
            <div className="text-center p-6 bg-blue-900/20 rounded-xl border border-blue-500/10">
              <span className="block text-4xl font-bold text-cyan-300 mb-2">15+</span>
              <span className="text-blue-200/80">Years Experience</span>
            </div>
            <div className="text-center p-6 bg-blue-900/20 rounded-xl border border-blue-500/10">
              <span className="block text-4xl font-bold text-cyan-300 mb-2">24/7</span>
              <span className="text-blue-200/80">Service Availability</span>
            </div>
            <div className="text-center p-6 bg-blue-900/20 rounded-xl border border-blue-500/10">
              <span className="block text-4xl font-bold text-cyan-300 mb-2">100%</span>
              <span className="text-blue-200/80">Satisfaction Guarantee</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </section>

      <section id="contact" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                  Get in Touch
                </span>
              </h2>
              <p className="text-xl text-blue-200/80 mb-8">
                We're here to help 24/7. Contact us for immediate assistance or inquiries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-cyan-400" />
                  <a href="tel:+16145308596" className="text-blue-100 hover:text-cyan-300">
                    +1 (614) 530-8596
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <a href="mailto:info@columbuscentrallocksmith.com" className="text-blue-100 hover:text-cyan-300">
                    info@columbuscentrallocksmith.com
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-1" />
                  <span className="text-blue-100">
                    Columbus, OH<br />
                    Serving Central Ohio
                  </span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-200 hover:text-cyan-300">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-200 hover:text-cyan-300">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-200 hover:text-cyan-300">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-900/30 backdrop-blur-lg rounded-xl p-8 border border-blue-500/20"
            >
              <form 
                className="space-y-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  formData.append("access_key", "6ca09003-a01b-4db8-b376-434b9a71a498");
                  
                  // Log form data for debugging
                  console.log("Form Data:", Object.fromEntries(formData));
                  
                  try {
                    const response = await fetch("https://web3forms.com/submit", {
                      method: "POST",
                      body: formData,
                    });
                    
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
                    }
                    
                    let data: any = null;
try {
  data = await response.json();
} catch (jsonError) {
  const rawText = await response.text(); // fallback to raw text for debugging
  console.warn("Could not parse JSON. Raw response:", rawText);
}

                    
                    // Log the full response for debugging
                    console.log("API Response:", data);
                    
                    if (response.ok && data?.success) {
                      setFormStatus({ message: "Message sent successfully!", type: "success" });
                      form.reset();
                      setTimeout(() => setFormStatus({ message: "", type: null }), 5000);
                    } else {
                      setFormStatus({ 
                        message: data?.message || "Something went wrong. Please try again.", 
                        type: "error" 
                      });
                      console.error("Form submission error:", data);
                    }                    
                  } catch (error) {
                    if (error instanceof Error) {
                      setFormStatus({ 
                        message: `Failed to submit form: ${error.message || "Network error. Please try again later."}`, 
                        type: "error" 
                      });
                      console.error("Fetch error:", error);
                    } else {
                      setFormStatus({ 
                        message: "Failed to submit form: An unknown error occurred.", 
                        type: "error" 
                      });
                      console.error("Unknown error:", error);
                    }
                  }
                }}
              >
                <AnimatePresence>
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg text-center ${
                        formStatus.type === "success" 
                          ? "bg-green-500/20 text-green-300" 
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-blue-200 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg p-3 text-blue-100 focus:outline-none focus:border-cyan-400"
                    placeholder="Your Name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-blue-200 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg p-3 text-blue-100 focus:outline-none focus:border-cyan-400"
                    placeholder="your@email.com" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-blue-200 mb-2">Message</label>
                  <textarea 
                    name="message"
                    className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg p-3 text-blue-100 h-32 focus:outline-none focus:border-cyan-400"
                    placeholder="How can we assist you?" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative bg-blue-950/50 border-t border-blue-800/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center rotate-12">
                  <Key className="w-6 h-6 text-white rotate-12" />
                </div>
                <h1 className="text-2xl font-bold text-blue-100">Columbus Central</h1>
              </div>
              <p className="text-blue-200/80">Your trusted locksmith service in Central Ohio</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-100 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-blue-200/80 hover:text-cyan-300">Home</a></li>
                <li><a href="#services" className="text-blue-200/80 hover:text-cyan-300">Services</a></li>
                <li><a href="#about" className="text-blue-200/80 hover:text-cyan-300">About</a></li>
                <li><a href="#contact" className="text-blue-200/80 hover:text-cyan-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-100 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+16145308596" className="text-blue-200/80 hover:text-cyan-300">+1 (614) 530-8596</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:info@columbuscentrallocksmith.com" className="text-blue-200/80 hover:text-cyan-300">info@columbuscentrallocksmith.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-blue-200/80">Columbus, OH</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800/20 text-center">
            <p className="text-blue-200/60">
              © {new Date().getFullYear()} Columbus Central Locksmith. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;