import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useMainContract } from "../hooks/useMainContract";
import Info from './NFTinfo';

interface Item {
    ipfs_pin_hash: string;
}

interface dataItem {
    count: number;
    rows: [];
}

function Home() {
    const { sendIncrement } = useMainContract();
    const [items, setItems] = useState<Item[]>([]);
    const [toggle, setToggle] = useState<boolean>(false)
    const [nftitem, setNftitem] = useState<any>(null)

    const openNFT = async (data: any) =>{
        sendIncrement(data.price).then(()=>{
            alert("transacton done");
            setNftitem(data);
            setToggle(true);

        }).catch((err)=>{
            alert("tranaction fail "+ err)
        })
    }

const Changestate = async () =>{
    setToggle(!toggle);
}

const uri: string = "https://api.pinata.cloud/data/pinList";

// Define headers
const header: HeadersInit = {
    "Content-Type": "application/json",
    pinata_api_key: `3c9178adcafab5175e0b`,
    pinata_secret_api_key: `a397780d762da7fea9676dc2d1ebb6e3e7922788c00bf7f6773baa85717e98ad`,
};

    useEffect(() => {
       

        fetch(uri, {
            method: "GET",
            headers: header,
        })
            .then((response: Response) => {
                if (response.ok) {
                  console.log(response)
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((files: dataItem) => {
                setItems(files.rows);
                console.log(files);
            })
            .catch((error: Error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <>
            {toggle ? <Info  Changestate={Changestate} nftitem={nftitem}/> :
       <div className='flex flex-wrap gradient-bg-welcome min-h-screen  gap-10 justify-center pt-24 pb-5 px-16'>
        {items.map((item: any)=>(
          <Cards item={item} openNFT={openNFT}/>
          
        ))}
        </div>
  }

            {/* <div className="flex flex-wrap gradient-bg-welcome min-h-screen  gap-10 justify-center pt-24 pb-5 px-16">
                {items.map((item: Item, index: number) => (
                    <Cards key={index} item={item} />
                ))}
            </div> */}
        </>
    );
}

export default Home;


