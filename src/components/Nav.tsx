import { Link } from 'react-router-dom'


function Nav() {
  return (
   <>
<div className="fixed z-10 backdrop-blur-sm">
  <section className="relative mx-auto">
      
    <nav className="flex justify-between w-screen px-24 text-white max-sm:px-0">
      <div className="flex items-center w-full px-5 py-6 xl:px-12 max-sm:gap-10">
        <a className="text-3xl font-bold max-sm:text-base font-heading">
         📺 NFTV
        </a>
       
        <ul className="px-4 mx-auto space-x-12 font-semibold md:flex max-sm:flex max-sm:px-0 max-sm:text-sm font-heading max-sm:space-x-6">
         
        <Link className='text-gray-200 no-underline'  to="/">
          <li>Home</li>   </Link>  
          
          <Link className='text-gray-200 no-underline' to="/all-nft">
          <li>All Reels</li>   </Link>
        
          <Link className='text-gray-200 no-underline' to="/create"> 
          <li>Mint Reel</li>   </Link>  
        </ul>
       
        {/* <div className="items-center hidden space-x-5  xl:flex">
         
        
        <TonConnectButton></TonConnectButton>
        </div> */}
      </div>
    

    </nav>
    
  </section>
</div>


   </>
  )
}

export default Nav  