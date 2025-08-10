// Removed unused import: import Ar from "../assets/Ar.svg"
import { TonConnectButton } from '@tonconnect/ui-react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <main className='flex min-h-screen items-center justify-center p-4 sm:p-8 md:p-12 text-center text-white bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900'>
      <div className='max-w-4xl mx-auto'>
        {/* Main Title and Description Section */}
        <div className='mb-16 px-4'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-4'>
            TWERK FOR A LIVING
            <br className="block sm:hidden" /> {/* Line break for smaller screens */}
            <span className='font-thin text-sky-400'>with no middleman.</span>
          </h1>
          <p className='pt-6 text-base sm:text-lg md:text-xl font-light leading-relaxed'>
            No subs, just make a one-time payment in Telegram curreny to unlock a PPV. Twerkrz earn 💯% in Telegram $TON currency 24/7/365
            <br className="hidden sm:block" /> {/* Line break for larger screens */}
            by uploading short reels (less than 30 secs) as PPV.
            <br className="hidden sm:block" /> {/* Line break for larger screens */}
            Join <a href="https://t.me/ppvcash" target="_blank" rel="noopener noreferrer" className='font-bold underline hover:text-sky-300 transition-colors duration-200'>@ppvcash</a> Telegram to promote your PPV.
          </p>
          <p className='pt-4 text-base sm:text-lg md:text-xl font-light leading-relaxed'>
            PPV.CASH Link in bio <a href="https://ppv.arvrtise.link/" target="_blank" rel="noopener noreferrer" className='font-bold underline hover:text-sky-300 transition-colors duration-200'>PPV.ARVRTISE.LIVE</a> for updates.
          </p>
        </div>

        {/* Wallet Connection and Navigation Section */}
        <div className='flex flex-col items-center justify-center space-y-6 mt-8'>
          <h2 className='text-2xl sm:text-3xl font-medium'>Connect your Telegram wallet</h2>
          <div className='flex justify-center'>
            <TonConnectButton />
          </div>

          <Link to="/all-nft">
            <button
              type="button"
              className="mt-6 px-8 py-3 text-lg font-medium rounded-lg text-white
                         bg-gradient-to-r from-purple-600 to-pink-600
                         hover:from-purple-700 hover:to-pink-700
                         focus:ring-4 focus:outline-none focus:ring-purple-300
                         dark:focus:ring-purple-800 transition-all duration-300 ease-in-out
                         shadow-lg hover:shadow-xl"
            >
              All PPVs
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
