import { useState, useEffect } from 'react'
import StudentCouncilCard from '../../components/common/StudentCouncilCard'
import Loader from '../../components/common/Loader'
import { client, urlFor } from '../../lib/sanity'

const ITEMS_TO_SHOW = 8;

export default function Member({ isMobile }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_TO_SHOW);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
         *[_type == 'Team'] | order(id asc) {
          _id,
          name,
          aImage,
          Pos,
          linkedin
        }
        `;

        const fetchedData = await client.fetch(query);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleCount(ITEMS_TO_SHOW); // Show only initial 6 items
    } else {
      setVisibleCount((prevCount) => Math.min(prevCount + 6, data.length)); // Load more in increments of 6
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-10 md:gap-8 xl:gap-x-20 justify-center items-center">
            {data.slice(0, visibleCount).map((item) => (
              <StudentCouncilCard
                key={item._id}
                isMobile={isMobile}
                photo={urlFor(item.aImage).url()}
                name={item.name}
                linkedin={item.linkedin}
                position={item.Pos}
                size="large"
              />
            ))}
          </div>

          {/* Always show Load More / Load Less button when there are more items */}
          {data.length > ITEMS_TO_SHOW && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleToggle}
                className={`px-6 py-2 text-white rounded-lg transition ${
                  isExpanded ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isExpanded ? 'Load Less' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
