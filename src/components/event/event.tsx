import React, { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'
import { SimpleEventCard } from '../../lib/interface'
import EventCard from './eventCard'
import Loader from '../common/Loader'

const EventsPage = () => {
  const [data, setData] = useState<SimpleEventCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
          *[_type == 'Events'] | order(Date desc) {
            _id,
            title,
            Date,
            "currentSlug": slug.current,
            titleImage,
          }`

        const fetchedData = await client.fetch(query)

        // Ensure "Grand Alumni Meet 2026" is always at the top
        const specificEventTitle = 'Grand Alumni Meet 2026'
        const featuredEventIndex = fetchedData.findIndex(
          (event: any) => event.title === specificEventTitle
        )

        if (featuredEventIndex !== -1) {
          const [featuredEvent] = fetchedData.splice(featuredEventIndex, 1)
          fetchedData.unshift(featuredEvent)
        }

        setData(fetchedData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching events:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='px-5 md:px-10 xl:px-20'>
      <div className='w-max mx-auto mt-24 md:mt-28 flex flex-col items-center gap-2 text-center'>
        <h1 className='text-4xl md:text-5xl xl:text-4xl font-bold text-[#853333]'>
          EVENTS
        </h1>
        <div className='w-[80%] h-1 md:h-[5px]  bg-[#853333]'></div>
      </div>

      {/* <Loader /> */}

      {isLoading ? (
        <Loader />
      ) : (
        <div className='my-10 flex flex-col xl:flex-row xl:flex-wrap justify-between gap-5 md:gap-14 xl:gap-10'>
          {data.map((post, index) => (
            <EventCard post={post} isNotFirst={index !== 0} key={post._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsPage
