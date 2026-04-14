import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ChevronUp, 
  ExternalLink, 
  Code2, 
  Layout, 
  Cpu, 
  Terminal,
  User,
  Briefcase,
  Eye,
  EyeOff,
  Send,
  MessageCircle
} from 'lucide-react';

// --- Custom WhatsApp Icon ---
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Typing Effect Component ---
const TypingText = ({ text, delay = 100, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (started && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [started, index, text, delay]);

  return <span>{displayedText}</span>;
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0f2027]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-extrabold tracking-tighter text-gradient"
        >
          ANNAS
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-text-muted hover:text-teal transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="https://wa.me/923044788995"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-teal text-black px-5 py-2 rounded-full text-sm font-bold glow-teal glow-teal-hover transition-all"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f2027] border-t border-teal-900/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-teal-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/923044788995"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-teal px-5 py-3 rounded-xl text-sm font-bold glow-teal"
              >
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-teal/10 border border-teal/20 text-teal text-[0.75rem] font-bold tracking-[2px] uppercase mb-6">
            Available for Freelance
          </span>
          <h1 className="text-6xl md:text-[4.5rem] font-display font-black mb-4 leading-[1] tracking-[-3px]">
            <TypingText text="Muhammad" delay={100} /> <br className="hidden md:block" /> <span className="text-gradient"><TypingText text="Annas" delay={100} startDelay={900} /></span>
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-teal uppercase tracking-[2px] mb-8">
            Web Developer & Engineer
          </h2>
          <p className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            BS Software Engineering student dedicated to building modern, responsive, and user-friendly web experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-teal text-teal rounded-md font-bold text-sm uppercase tracking-widest hover:bg-teal hover:text-black glow-teal-hover transition-all"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/5 border border-white/10 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-teal-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-teal/30 glow-teal relative z-10">
              <img 
                src="/myimage.jpeg" 
                alt="Muhammad Annas" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="text-teal" size={24} />
              <h2 className="text-3xl font-display font-bold">About Me</h2>
            </div>
            <p className="text-xl text-teal font-medium mb-6 italic">
              BS Software Engineering Student
            </p>
            <div className="space-y-4 text-text-muted text-lg leading-relaxed">
              <p>
                I am a passionate Software Engineering student with a deep interest in building modern web applications. My journey in tech is driven by a desire to create impactful digital experiences.
              </p>
              <p>
                Currently, I'm focusing on mastering JavaScript and its ecosystem to build high-performance, responsive websites. I love solving complex problems and turning ideas into reality through code.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="card-style">
                <h3 className="text-teal font-bold text-2xl mb-1">2+</h3>
                <p className="text-[0.65rem] text-text-muted uppercase tracking-wider font-bold">Years Learning</p>
              </div>
              <div className="card-style">
                <h3 className="text-teal font-bold text-2xl mb-1">5+</h3>
                <p className="text-[0.65rem] text-text-muted uppercase tracking-wider font-bold">Projects Done</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: <Layout className="text-orange-500" /> },
    { name: 'CSS3', icon: <Code2 className="text-blue-500" /> },
    { name: 'JavaScript', icon: <Terminal className="text-yellow-400" /> },
    { name: 'C++', icon: <Cpu className="text-blue-400" /> },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-title-style text-center">Skills & Expertise</span>
          <h2 className="text-4xl font-display font-bold mb-4">My <span className="text-gradient">Abilities</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-teal/5 border border-border-subtle hover:border-teal transition-all group flex items-center gap-4"
            >
              <div className="w-2 h-2 bg-teal rounded-full glow-teal" />
              <h3 className="text-lg font-bold">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Fast Food Landing Page',
      desc: 'A vibrant and responsive landing page for a fast-food brand with smooth scrolling and animations.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
      tags: ['HTML', 'Tailwind', 'JavaScript'],
      live: '#',
      github: '#'
    },
    {
      title: 'Card Flipping Game',
      desc: 'An interactive memory game with card-flipping animations and score tracking.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600',
      tags: ['React', 'Motion', 'CSS'],
      live: '#',
      github: '#'
    },
    {
      title: 'Best Login Form',
      desc: 'A professional and secure login interface with validation and modern UI effects.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
      tags: ['React', 'Formik', 'UI/UX'],
      live: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-title-style">Featured Projects</span>
          <h2 className="text-4xl font-display font-bold">Recent <span className="text-gradient">Work</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-style group hover:border-teal/30 transition-all cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <div className="w-20 h-16 bg-[#1a2a33] rounded-lg flex-shrink-0 overflow-hidden">
                   <img src={project.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold group-hover:text-teal transition-colors">{project.title}</h3>
                  <p className="text-xs text-text-muted line-clamp-1">{project.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a href={project.live} className="text-xs font-bold text-teal flex items-center gap-1">
                  <ExternalLink size={12} /> Live
                </a>
                <a href={project.github} className="text-xs font-bold text-text-muted flex items-center gap-1">
                  <Github size={12} /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const email = "m.annas.engineer@gmail.com";
  const phone = "+92 3044788995";

  const maskText = (text: string) => {
    if (text.includes('@')) {
      const [user, domain] = text.split('@');
      return `${user.slice(0, 2)}****@${domain}`;
    }
    return text.slice(0, 6) + "****" + text.slice(-2);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Let's <span className="text-gradient">Connect</span></h2>
            <p className="text-lg text-gray-400 mb-10">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-500/50 transition-all group relative">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Email Me</p>
                  <p className="text-lg font-medium truncate">
                    {showEmail ? email : maskText(email)}
                  </p>
                </div>
                <button 
                  onClick={() => setShowEmail(!showEmail)}
                  className="p-2 text-text-muted hover:text-teal transition-colors flex-shrink-0 z-10"
                  title={showEmail ? "Hide Email" : "Show Email"}
                >
                  {showEmail ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {showEmail && (
                  <a href={`mailto:${email}`} className="absolute inset-0 z-0" aria-label="Email Me"></a>
                )}
              </div>
              
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-500/50 transition-all group relative">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform flex-shrink-0">
                  <WhatsAppIcon size={24} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">WhatsApp</p>
                  <p className="text-lg font-medium truncate">
                    {showPhone ? phone : maskText(phone)}
                  </p>
                </div>
                <button 
                  onClick={() => setShowPhone(!showPhone)}
                  className="p-2 text-text-muted hover:text-teal transition-colors flex-shrink-0 z-10"
                  title={showPhone ? "Hide Number" : "Show Number"}
                >
                  {showPhone ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {showPhone && (
                  <a 
                    href="https://wa.me/923044788995" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-0"
                    aria-label="WhatsApp Me"
                  ></a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-style relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -z-10" />
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-[2px] ml-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-lg bg-white/5 border border-border-subtle focus:border-teal/50 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-[2px] ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 rounded-lg bg-white/5 border border-border-subtle focus:border-teal/50 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-[2px] ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full px-6 py-4 rounded-lg bg-white/5 border border-border-subtle focus:border-teal/50 focus:outline-none transition-all resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-teal text-black rounded-lg font-bold text-sm uppercase tracking-widest glow-teal glow-teal-hover transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-text-muted text-sm">
          © 2026 Muhammad Annas. All rights reserved.
        </div>
        
        <div className="flex items-center gap-8">
          <a href="https://www.linkedin.com/in/muhammad-annas-38422b403/" target = "_blank" className="text-text-muted hover:text-teal text-sm transition-colors">LinkedIn</a>
          <a href="https://github.com/m-annasengineer" target = "_blank" className="text-text-muted hover:text-teal text-sm transition-colors">GitHub</a>
          <a href="m.annas.engineer@gmail.com" className="text-text-muted hover:text-teal text-sm transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-gradient-teal rounded-full glow-teal z-40"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
