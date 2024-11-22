import {motion} from "framer-motion";
import {Plane} from "lucide-react";


export default function AnimatedLogo  ()  {

    return (
        <div className="w-10 h-10 relative">
            <motion.div
                className="absolute inset-0"
                animate={{
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                <motion.div
                    className="w-full h-full flex items-center justify-center"
                    animate={{
                        y: [0, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    <Plane className="text-white w-8 h-8 transform -rotate-45"/>
                </motion.div>
            </motion.div>
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <motion.path
                    d="M5 20 Q20 35, 35 20"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{pathLength: 0}}
                    animate={{pathLength: 1}}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
            </svg>
        </div>
    );
};