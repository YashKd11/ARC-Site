import { cn } from '../../utils/utils'
import { motion } from 'framer-motion'

export default function StudentCouncilCard({
  photo,
  name,
  position,
  linkedin,
  instagram,
  size,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }}
      viewport={{ once: false }}
      className={cn(
        'relative p-2 border-0 bg-[#EEEBE8] flex flex-col overflow-hidden justify-between items-center',
        {
          'w-[200px] h-[310px]': size === 'large',
          'w-[180px] h-[250px]': size === 'medium',
        }
      )}
    >
      <img
        src={photo}
        className='absolute inset-0 w-full h-full object-cover'
      />

      <div className='text-white absolute text-center bottom-5 flex flex-col gap-[2px] z-10 bg-black/50 py-2 w-full'>
        <h3 className='font-bold  truncate px-2'>{name}</h3>
        <div className='font-bold text-xs truncate px-2'>{position}</div>
      </div>

      {/* <div className='h-40 w-32 rounded-[100%] bg-black/50 absolute -top-10 -right-16 z-10' /> */}

      <div className='flex flex-col gap-2 z-20 text-4xl absolute top-3 right-3'>
        {linkedin && (
          <a href={linkedin} target='_blank' rel='noreferrer'>
            <img src='/linkedin.png' alt='' className='w-7' />
          </a>
        )}

        {instagram && (
          <a href={instagram}>
            <img src='/instagram.png' alt='' className='w-7' />
          </a>
        )}
      </div>
    </motion.div>
  )
}
