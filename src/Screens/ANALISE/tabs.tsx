import React, { useState } from "react";

interface TabsProps {
  titles: string[];
  children: React.ReactNode[];
}

function Tabs({ titles, children }: TabsProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);  

  return (
    <div>
      <div className="header" style={{width: "800px"}}>
        {titles.map((title, index) => (
          <span
            key={index}
            className={`tab ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            {title}
          </span>
        ))}
      </div>
      {children.map((child, index) => (
        <>{currentIndex === index && <div>{child}</div>}</>
      ))}
    </div>
  );
}

export default Tabs;
