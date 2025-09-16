import { useEffect, useState } from 'react'
import { client, urlFor } from '../../lib/sanity'
import Loader from '../common/Loader'

export default function AlumniCommittee({ isMobile }) {
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
    <div className='my-20 flex flex-col gap-10 md:px-10'>
      <div className='text-[#853333] text-center flex flex-col items-center gap-2 md:mt-10'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold uppercase underline'>
          Alumni Assocation
        </h2>
      </div>

      {isLoading ? (
        <Loader/>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-12 xl:gap-8 place-items-center'>
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className={`p-6 w-[320px] h-auto bg-[#EEEBE8] rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.05] flex flex-col items-center gap-4`}
              >
                <img
                  src={urlFor(item.aImage).url()}
                  alt={item.name}
                  className='w-[200px] h-[250px] object-cover rounded-lg'
                />
                <div className='text-center flex flex-col items-center gap-2'>
                  <h3 className='text-[#853333] font-bold text-2xl'>
                    {item.name}
                  </h3>
                  <div className='w-10 h-1 bg-[#853333]'></div>
                  <p className='uppercase text-lg font-semibold text-gray-700'>
                    {item.Designation}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-700'>No faculty members found.</p>
          )}
        </div>
      )}
    </div>
  )
}
