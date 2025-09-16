import { useState, useEffect } from 'react'
import { client, urlFor } from '../../lib/sanity'
import Loader from '../common/Loader'

export default function CouncilPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
          *[_type == 'Faculty'] | order(id asc) {
            _id,
            name,
            aImage,
            Designation,
            Description
          }
          `

        const fetchedData = await client.fetch(query)
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching faculty data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='my-20 flex flex-col items-center md:px-10'>
        <div className='text-[#853333] text-center flex flex-col items-center gap-2 md:my-10'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold uppercase underline'>
            Executives Committee
          </h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.map((item, i) => (
              <div
                key={i}
                className={`w-[95%] md:w-[90%] rounded-md bg-[#EEEBE8] h-fit p-4 m-2 flex flex-col md:flex-row gap-4`}
              >
                <div className=' h-fit flex flex-col items-center'>
                  <img
                    src={urlFor(item.aImage).url()}
                    alt={item.name}
                    className='w-[200px] h-[250px] object-cover rounded-lg'
                  />
                  <h3 className='text-[#853333] font-bold text-2xl whitespace-nowrap'>
                    {item.name}
                  </h3>
                </div>

                <div className='md:w-1/2 lg:w-[80%] h-fit'>
                  <h3 className='text-[#853333] text-3xl font-bold'>
                    {item.Designation}
                  </h3>
                  <p className='text-xs md:text-md lg:text-lg text-gray-500 text-justify md:text-left'>
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
