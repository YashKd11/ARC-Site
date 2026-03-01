import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { client, urlFor } from '../../lib/sanity'
import { ROUTE_EVENT_DETAILS } from '../../constants/routes'

export default function GrandAlumniMeetBanner() {
    const [event, setEvent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const query = `*[_type == 'Events' && title == 'Grand Alumni Meet 2026'][0] {
          _id,
          title,
          Date,
          Description,
          titleImage,
          venue
        }`
                const fetchedEvent = await client.fetch(query)
                setEvent(fetchedEvent)
            } catch (error) {
                console.error('Error fetching Grand Alumni Meet 2026:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEvent()
    }, [])

    if (isLoading || !event) {
        // If not loaded or event doesn't exist, don't render anything to avoid a flashing blank space
        return null
    }

    const goToEventDetails = () => {
        navigate(`${ROUTE_EVENT_DETAILS.replace(':id', event._id)}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full px-5 md:px-10 py-10 xl:px-20 mt-10"
        >
            <div
                className="relative w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={goToEventDetails}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={urlFor(event.titleImage).url()}
                        alt={event.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full min-h-[400px] md:min-h-[500px] p-8 md:p-16 text-white w-full md:w-2/3 lg:w-1/2">

                    <div className="inline-block px-4 py-1 mb-4 border-2 border-[#853333] text-[#ff8c8c] font-bold tracking-widest text-sm uppercase w-max bg-black/30 backdrop-blur-sm rounded-full">
                        Featured Event
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                        {event.title}
                    </h1>

                    <p className="text-lg md:text-xl font-medium mb-2 text-gray-200 flex items-center gap-2">
                        📅 {event.Date}
                    </p>

                    <p className="text-lg md:text-xl font-medium mb-6 text-gray-200 flex items-center gap-2">
                        📍 {event.venue}
                    </p>

                    {event.Description && (
                        <p className="text-base md:text-lg text-gray-300 mb-8 line-clamp-3">
                            {event.Description}
                        </p>
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // prevent double navigation triggering
                            goToEventDetails();
                        }}
                        className="w-max bg-[#853333] hover:bg-[#a64040] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg text-lg"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
