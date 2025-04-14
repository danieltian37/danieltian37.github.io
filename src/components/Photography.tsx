'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';

const Photography = () => {
  // const [isPageLoading, setIsPageLoading] = useState(true);
  // const controls = useAnimation();
  // const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);
  const buttonBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.95)", "var(--background)"]);

  return (
    <section className="relative min-h-screen">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 w-full h-16 z-[100]">
        <Link href="/" className="absolute top-4 left-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: buttonBg }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/20 text-secondary hover:text-primary transition-colors backdrop-blur-sm shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>dev!</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <div className="relative h-screen overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0"
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/photos/hero.jpg)' }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white text-center drop-shadow-lg"
            >
              this page is under construction lol &gt;&lt;
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Commented Out */}
      {/*
      <div className="relative bg-background py-20" ref={ref}>
        ...
      </div>
      */}
    </section>
  );
};

export default Photography;
