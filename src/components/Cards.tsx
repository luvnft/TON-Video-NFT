import { useEffect, useState } from 'react';

interface Item {
  ipfs_pin_hash: string;
}

interface Props {
  item: Item;
  openNFT: (data: any) => void;
}

interface Dataval {
  image: string;
  price: number;
  name: string;
}

function Cards({ item, openNFT }: Props) {
  const [data, setData] = useState<Dataval | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadnft = async () => {
      try {
        const uri = `https://gateway.pinata.cloud/ipfs/${item.ipfs_pin_hash}`;
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error('Failed to fetch NFT data');
        }
        const metadata = await response.json();
        if (isMounted) {
          setData(metadata);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching data:', err);
          setError('Failed to load NFT.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadnft();
    return () => {
      isMounted = false;
    };
  }, [item]);

  const renderMedia = () => {
    if (!data?.image) return null;
    const isVideo = data.image.endsWith('.mp4'); // Simple check for video
    return isVideo ? (
      <video src={data.image} className='object-cover w-[230px] h-[230px] rounded overflow-hidden' autoPlay loop muted playsInline />
    ) : (
      <img src={data.image} alt={data.name} className='object-cover w-[230px] h-[230px] rounded overflow-hidden' />
    );
  };

  return (
    <div className='card-div'>
      <div className='card-inner p-2'>
        {loading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && data ? (
          <>
            {renderMedia()}
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-white text-2xl font-thin mt-3'>{data.name}</h3>
              <div className='flex text-white justify-between items-center mb-3 gap-4 mt-3'>
                <div className='gap-2 flex'>
                  <p>{data.price}</p>
                </div>
                <button
                  onClick={() => openNFT(data)}
                  id='ton-connect-btn'
                  type='button'
                  className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2'
                >
                  Open
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Cards;
```
