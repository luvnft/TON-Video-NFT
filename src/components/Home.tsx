import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useMainContract } from "../hooks/useMainContract";
import Info from './NFTinfo';

// Define interface for individual NFT items from Pinata
interface Item {
    ipfs_pin_hash: string;
    size: number;
    // Add any other properties an item might have if they are consistently present
    // For example, if Pinata returns 'name' or 'price' directly in the item:
    // name?: string;
    // price?: number;
}

// Define interface for the overall data structure returned by Pinata
interface PinataResponse {
    count: number;
    rows: Item[]; // Ensure rows is an array of Item
}

// Interface for the data expected by the NFT info modal, likely from Cards component's Dataval
interface NFTInfoData {
    image: string;
    price: number;
    name: string;
    // ... any other properties passed to openNFT and used by NFTinfo
}

function Home() {
    const { sendIncrement } = useMainContract();
    const [items, setItems] = useState<Item[]>([]);
    const [toggle, setToggle] = useState<boolean>(false); // Controls visibility of NFT info modal
    const [nftitem, setNftitem] = useState<NFTInfoData | null>(null); // Data for the selected NFT
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for fetching NFTs
    const [fetchError, setFetchError] = useState<string | null>(null); // Error state for fetching NFTs
    const [transactionMessage, setTransactionMessage] = useState<string | null>(null); // Message for transactions
    const [isMessageSuccess, setIsMessageSuccess] = useState<boolean>(false); // Type of transaction message

    // Function to handle opening an NFT, including transaction logic
    const openNFT = async (data: NFTInfoData) => {
        setTransactionMessage(null); // Clear previous message
        try {
            // Attempt to send the increment transaction
            await sendIncrement(data.price);
            // On success, set success message and update NFT info modal state
            setTransactionMessage("Transaction successful!");
            setIsMessageSuccess(true);
            setNftitem(data);
            setToggle(true);
        } catch (err: any) {
            // On failure, set error message
            setTransactionMessage(`Transaction failed: ${err.message || 'Unknown error'}`);
            setIsMessageSuccess(false);
            console.error("Transaction error:", err);
        } finally {
            // Clear the transaction message after a few seconds
            setTimeout(() => setTransactionMessage(null), 5000);
        }
    };

    // Function to change the state of the NFT info modal (toggle open/close)
    const Changestate = () => {
        setToggle(prevToggle => !prevToggle);
    };

    // Pinata API endpoint for fetching pinned files
    const uri: string = "https://api.pinata.cloud/data/pinList";

    // IMPORTANT: API keys should NOT be hardcoded in client-side code for production.
    // They should be loaded securely from environment variables or a backend server.
    // For this example, they are hardcoded as per the original code but this is a security risk.
    const header: HeadersInit = {
        "Content-Type": "application/json",
        pinata_api_key: import.meta.env.PINATA_API_KEY,
        pinata_secret_api_key: import.meta.env.PINATA_SECRET_API_KEY,
    };
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates on unmounted component

        const fetchNfts = async () => {
            setIsLoading(true); // Set loading state
            setFetchError(null); // Clear any previous errors

            try {
                const response: Response = await fetch(uri, {
                    method: "GET",
                    headers: header,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
                }

                const files: PinataResponse = await response.json();
                if (isMounted) {
                    setItems(files.rows);
                    console.log("Fetched NFT files:", files);
                }
            } catch (error: any) {
                if (isMounted) {
                    console.error("Error fetching NFTs:", error);
                    setFetchError(`Failed to load NFTs: ${error.message || 'Unknown error'}`);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false); // Clear loading state
                }
            }
        };

        fetchNfts();

        // Cleanup function to prevent memory leaks if component unmounts during fetch
        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            {/* Custom message display for transactions */}
            {transactionMessage && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
                    ${isMessageSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
                    {transactionMessage}
                </div>
            )}

            {/* Conditionally render NFT info modal or the gallery */}
            {toggle ? (
                <Info Changestate={Changestate} nftitem={nftitem} />
            ) : (
                <div className='flex flex-wrap gradient-bg-welcome min-h-screen gap-10 justify-center pt-24 pb-5 px-16'>
                    {isLoading && (
                        <p className="text-white text-lg">Loading NFTs...</p>
                    )}
                    {fetchError && (
                        <p className="text-red-500 text-lg">Error: {fetchError}</p>
                    )}
                    {!isLoading && !fetchError && items.length === 0 && (
                        <p className="text-white text-lg">No NFTs found.</p>
                    )}
                    {!isLoading && !fetchError && items.length > 0 && (
                        items.filter(item => item.size !== 83).map((item: Item) => (
                            // Use ipfs_pin_hash as a unique key for list rendering
                            <Cards key={item.ipfs_pin_hash} item={item} openNFT={openNFT} />
                        ))
                    )}
                </div>
            )}
        </>
    );
}

export default Home;
