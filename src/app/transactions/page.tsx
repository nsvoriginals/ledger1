

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-56',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}

interface TransactionData {
  sender: string;
  recipient: string; 
  amount: number;
  description: string;
  type: string;
}

export default function Transaction() {
  const [address, setAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<TransactionData[] | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const router = useRouter(); 

  const fetchTransactions = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`https://api-devnet.helius.xyz/v0/addresses/${address}/transactions`, {
        params: {
          'api-key': "b5d22632-cad1-4005-ae59-327d7937274a",
          'limit': 10,
        },
      });

      const parsedTransactions = response.data.map((transaction: any) => {
        const { description, type } = transaction;
        const match = description.match(/(.+) transferred (\d+\.?\d*) SOL to (.+)/);

        return {
          description,
          type,
          sender: match ? match[1] : '',
          amount: match ? match[2] : '',
          recipient: match ? match[3] : ''
        };
      });

      setTransactions(parsedTransactions);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-screen bg-[#161B19] flex justify-center items-center'>
        <Spinner className='text-white' size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-[#161B19] h-full flex justify-center items-center w-full h-screen flex-col overflow-hidden'>
        <h1 className='text-8xl bg-[#1DD79B] mb-24'>ERROR</h1>
        <button className='bg-[#1DD79B] text-black px-10 py-3 rounded-xl' onClick={() => { setError(false) }}>Try again</button>
      </div>
    );
  }

  return (
    <div className='bg-[#161B19] w-full h-full flex flex-col  justify-center items-center'>
      <div className='w-full h-full mt-24'>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="border p-2 rounded  w-[70%] ml-[5%] mr-[5%]"
        />
        <button
          onClick={fetchTransactions}
          className="bg-[#1DD79B] text-white py-2 px-4 rounded"
        >
          Fetch Transactions
        </button>
      </div>
      <div className='w-full h-screen flex items-center justify-center flex-col mt-28 '>
        <h2 className="mt-4 text-white text-2xl text-center">Transaction History for <br /><span className='text-center text-5xl text-[#1DD79B]'>{address}</span></h2>
        {transactions && transactions.length > 0 ? (
          <div className='flex items-center w-[80%] justify-center flex-col gap-10  mt-4 font-Nue text-left border-white'>
            {transactions.map((transaction, index) => (
              <div className="bg-[#1DD79B] w-[90%] text-black p-4 text-left rounded-xl flex items-left  justify-between shadow-md mb-4">
                <div key={index} className='flex-col flex justify-start items-start'>
                <h3 className="text-3xl text-left">Transaction {index + 1}</h3>
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Sender:</strong> {transaction.sender}</p>
                <p><strong>Recipient:</strong> {transaction.recipient}</p>
                <p><strong>Amount Transferred:</strong> {transaction.amount} SOL</p>
                </div>

                <div className='flex items-center justify-center'>
                {address === transaction.sender ? (
        <div className="bg-blue-500 h-[100px] text-center text-1xl text-black rounded-full w-[100px] flex justify-center items-center"> <h1>Send</h1></div>
      ) : (
        <div className="bg-green-500 h-[100px] text-center text-1xl rounded-full text-black w-[100px] flex justify-center items-center "> <h1>Recieved</h1></div>
      )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white mt-6 text-center text-3xl">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
