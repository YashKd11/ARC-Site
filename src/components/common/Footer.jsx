import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faLinkedin,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import {
  ROUTE_ABOUT,
  ROUTE_EXE_COUNCIL,
  ROUTE_EVENTS,
  ROUTE_AASC_COUNCIL,
} from '../../constants/routes'
import { cn, hoverLinkClasses } from '../../utils/utils'
import { motion } from 'framer-motion'
import useIsHomePage from '../../hooks/isPageHome'

export default function Footer() {
  const { isHome } = useIsHomePage()

  const FooterLink = ({ route, label }) => (
    <Link
      className={cn(
        'w-max',
        hoverLinkClasses,
        isHome ? 'before:bg-black' : 'before:bg-white'
      )}
      to={route}
    >
      {label}
    </Link>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className={cn(
        'm-6 rounded-md border border-white/20 z-50 backdrop-blur-md text-sm',
        isHome ? 'bg-white/50 text-black' : 'bg-black/80 text-white'
      )}
    >
      {/* Upper container */}
      <div className='flex md:flex-row justify-between items-center xl:justify-around gap-4 p-9 md:py-10 xl:pb-0'>
        {/* Left Upper */}
        <div className='w-1/2 flex flex-col'>
          <h3
            className={cn(
              'font-bold uppercase text-xl',
              isHome ? 'text-gray-900' : 'text-white'
            )}
          >
            Contact Us
          </h3>
          <FooterLink route={ROUTE_ABOUT} label='About Us' />
          <FooterLink route={ROUTE_EXE_COUNCIL} label='Executive Committee' />
          <FooterLink route={ROUTE_AASC_COUNCIL} label='Student Team' />
          <FooterLink route={ROUTE_EVENTS} label='Events' />
          {/* <FooterLink route={ROUTE_GALLERY} label='Gallery' /> */}
        </div>

        {/* Right Upper */}
        <div className='md:w-max w-1/2'>
          <div>Maharaja Surajmal Institute Janakpuri East, ST 12345</div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} /> <a href='mailto:alumni@msijanakpuri.com'>
            alumni@msijanakpuri.com
            </a>
          </div>
          {/* <div>
            <FontAwesomeIcon icon={faPhone} /> 123-456-7890
          </div> */}
        </div>
      </div>

      {/* Bottom Container */}
      <div
        className={cn('p-10 md:pt-0', isHome ? 'text-gray-900' : 'text-white')}
      >
        <div className='flex gap-4 justify-center align-center my-2'>
          <a
            href={`https://www.linkedin.com/company/msi-alumni-relations-cell`}
            target='_blank'
          >
            <FontAwesomeIcon icon={faLinkedin} size='2x' />
          </a>
          <a
            target='_blank'
            href={`https://www.instagram.com/msi_alumni_relations_cell`}
          >
            <FontAwesomeIcon icon={faInstagram} size='2x' />
          </a>
          <a
            target='_blank'
            href={`https://www.facebook.com/share/ATRSQF574ESPdcJa/`}
          >
            <FontAwesomeIcon icon={faFacebook} size='2x' />
          </a>
        </div>
        <div className='text-center'>
          © Created and maintained by Tech-Team of Alumni Relations Cell
        </div>
      </div>
    </motion.div>
  )
}
