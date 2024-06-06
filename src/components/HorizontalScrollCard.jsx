import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10 z-10 capitalize">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid gap-7 grid-flow-col overflow-hidden relative z-10 overflow-x-scroll scroll-smooth transition-all scrolbar-none"
        >
          {data.map((data, index) => {
            return (
              <Card
                data={data}
                trending={trending}
                index={index + 1}
                key={data.id + "heading" + index}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className="w-full h-full absolute top-0 items-center hidden justify-between lg:flex">
          <button
            className="bg-white p-1 rounded-full text-xl z-10 text-black -ml-3"
            onClick={handlePrevious}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white p-1 rounded-full text-xl z-10 text-black -mr-3"
            onClick={handleNext}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
