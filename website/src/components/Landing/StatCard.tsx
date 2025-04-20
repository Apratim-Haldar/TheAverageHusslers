"use client"

import {useEffect} from "react";

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
    const statRef = useRef<HTMLHeadingElement>(null);
    
    useEffect(() => {
      if (statRef.current) {
        gsap.to(statRef.current, {
          scrollTrigger: {
            trigger: statRef.current,
            start: 'top center',
            once: true,
          },
          innerHTML: value,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
        });
      }
    }, [value]);
  
    return (
      <div 
        className="p-6 bg-[#1E293B]/50 rounded-2xl backdrop-blur-lg border border-gray-700 transform hover:scale-105 transition-all duration-300 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
      >
        <h3 ref={statRef} className={`stat-number text-4xl font-bold text-[${color}] mb-2`}>0</h3>
        <p className="text-gray-400">{label}</p>
      </div>
    );
  };