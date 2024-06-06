import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type, isRated = true }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full h-80 overflow-hidden rounded min-w-[230px] max-w-[230px] block relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          Image not available
        </div>
      )}

      <div className="absolute top-3">
        {trending && (
          <div className="py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60 text-white overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 font-bold text-lg">
          {data.title || data.name}
        </h2>
        <div className="text-sm flex items-center justify-between">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          {isRated && (
            <p className="bg-black  px-1 rounded-full text-xs text-white">
              Rating: {Number(data.vote_average).toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
