import { motion } from 'framer-motion';
import { FiDatabase, FiLayers, FiRefreshCw, FiShield, FiTruck, FiUsers } from 'react-icons/fi';

export default function Features() {
  const featureItems = [
    {
      icon: <FiDatabase size={40} />,
      title: 'Real-Time Data Collection',
      description: 'Utilize IoT devices and satellite imagery to collect real-time data on disaster severity and affected areas.'
    },
    {
      icon: <FiLayers size={40} />,
      title: 'Blockchain Integration',
      description: 'Store collected data on a decentralized blockchain ledger, ensuring immutability and transparency.'
    },
    {
      icon: <FiRefreshCw size={40} />,
      title: 'Regular Updates',
      description: 'Update the blockchain every five minutes, allowing stakeholders to monitor developments in real-time.'
    },
    {
      icon: <FiShield size={40} />,
      title: 'Smart Contracts',
      description: 'Deploy smart contracts to automatically allocate funds based on verified impact and needs assessment.'
    },
    {
      icon: <FiTruck size={40} />,
      title: 'Logistics Integration',
      description: 'Connect suppliers and logistics providers to facilitate prompt delivery of aid materials.'
    },
    {
      icon: <FiUsers size={40} />,
      title: 'Stakeholder Collaboration',
      description: 'Enable all stakeholders to track, verify, and contribute to the disaster response process.'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Key Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our blockchain-based system revolutionizes disaster response through these innovative features
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 