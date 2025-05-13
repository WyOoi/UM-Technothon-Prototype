import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiAlertTriangle, FiMapPin, FiUsers, FiCalendar, FiActivity, FiInfo } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Define types for our disaster data
type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

interface Disaster {
  id: number;
  name: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  severity: Severity;
  affectedAreas: string[];
  estimatedVictims: number;
  description: string;
}

// Mock disaster data for demonstration
const mockDisasters: Disaster[] = [
  {
    id: 1,
    name: 'Coastal Flooding',
    type: 'Flood',
    location: 'East Coast, Malaysia',
    coordinates: { lat: 5.2778, lng: 103.5125 },
    date: '2025-05-12',
    severity: 'High',
    affectedAreas: ['Kota Bharu', 'Kuala Terengganu', 'Kuantan'],
    estimatedVictims: 12500,
    description: 'Heavy rainfall has caused severe flooding in coastal regions, with water levels reaching 2 meters in some areas.'
  },
  {
    id: 2,
    name: 'Forest Fire',
    type: 'Fire',
    location: 'Northern Region, Malaysia',
    coordinates: { lat: 4.9753, lng: 100.7394 },
    date: '2025-05-10',
    severity: 'Medium',
    affectedAreas: ['Perak', 'Kedah'],
    estimatedVictims: 3200,
    description: 'Dry conditions have led to forest fires spreading across northern regions, affecting multiple communities.'
  },
  {
    id: 3,
    name: 'Landslide',
    type: 'Landslide',
    location: 'Cameron Highlands, Malaysia',
    coordinates: { lat: 4.4719, lng: 101.3798 },
    date: '2025-05-13',
    severity: 'Critical',
    affectedAreas: ['Tanah Rata', 'Brinchang'],
    estimatedVictims: 750,
    description: 'Heavy rain triggered a major landslide, destroying infrastructure and cutting off several villages.'
  }
];

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-blue-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
    </div>
  )
});

// React functional component declaration
const DisastersIndexPage = () => {
  const [disasters, setDisasters] = useState<Disaster[]>(mockDisasters);
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster>(mockDisasters[0]);
  const [loading, setLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    console.log("Disasters page component mounted");
    
    const interval = setInterval(() => {
      // Update estimated victims slightly to simulate real-time changes
      setDisasters(prevDisasters => 
        prevDisasters.map(disaster => ({
          ...disaster,
          estimatedVictims: Math.floor(
            disaster.estimatedVictims * (1 + (Math.random() * 0.02 - 0.01))
          )
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: Severity): string => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-yellow-500';
      case 'medium': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
      case 'critical': return 'bg-red-700';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerColor = (severity: Severity): string => {
    switch (severity.toLowerCase()) {
      case 'low': return '#eab308'; // yellow-500
      case 'medium': return '#f97316'; // orange-500
      case 'high': return '#ef4444'; // red-500
      case 'critical': return '#b91c1c'; // red-700
      default: return '#6b7280'; // gray-500
    }
  };

  return (
    <>
      <Head>
        <title>Real-time Disasters Map | D-Chain</title>
        <meta name="description" content="Real-time information about ongoing disasters, affected areas, and estimated victims." />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>

      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Real-time Disaster Monitoring
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              View current disasters, affected areas, and estimated victims. Data is updated every 5 minutes via our blockchain network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Disasters List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiAlertTriangle className="mr-2 text-red-500" /> Active Disasters
                </h2>
                <div className="overflow-y-auto max-h-[600px] space-y-3">
                  {disasters.map(disaster => (
                    <motion.div 
                      key={disaster.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedDisaster.id === disaster.id ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}
                      onClick={() => setSelectedDisaster(disaster)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{disaster.name}</h3>
                        <span className={`px-2 py-1 text-xs text-white rounded-full ${getSeverityColor(disaster.severity)}`}>
                          {disaster.severity}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p className="flex items-center"><FiMapPin className="mr-1" /> {disaster.location}</p>
                        <p className="flex items-center mt-1"><FiUsers className="mr-1" /> {disaster.estimatedVictims.toLocaleString()} affected</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map and Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Disaster Map</h2>
                <div className="w-full h-[400px] bg-blue-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <MapComponent 
                    disasters={disasters} 
                    selectedDisaster={selectedDisaster} 
                    setSelectedDisaster={setSelectedDisaster}
                    getMarkerColor={getMarkerColor}
                  />
                </div>
              </div>

              {/* Selected Disaster Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Disaster Details</h2>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDisaster.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">Type: {selectedDisaster.type}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 text-white rounded-full ${getSeverityColor(selectedDisaster.severity)}`}>
                        {selectedDisaster.severity} Severity
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <FiCalendar className="mt-1 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Date Reported</h4>
                        <p>{new Date(selectedDisaster.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-1 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Location</h4>
                        <p>{selectedDisaster.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiUsers className="mt-1 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Estimated Victims</h4>
                        <p>{selectedDisaster.estimatedVictims.toLocaleString()} people</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiActivity className="mt-1 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Status</h4>
                        <p>Active - Aid Distribution In Progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="flex items-start">
                      <FiInfo className="mt-1 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedDisaster.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <h4 className="font-semibold mb-2">Affected Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDisaster.affectedAreas.map((area, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors w-full">
                      View Detailed Reports & Aid Distribution
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Real-time Blockchain Updates
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              All disaster data is recorded on our blockchain ledger and updated every 5 minutes. These updates include real-time information about affected areas, victim counts, and aid distribution.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Disaster</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Update Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12 May 2025, 14:45</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Coastal Flooding</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Victim Count Update</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Estimated victims increased to 12,500</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12 May 2025, 14:40</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Forest Fire</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Aid Distribution</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">$120,000 allocated for emergency relief</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12 May 2025, 14:35</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Landslide</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">New Affected Area</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Brinchang added to affected areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

// Make sure to export the component correctly
export default DisastersIndexPage; 