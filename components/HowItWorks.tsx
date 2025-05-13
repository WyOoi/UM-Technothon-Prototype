import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Data Collection',
      description: 'IoT devices and satellites collect real-time data on disaster severity, affected areas, and victim needs.',
      color: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      number: '02',
      title: 'Blockchain Storage',
      description: 'All data is stored on a decentralized blockchain ledger, ensuring immutability and transparency.',
      color: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      number: '03',
      title: 'Smart Contract Activation',
      description: 'Smart contracts automatically allocate resources based on severity and needs assessment.',
      color: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      number: '04',
      title: 'Aid Distribution',
      description: 'Logistics providers and local businesses deliver aid to verified victims based on blockchain data.',
      color: 'bg-pink-100 dark:bg-pink-900/30'
    },
    {
      number: '05',
      title: 'Verification and Transparency',
      description: 'All transactions and deliveries are verified and recorded on the blockchain for public audit.',
      color: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our blockchain-based disaster response system follows these key steps to ensure efficient and transparent aid distribution
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative mb-12 last:mb-0"
            >
              <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
                  <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                    {step.number}
                  </div>
                </div>
                <div className={`md:w-2/3 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute hidden md:block h-full w-px bg-blue-200 dark:bg-blue-700/50 top-0 left-1/3 transform translate-x-10 translate-y-20"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 