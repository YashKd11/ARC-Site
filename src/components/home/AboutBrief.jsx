import { Link } from 'react-router-dom'
import { ROUTE_ABOUT } from '../../constants/routes'
import { motion } from 'framer-motion'

export default function AboutBrief() {
  return (
    <div className='relative flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 px-6 md:px-12 lg:px-20 xl:px-28 py-12'>
      {/* Image on left for larger screens */}
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        className='w-full xl:w-2/3 bg-white/50 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-lg'
      >
        <h2 className='uppercase font-bold text-3xl md:text-2xl xl:text-3xl text-[#fff] mb-4'>
          About the Alumni Relations Cell
        </h2>
        <p className='text-black text-sm md:text-md xl:text-lg leading-relaxed'>
          The Alumni Relations Cell fosters lifelong connections and celebrates the
          achievements of our alumni. Serving as a bridge between past, present,
          and future, we provide a platform for networking, mentorship, and
          professional growth while honoring our alma mater’s legacy.
        </p>
        {/* On hover, change cbg color */}
        <div className='mt-6'>
          <Link
            to={ROUTE_ABOUT}
            className='inline-block bg-[#3a3a3a] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#8c2727] transition duration-300'
          >
            Read More
          </Link>
        </div>
      </motion.div>

      {/* Newsletter Cover Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }}
        className="w-full xl:w-1/3 flex flex-col items-center justify-center gap-4 text-center"
      >
        <h3 className="uppercase font-bold text-2xl xl:text-2xl text-[#fff] tracking-wide">
          ARC Newsletter 1st Edition
        </h3>

        <a
          href="https://cdn.sanity.io/files/we464n6p/production/9196de60cf8bf36740a3a1b2dce160f40cb63c9c.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center cursor-pointer"
        >
          <img
            src="/UDAAN_NEWSLETTER_COVER.jpg"
            alt="UDAAN Newsletter Cover"
            className="rounded-lg shadow-2xl w-auto max-h-[350px] md:max-h-[300px] object-contain hover:scale-105 transition-transform duration-300 border-4 border-white/20"
          />
        </a>

        <a
          href="https://cdn.sanity.io/files/we464n6p/production/9196de60cf8bf36740a3a1b2dce160f40cb63c9c.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#8c2727] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#3a3a3a] transition duration-300 uppercase text-sm mt-2"
        >
          Click to read full newsletter
        </a>
      </motion.div>
    </div>
  )
}
