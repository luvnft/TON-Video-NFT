import { Link } from 'react-router-dom'


function Nav() {
  return (
   <>
<div className="fixed z-10 backdrop-blur-sm">
  <section className="relative mx-auto">
      
    <nav className="flex justify-between text-white w-screen max-sm:px-0 px-24">
      <div className="px-5 xl:px-12 py-6 flex max-sm:gap-10 w-full items-center">
        <a className="text-3xl max-sm:text-base font-bold font-heading">
          Ignitus Networks
        </a>
       
        <ul className="md:flex max-sm:flex max-sm:px-0 px-4 mx-auto max-sm:text-sm font-semibold font-heading max-sm:space-x-6 space-x-12">
         
        <Link className='no-underline text-gray-200'  to="/">
          <li>Home</li>   </Link>  
          
          <Link className='no-underline text-gray-200' to="/all-nft">
          <li>All NFT</li>   </Link>
        
          <Link className='no-underline text-gray-200' to="/create"> 
          <li>Mint NFT</li>   </Link>  
        </ul>
       
        {/* <div className=" hidden xl:flex items-center space-x-5">
         
        
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