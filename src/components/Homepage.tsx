// import Ar from "../assets/Ar.svg"
import { TonConnectButton } from '@tonconnect/ui-react'
import { Link } from 'react-router-dom'

function Homepage() {



  return (
    <div className='flex items-center justify-around pt-32 text-center text-white'>
        
        <div className='mb-16 max-sm:text-center '>
            <h1 className='text-6xl font-semibold'>PPV is the Telegram OF<br></br><span className='font-thin text-sky-400'>with no middleman. </span></h1>
            <p className='pt-8 text-xl font-thin'> Earn 💯 in Telegram $TON currency 24/7/365 <br></br>by selling short (Vids less than 60 secs) as PPV. <br></br>Join <a href="https://t.me/ppvgem" target="_blank" style={{fontWeight: "bold", textDecoration: "underline"}}>@ppvgem</a> Telegram to promote your PPV.</p><br></br>Follow <a href="https://x.com/ppvgem" target="_blank" style={{fontWeight: "bold", textDecoration: "underline"}}>@ppvgem</a> on X.
            <br></br>
            <h2>Connect your Telegram wallet</h2>
            <br></br>
            <div className='flex justify-center'>
              <TonConnectButton/>
            </div>
           
            <Link to="/all-nft">
            <button type="button" className="text-white mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">All PPVs</button>
            </Link>
        </div>
        {/* <div className=''>
           <img src={Ar} alt="" className='h-[490px]' />
        </div> */}
    </div>
  )
}

export default Homepage