'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SocialLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors"
  >
    <Image src={icon} alt={label} width={32} height={32} className="opacity-70 hover:opacity-100 transition-opacity" />
  </motion.a>
);

const About = () => {
  const name = "daniel.";
  const letters = name.split("");
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(false);
  }, [pathname]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setHasAnimated(true)}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="text-left"
          >
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold">
                hey! i'm <motion.span 
                  className="text-primary inline-flex"
                  initial="normal"
                  whileHover="hover"
                  variants={{
                    normal: { transition: { staggerChildren: 0 } },
                    hover: { transition: { staggerChildren: 0.05 } }
                  }}
                >
                  {letters.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        normal: { 
                          scale: 1,
                          fontWeight: 700
                        },
                        hover: { 
                          scale: 1.2,
                          fontWeight: 800
                        }
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>
              <div className="flex gap-2">
                <SocialLink 
                  href="https://linkedin.com/in/yourusername" 
                  icon="/icons/linkedin.svg" 
                  label="LinkedIn Profile"
                />
                <SocialLink 
                  href="https://github.com/yourusername" 
                  icon="/icons/github.svg" 
                  label="GitHub Profile"
                />
                <SocialLink 
                  href="https://instagram.com/yourusername" 
                  icon="/icons/instagram.svg" 
                  label="Instagram Profile"
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-secondary italic -mt-2 sm:-mt-4">
                (he/they; aka tian, dtian, tianners, tin/tine/tone, dantian, etc.)
            </h1>
          </motion.div>
          <motion.p
            key={`${pathname}-p1`}
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setHasAnimated(true)}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="text-xl sm:text-2xl text-secondary mb-8 font-semibold"
          >
            i'm into computers, breaking things (gently), {' '}
            <a 
                href="/photography" 
                className="text-primary hover:text-accent transition-colors underline"
              >
                photography
            </a>
          , and {' '}<a 
                href="/#blog" 
                className="text-primary hover:text-accent transition-colors underline"
              >
                thinking out loud.
            </a>
          </motion.p>
          <motion.div
            key={`${pathname}-div1`}
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setHasAnimated(true)}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="-mt-2 sm:-mt-4"
          >
            <p className="text-secondary mb-4 text-lg sm:text-xl font-semibold">
              i'm a CS student and{' '}
              <a 
                href="https://www.rcac.purdue.edu/envision" 
                className="text-primary hover:text-accent transition-colors underline"
              >
                 full stack developer 
              </a>
              {' '}at Purdue University. in the past, i've dabbled in web/mobile dev, ml research, and hardware. this summer, i'm interning at Datadog as a software engineer.
            </p>
            <p className="text-secondary text-lg sm:text-xl font-semibold">
              lately, i've been interested in computer networking and security, despite my complete lack of experience in both of those fields. 
              i've been documenting this (very slow) journey under the tag <span className="text-primary text-bold">self-study</span>, on my blog right below!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 