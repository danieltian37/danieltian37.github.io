'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    title: 'Project One',
    description: 'A modern web application built with Next.js and TypeScript.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'An innovative mobile app that solves real-world problems.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    link: '#',
  },
  {
    title: 'Project Three',
    description: 'A powerful backend service with robust API endpoints.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    link: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-20 bg-secondary/5 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Projects</h2>
          <p className="text-secondary font-medium">
            Here are some of my recent works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-lg shadow-lg overflow-hidden border border-secondary/20 hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                <p className="text-secondary mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-primary hover:text-accent transition-colors"
                >
                  View Project
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 