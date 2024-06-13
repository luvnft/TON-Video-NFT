// import Ar from "../assets/Ar.svg"
import { TonConnectButton } from '@tonconnect/ui-react'
import { Link } from 'react-router-dom'

function Homepage() {



  return (
    <div className='flex items-center justify-around pt-32 text-center text-white'>
        
        <div className='mb-16 max-sm:text-center '>
            <h1 className='text-6xl font-semibold'>Watch and Create<br></br><span className='font-thin text-sky-400'> Short PPV Reelity Shows </span></h1>
            <p className='pt-8 text-xl font-thin'> Earn TON money on Telegram <br></br>by selling your Reels as PPV NFTV show. Join <a href="https://t.me/ontonftv" target="_blank" style={{fontWeight: "bold", textDecoration: "underline"}}>@ONTONFTV</a> Telegram.</p>
            <br></br>
            <h2>Connect your wallet to continue</h2>
            <br></br>
            <div className='flex justify-center'>
              <TonConnectButton/>
            </div>
           
            <Link to="/all-nft">
            <button type="button" className="text-white mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">All NFTVs</button>
            </Link>
        </div>
        {/* <div className=''>
           <img src={Ar} alt="" className='h-[490px]' />
        </div> */}
    </div>
  )
}

export default Homepage