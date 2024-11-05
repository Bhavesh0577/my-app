'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import Image from 'next/image'

const FloatingElement = (
  { size, duration, delay, initialX, initialY }: 
  { size: number; duration: number; delay: number; initialX: number; initialY: number }
) => (
  <motion.div
    className="absolute rounded-full bg-blue-500 opacity-10"
    style={{
      width: size,
      height: size,
    }}
    initial={{ x: initialX, y: initialY }}
    animate={{
      x: [initialX, initialX + 50, initialX - 50, initialX],
      y: [initialY, initialY - 50, initialY + 50, initialY],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  />
)

const MovingBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <motion.circle
          cx="10%"
          cy="10%"
          r="5%"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            cx: ["10%", "90%", "10%"],
            cy: ["10%", "90%", "10%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="90%"
          cy="90%"
          r="7%"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            cx: ["90%", "10%", "90%"],
            cy: ["90%", "10%", "90%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="6%"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            cx: ["50%", "20%", "80%", "50%"],
            cy: ["50%", "80%", "20%", "50%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.rect
          x="0%"
          y="0%"
          width="10%"
          height="10%"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            x: ["0%", "90%", "0%"],
            y: ["0%", "90%", "0%"],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.polygon
          points="0,0 20,10 10,20"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            points: [
              "0,0 20,10 10,20",
              "100,0 120,10 110,20",
              "100,100 120,110 110,120",
              "0,100 20,110 10,120",
              "0,0 20,10 10,20",
            ],
            rotate: [0, 360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  )
}

const FadingText = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      transition: { duration: 3, repeat: Infinity, repeatDelay: 1 }
    })
  }, [controls])

  return (
    <motion.span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-blue-300 opacity-10" animate={controls}>
      {children}
    </motion.span>
  )
}

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
      <MovingBackground />
      
      {/* Floating background elements */}
      <FloatingElement size={100} duration={20} delay={0} initialX={10} initialY={20} />
      <FloatingElement size={60} duration={15} delay={2} initialX={80} initialY={60} />
      <FloatingElement size={40} duration={25} delay={4} initialX={30} initialY={70} />
      <FloatingElement size={80} duration={18} delay={1} initialX={70} initialY={30} />
      <FloatingElement size={50} duration={22} delay={3} initialX={50} initialY={50} />
      <FloatingElement size={70} duration={28} delay={5} initialX={20} initialY={40} />
      <FloatingElement size={90} duration={32} delay={6} initialX={60} initialY={80} />

      <FadingText>Cool UI</FadingText>

      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">Cool UI</h1>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          <motion.button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative z-10"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`block w-full px-3 py-2 text-left ${
                  activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 py-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Welcome to Cool UI</h2>
          <p className="mb-8">This is an interactive UI with cool animations!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            
            <h3 className="text-xl font-semibold mb-2">Interactive Card 1</h3>
            <p>Hover or tap me to see a cool effect!</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            
            <h3 className="text-xl font-semibold mb-2">Interactive Card 2</h3>
            <p>I also have a cool hover and tap effect!</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Click me!
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}