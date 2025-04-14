'use client';

import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mnqevjna");

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-primary text-3xl sm:text-4xl font-bold mb-4">reach out!</h2>
          <p className="text-secondary mb-8">
            whether you disagree with my posts, want to work together, or just want to say hi, i'm all ears.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                placeholder="name"
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                placeholder="email"
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="message"
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>

            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-full bg-background/80 backdrop-blur-sm border border-secondary/20 text-secondary hover:text-primary hover:text-bold hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'sending...' : 'send!'}
            </motion.button>

            {state.succeeded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-primary"
              >
                thanks for your message! i'll get back to you soon.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 