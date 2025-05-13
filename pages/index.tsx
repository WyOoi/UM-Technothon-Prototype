import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>D-Chain - Blockchain-Powered Disaster Response System</title>
        <meta name="description" content="A transparent, efficient, and equitable blockchain-based solution for disaster response and aid distribution." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      
      <Footer />
    </>
  );
}
