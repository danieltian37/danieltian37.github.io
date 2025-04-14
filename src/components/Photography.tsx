'use client';

import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

const photoCategories = [
  {
    id: 'urban',
    title: 'Streets from the City',
    description: 'From the bustling streets of downtown to quiet alleyways, I capture the raw energy and hidden beauty of city life. Each frame tells a story of movement, architecture, and the people who bring these spaces to life.',
    photos: [
      { id: 'urban1', image: '/photos/urban/1.jpg', caption: 'Downtown Pulse' },
      { id: 'urban2', image: '/photos/urban/2.jpg', caption: 'Alleyway Stories' },
      { id: 'urban3', image: '/photos/urban/3.jpg', caption: 'City Reflections' },
      { id: 'urban4', image: '/photos/urban/4.jpg', caption: 'Urban Geometry' },
    ],
  },
  {
    id: 'landscape',
    title: 'Landscape Wonders',
    description: 'Nature\'s grandeur unfolds through my lens, from majestic mountain ranges to serene coastal scenes. These landscapes capture moments of perfect light and the ever-changing moods of the natural world.',
    photos: [
      { id: 'landscape1', image: '/photos/landscape/1.jpg', caption: 'Mountain Majesty' },
      { id: 'landscape2', image: '/photos/landscape/2.jpg', caption: 'Coastal Serenity' },
      { id: 'landscape3', image: '/photos/landscape/3.jpg', caption: 'Forest Whispers' },
      { id: 'landscape4', image: '/photos/landscape/4.jpg', caption: 'Desert Dreams' },
    ],
  },
  {
    id: 'portrait',
    title: 'Portrait Stories',
    description: 'Every face has a story to tell. Through intimate portraits, I seek to capture the essence of individuals - their emotions, experiences, and the unique light that shines from within.',
    photos: [
      { id: 'portrait1', image: '/photos/portrait/1.jpg', caption: 'The Thinker' },
      { id: 'portrait2', image: '/photos/portrait/2.jpg', caption: 'Joyful Moments' },
      { id: 'portrait3', image: '/photos/portrait/3.jpg', caption: 'Quiet Strength' },
      { id: 'portrait4', image: '/photos/portrait/4.jpg', caption: 'Natural Beauty' },
    ],
  },
  {
    id: 'food',
    title: 'Food Gallery',
    description: 'From street food to fine dining, I capture the artistry and passion behind every dish. These photographs celebrate the colors, textures, and presentation that make food not just a meal, but a visual feast.',
    photos: [
      { id: 'food1', image: '/photos/food/1.jpg', caption: 'Culinary Art' },
      { id: 'food2', image: '/photos/food/2.jpg', caption: 'Street Flavors' },
      { id: 'food3', image: '/photos/food/3.jpg', caption: 'Sweet Delights' },
      { id: 'food4', image: '/photos/food/4.jpg', caption: 'Fresh & Local' },
    ],
  },
];

const LoadingSpinner = () => (
  <motion.div 
    className="flex items-center justify-center w-full h-full absolute inset-0 bg-background/80 backdrop-blur-sm z-10"
    initial={{ opacity: 1, filter: 'blur(10px)' }}
    animate={{ opacity: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="relative w-16 h-16">
      <motion.div 
        className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute inset-0 border-4 border-secondary/20 border-t-transparent rounded-full"
        animate={{ rotate: -360 }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </motion.div>
);

const Photography = () => {
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState<Record<string, number>>({
    urban: 0,
    landscape: 0,
    portrait: 0,
    food: 0
  });
  const [directions, setDirections] = useState<Record<string, number>>({
    urban: 0,
    landscape: 0,
    portrait: 0,
    food: 0
  });
  const [isPageLoading, setIsPageLoading] = useState(true);
  const controls = useAnimation();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY, 
    [0, window.innerHeight * 1.2], 
    [0, -100]
  );
  const buttonBg = useTransform(
    scrollY,
    [window.innerHeight * 1, window.innerHeight * 1.1],
    ["rgba(255, 255, 255, 0.95)", "var(--background)"]
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (categoryId: string, newDirection: number) => {
    const category = photoCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    setDirections(prev => ({ ...prev, [categoryId]: newDirection }));
    setCurrentPhotoIndices(prev => {
      const currentIndex = prev[categoryId];
      const nextIndex = currentIndex + newDirection;
      const newIndices = { ...prev };
      newIndices[categoryId] = nextIndex < 0 ? category.photos.length - 1 : 
                              nextIndex >= category.photos.length ? 0 : nextIndex;
      return newIndices;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen">
      {isPageLoading && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-background z-50"
          initial={{ opacity: 1, filter: 'blur(10px)' }}
          animate={{ opacity: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <LoadingSpinner />
        </motion.div>
      )}
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
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        {/* Hero Section */}
        <div className="relative h-screen overflow-hidden">
          <motion.div 
            style={{ y }}
            className="absolute inset-0"
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
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

        {/* Main Content
        <div className="relative bg-background py-20" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            {photoCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2 relative">
                  <AnimatePresence initial={false} custom={directions[category.id]}>
                    <motion.div
                      key={currentPhotoIndices[category.id]}
                      custom={directions[category.id]}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 200, damping: 25 },
                        opacity: { duration: 0.2 }
                      }}
                      className="w-full"
                    >
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={category.photos[currentPhotoIndices[category.id]].image}
                          alt={category.photos[currentPhotoIndices[category.id]].caption}
                          fill
                          className="object-cover rounded-lg"
                          priority={true}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <button
                    onClick={() => paginate(category.id, -1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 p-2 rounded-full transition-colors"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => paginate(category.id, 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 p-2 rounded-full transition-colors"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-3xl font-bold">{category.title}</h2>
                  <p className="text-secondary text-lg font-medium">
                    {category.photos[currentPhotoIndices[category.id]].caption}
                  </p>
                  <p className="text-secondary">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>*/}
      </motion.div> 
    </section>
  );
};

export default Photography; 