import AboutBrief from '../../components/home/AboutBrief'
import AlumniBrief from '../../components/home/AlumniBrief'
import EventsBrief from '../../components/home/EventsBrief'
import HeroSection from '../../components/home/HeroSection'
import GrandAlumniMeetBanner from '../../components/home/GrandAlumniMeetBanner'

export default function HomePage({ isMobile }) {
  return (
    <div className='relative text-white'>
      <HeroSection />
      <GrandAlumniMeetBanner />
      <AboutBrief />
      <AlumniBrief />
      <EventsBrief isMobile={isMobile} />
    </div>
  )
}
