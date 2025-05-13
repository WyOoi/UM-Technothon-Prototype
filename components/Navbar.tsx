import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-white dark:bg-gray-900 shadow-md fixed top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="D-Chain Logo" width={150} height={45} />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/disasters" 
            passHref
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Disasters Map
          </Link>
          <Link 
            href="/donate" 
            passHref
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center"
          >
            <FiHeart className="mr-1 text-red-500" /> Donate
          </Link>
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#how-it-works">How It Works</NavItem>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#contact">Contact</NavItem>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Get Started
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-4 flex flex-col space-y-4">
            <Link 
              href="/disasters" 
              passHref
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Disasters Map
            </Link>
            <Link 
              href="/donate" 
              passHref
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHeart className="mr-1 text-red-500" /> Donate
            </Link>
            <NavItem href="#features" onClick={() => setIsMenuOpen(false)}>Features</NavItem>
            <NavItem href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</NavItem>
            <NavItem href="#about" onClick={() => setIsMenuOpen(false)}>About</NavItem>
            <NavItem href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavItem>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors w-full">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavItem({ href, children, onClick }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 