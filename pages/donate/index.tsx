import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiHeart, FiDollarSign, FiCreditCard, FiCheck, FiUsers, FiShield } from 'react-icons/fi';

// List of current disasters for donation selection
const disasterOptions = [
  { id: 1, name: 'Coastal Flooding', location: 'East Coast, Malaysia', victims: 12500 },
  { id: 2, name: 'Forest Fire', location: 'Northern Region, Malaysia', victims: 3200 },
  { id: 3, name: 'Landslide', location: 'Cameron Highlands, Malaysia', victims: 750 },
  { id: 0, name: 'General Disaster Relief Fund', location: 'Nationwide', victims: null },
];

// Donation amount options
const donationAmounts = [10, 25, 50, 100, 250, 500];

const DonatePage = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(disasterOptions[0]);
  const [donationAmount, setDonationAmount] = useState(donationAmounts[2]);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAmountChange = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setDonorName('');
        setDonorEmail('');
        setIsAnonymous(false);
        setPaymentMethod('credit-card');
        setDonationAmount(donationAmounts[2]);
        setCustomAmount('');
      }, 3000);
    }, 1500);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;

  return (
    <>
      <Head>
        <title>Donate to Disaster Victims | D-Chain</title>
        <meta name="description" content="Make a secure and transparent donation to help disaster victims through our blockchain-based platform." />
      </Head>

      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
              <FiHeart className="mr-2 text-red-500" /> Donate to Disaster Relief
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your donation is securely processed via our blockchain technology, ensuring 100% of your contribution reaches those affected by disasters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Donation form */}
            <div className="lg:col-span-2">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Thank You For Your Donation!</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your donation of ${finalAmount.toFixed(2)} to {selectedDisaster.name} has been successfully processed.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    A confirmation receipt has been sent to your email. You can track how your donation is being used through our blockchain ledger.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                  >
                    Make Another Donation
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Donation Details</h2>
                  
                  {/* Disaster selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Select a disaster to support
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {disasterOptions.map((disaster) => (
                        <div
                          key={disaster.id}
                          className={`
                            p-4 rounded-lg border-2 cursor-pointer transition-all
                            ${selectedDisaster.id === disaster.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                            }
                          `}
                          onClick={() => setSelectedDisaster(disaster)}
                        >
                          <h3 className="font-semibold">{disaster.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{disaster.location}</p>
                          {disaster.victims && (
                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                              {disaster.victims.toLocaleString()} affected
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Donation amount */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Donation amount
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                      {donationAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className={`
                            py-2 px-4 rounded-md transition-colors
                            ${donationAmount === amount && !customAmount
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }
                          `}
                          onClick={() => handleAmountChange(amount)}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiDollarSign className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  {/* Donor information */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Your information
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={isAnonymous}
                        required={!isAnonymous}
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={() => setIsAnonymous(!isAnonymous)}
                        className="mr-2"
                      />
                      <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300">
                        Make my donation anonymous
                      </label>
                    </div>
                  </div>
                  
                  {/* Payment method */}
                  <div className="mb-8">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Payment method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center
                          ${paymentMethod === 'credit-card'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }
                        `}
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <FiCreditCard className="mr-2" />
                        <span>Credit Card</span>
                      </div>
                      <div
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center
                          ${paymentMethod === 'crypto'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }
                        `}
                        onClick={() => setPaymentMethod('crypto')}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 11.25L12 8.25L15 11.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 16.5V8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Crypto</span>
                      </div>
                      <div
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center
                          ${paymentMethod === 'bank-transfer'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }
                        `}
                        onClick={() => setPaymentMethod('bank-transfer')}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 21V17H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Bank Transfer</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting || (!customAmount && donationAmount === 0)}
                    className={`
                      w-full py-3 px-6 rounded-full text-white font-semibold text-lg transition-colors
                      ${isSubmitting || (!customAmount && donationAmount === 0)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                      }
                    `}
                  >
                    {isSubmitting ? 'Processing...' : `Donate $${finalAmount.toFixed(2)}`}
                  </button>
                </form>
              )}
            </div>
            
            {/* Info box */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <FiShield className="mr-2 text-blue-600" /> Secure Blockchain Donation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All donations are recorded on our blockchain ledger, ensuring:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <FiCheck className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">100% of your donation reaches victims</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Full transparency in fund distribution</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Real-time tracking of your donation's impact</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Smart contracts ensure equitable distribution</span>
                  </li>
                </ul>
                <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Your donation helps provide:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-gray-600 dark:text-gray-400">• Emergency shelter</li>
                    <li className="text-gray-600 dark:text-gray-400">• Food and clean water</li>
                    <li className="text-gray-600 dark:text-gray-400">• Medical supplies</li>
                    <li className="text-gray-600 dark:text-gray-400">• Long-term recovery support</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <FiUsers className="mr-2 text-blue-600" /> Recent Donors
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah L.', amount: 100, disaster: 'Coastal Flooding', time: '10 minutes ago' },
                    { name: 'Anonymous', amount: 250, disaster: 'General Relief Fund', time: '45 minutes ago' },
                    { name: 'Michael T.', amount: 50, disaster: 'Landslide', time: '2 hours ago' },
                    { name: 'Company XYZ', amount: 1000, disaster: 'Forest Fire', time: '5 hours ago' },
                  ].map((donor, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{donor.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Donated to {donor.disaster} • {donor.time}
                        </p>
                      </div>
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        ${donor.amount}
                      </div>
                    </div>
                  ))}
                  <button className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-4 hover:underline">
                    View all donations →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DonatePage; 