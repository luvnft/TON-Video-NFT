import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
    const client = useTonClient();
    const { sender } = useTonConnect();

    const sleep = (time: number) =>
        new Promise((resolve) => setTimeout(resolve, time));

    const [contractData, setContractData] = useState<{
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    } | null>(null);

    const [contractBalance, setContractBalance] = useState<number | null>(0);

    const mainContract = useAsyncInitialize<OpenedContract<MainContract>>(async () => {
        if (!client) return null;
        const contract = new MainContract(
            Address.parse("EQDtf9azDAQlBovLasimQb0AyG4KGGlYyj9-8T4b9vpOwopc")
        );
        // Assuming there's a proper way to open a contract
        // Replace this with the correct way to interact with the contract using the client
        const openedContract = await client.openContract(contract) as OpenedContract<MainContract>;
        return openedContract;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!mainContract) return;
            setContractData(null);
            const val = await mainContract.getData();

            const balance = await mainContract.getBalance();

            setContractData({
                counter_value: val.number,
                recent_sender: val.recent_sender,
                owner_address: val.owner_address,
            });

            setContractBalance(balance.number);

            await sleep(5000);
            getValue();
        }
        getValue();
    }, [mainContract]);

    return {
        contract_address: mainContract?.address.toString() || "",
        contract_balance: contractBalance || 0,
        ...contractData!,
        sendIncrement: async (val: number) => {
            return mainContract?.sendIncrement(sender, toNano(val.toString()), 5);
        },
        sendDeposit: async (val: number) => {
            return mainContract?.sendDeposit(sender, toNano(val.toString()));
        },
    };
}
