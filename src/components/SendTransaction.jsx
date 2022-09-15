import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import {useDebounce} from "use-debounce";
import { usePrepareSendTransaction,useSendTransaction ,useWaitForTransaction} from "wagmi";

export default function SendTransaction() {
    const [to, setTo] = useState("");
    const [debouncedTo] = useDebounce(to, 500);


    const [amount, setAmount] = useState("");
    const [debouncedValue] = useDebounce(amount,500);

    const {config} = usePrepareSendTransaction({
        request:{
            to: debouncedTo,
            value: debouncedValue ? parseEther(debouncedValue) : undefined,

        },
    })

    const {data,sendTransaction} = useSendTransaction(config);

    const {isLoading,isSuccess} = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <form 
        onSubmit={(evt)=>{
            evt.preventDefault()
            sendTransaction?.()
        }}>
            <input
                label="Recepient"
                placeholder="0xA0Cf…251e"
                onChange={(evt)=>setTo(evt.target.value)}
                value={to}
            />
            <input
                label="Amount"
                placeholder="0.05"
                onChange={(evt)=>setAmount(evt.target.value)}
                value={amount}
            />
            <button disabled={isLoading || !sendTransaction || !to || !amount}>
                {isLoading ? "Sending..." : "Send"}
            </button>
            {isSuccess && (
                <div>
                    Successfully sent {amount} ether to {to}
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </form>
    )
}