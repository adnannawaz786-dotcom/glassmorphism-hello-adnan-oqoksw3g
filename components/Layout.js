import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-800/20 via-transparent to-cyan-800/20" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: '10%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            right: '15%',
            top: '40%',
          }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: '60%',
            bottom: '20%',
          }}
        />
      </div>

      {/* Mouse Follower Effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-white/5 to-transparent blur-2xl pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Glass Morphism Container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {/* Main Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Glass Morphism Inner Container */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              {children}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-sm opacity-60" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-sm opacity-40" />
            <div className="absolute top-1/4 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-sm opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}