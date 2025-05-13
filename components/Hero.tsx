import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Blockchain-Powered Disaster Response System
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              A transparent, efficient, and equitable solution for disaster response and aid distribution
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button className="bg-white text-blue-800 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-colors">
                Learn More
              </button>
              <button className="bg-transparent hover:bg-blue-700 border-2 border-white font-semibold py-3 px-8 rounded-full transition-colors">
                Get Demo
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <Image
              src="/hero-image.svg"
              alt="Blockchain Disaster Response Visualization"
              width={800}
              height={500}
              className="rounded-xl shadow-lg"
              priority
            />
            <div className="absolute -bottom-8 -right-4 bg-blue-700 rounded-lg py-3 px-6 shadow-lg">
              <p className="text-sm font-medium">Real-time updates every 5 minutes</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Transparent</h3>
            <p className="text-blue-100">Public immutable ledger ensures full visibility of disaster data and aid distribution</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Efficient</h3>
            <p className="text-blue-100">Smart contracts automate aid distribution, eliminating bureaucratic delays</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Equitable</h3>
            <p className="text-blue-100">Algorithm-based distribution ensures aid reaches those most affected first</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 