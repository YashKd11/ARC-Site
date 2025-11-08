import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className='h-screen text-white flex justify-center items-center text-center relative'>
      <div
        className='fixed inset-0 -z-10'
        style={{
          backgroundImage: 'url("/college.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div
        className='fixed inset-0 -z-10 bg-black opacity-100 pointer-events-none'
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
        }}
      ></div>

      {/* Overlay div to darken the background image */}
      <motion.div
        className='fixed inset-0 bg-black'
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      <motion.div
        className='z-10 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        {/* Subtitle */}
        <motion.div
          className='uppercase font-medium text-lg md:text-2xl'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          Welcome to the
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className='uppercase font-bold text-3xl md:text-5xl lg:text-6xl my-2 md:my-3'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Alumni Relations Cell
        </motion.h1>

        {/* Description */}
        <motion.p
          className='text-sm md:text-lg leading-5 mx-5 lg:mx-40'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4 }}
          viewport={{ once: false }}
        >
          The Alumni Relations Cell of Maharaja Surajmal Institute aims at
          engaging, reminiscing and reconnecting with the fellow alumni of this
          prestigious institution. We are a one-stop hub to discover events,
          resources and opportunities related to the alma mater. Whether you
          graduated last year or decades ago, our website serves as a beacon,
          guiding you back to the heart of our community.
        </motion.p>
      </motion.div>
    </div>
  )
}
