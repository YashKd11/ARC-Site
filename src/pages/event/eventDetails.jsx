import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client, urlFor } from '../../lib/sanity'
import Loader from '../../components/common/Loader'
import EventCard from '../../components/event/eventCard'

export default function EventDetails() {
  const { id } = useParams()
  const [eventData, setEventData] = useState({})
  const [otherEvents, setOtherEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOtherEventLoading, setIsOtherEventLoading] = useState(true)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const singleEventQuery = `*[_type == 'Events' && _id == '${id}'] {
                    title,
                    Description,
                    Date,
                    PDF {
                        asset-> {
                            url
                        }
                    },
                    titleImage,
                    Image2,
                    Link,
                    venue,
                }`

        const otherEventQuery = `*[_type == 'Events' && _id != '${id}'] | order(Date desc) {
                    _id,
                    title,
                    Date,
                    titleImage,
                    Image2                
}`

        const fetchedEventData = await client.fetch(singleEventQuery)
        setEventData(fetchedEventData[0])
        setIsLoading(false)

        const otherFetchedEvents = await client.fetch(otherEventQuery)
        setOtherEvents(otherFetchedEvents.slice(0, 3))
        setIsOtherEventLoading(false)
      } catch (error) {
        console.error('Error fetching events:', error)
        setIsLoading(false)
        setIsOtherEventLoading(false)
      }
    }
    fetchEventData()
  }, [])


  return (
    <div className='px-7 md:px-12'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-20 md:mt-32 flex flex-col gap-4'>
          <div className="flex flex-col items-center gap-6 md:gap-10 py-6">
  {/* Title Section */}
  <div className="text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-[#853333]">{eventData.title}</h1>
    <div className="mt-2 md:mt-3 w-24 md:w-32 h-[4px] bg-[#853333] mx-auto rounded-full"></div>
  </div>

  {/* Event Details */}
  <div className="gap-6 md:gap-10 items-center">
    {/* Event Description */}
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-2xl md:text-3xl text-[#853333] underline">ABOUT THE EVENT</h2>
      <p className="text-lg md:text-xl">{eventData.Description}</p>
    </div>

    <br></br><br></br>

    {/* Images */}
    <div className="flex justify-around gap-5 max-w-full overflow-x-auto">
      <img
        src={urlFor(eventData?.titleImage).url()}
        alt="Event Cover"
        className="rounded-3xl object-contain max-w-[43%] max-h-[400px]"
      />
      <img
        src={urlFor(eventData?.Image2).url()}
        alt="Cover"
        className="rounded-3xl object-contain max-w-[43%] max-h-[400px]"
      />
    </div>
  </div>


  {/* Social Media Icons */}
  <div className="flex gap-6 text-4xl md:text-5xl text-[#853333]">
    {/* <FontAwesomeIcon icon={faInstagram} /> */}
    {/* <FontAwesomeIcon icon={faLinkedin} /> */}
  </div>

  {/* Event Details (Date & Venue) */}
  <div className="text-lg md:text-xl text-center">
    <p className="font-bold">
      Date: <span className="font-medium">{eventData.Date}</span>
    </p>
    <p className="font-bold">
      Venue: <span className="font-medium">{eventData.venue}</span>
    </p>
    {eventData?.PDF?.asset?.url && (
      <div className="mt-4">
        <a
          href={eventData.PDF.asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#853333] text-white px-6 py-2 rounded-full font-medium hover:bg-[#6b2828] transition-colors text-base md:text-lg shadow-md"
        >
          View PDF
        </a>
      </div>
    )}
  </div>
</div>


          <div className='flex flex-col gap-1 items-center'>
            <h1 className='text-3xl text-center font-bold text-[#853333] md:text-5xl'>
              Other Events
            </h1>
            <div className='w-[30%] h-1 md:h-[5px] bg-[#853333]'></div>
          </div>
          {/* Other Events */}
          <div className='flex flex-col justify-center xl:flex-row xl:overflow-x-auto mt-5 gap-2 md:gap-10 mb-20'>
            {isOtherEventLoading ? (
              <Loader />
            ) : (
              otherEvents.map((event) => (
                <EventCard post={event} key={event._id} isNotFirst={true} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
