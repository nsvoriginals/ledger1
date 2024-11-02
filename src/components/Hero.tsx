"use client"; // For Next.js client-side rendering if needed

 // For Next.js client-side rendering if needed

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {AuroraBackground} from "../components/ui/aurora-background"; // Ensure correct path

export default function Hero() {
    const router = useRouter();
    
    return (
        <div className="w-screen h-screen relative bg-[#161B19] flex items-center justify-center py-2 flex-col">
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4 z-10"
                >
                    <h1 className="text-center text-[100px] w-[90%] font-Poppins text-white">
                        Track every crypto move, <span className="bg-[#1DD79B] text-black">effortlessly</span>
                    </h1>
                    <p className="text-center text-1xl text-gray-300 font-Poppins mt-4 w-[70%]">
                        Get a clear view of your crypto journey with seamless transaction tracking. Every buy, sell, and transfer, all in one place—simple, secure, and precise.
                    </p>
                    <button 
                        onClick={() => router.push("/transactions")} 
                        className="bg-[#1dd79b] mt-8 px-10 py-3 text-black font-Poppins text-1xl rounded-xl"
                    >
                        Track
                    </button>
                    
                </motion.div>
            </AuroraBackground>
        </div>
    );
}
