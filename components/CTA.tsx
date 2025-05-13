import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-blue-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Revolutionize Disaster Response?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 text-blue-100"
          >
            Join us in creating a more transparent, efficient, and equitable system for disaster response and aid distribution.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-colors text-lg">
              Get Started
            </button>
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg">
              Request Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 