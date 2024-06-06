import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const DetailsPage = () => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const params = useParams();

  const { data, loading } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  const { data: castData, loading: castLoading } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData, loading: similarLoading } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendedData, loading: recommendedLoading } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  const director = castData.crew?.[0]?.name;
  const producer = castData?.crew
    ?.filter((el) => el?.known_for_department === "Production")
    ?.map((el) => el?.name)
    ?.join(", ");
  const writer = castData?.crew
    ?.filter((el) => el?.known_for_department === "Writing")
    ?.map((el) => el?.name)
    ?.join(", ");
  const sound = castData?.crew
    ?.filter((el) => el?.known_for_department === "Sound")
    ?.map((el) => el?.name)
    ?.join(", ");
  const art = castData?.crew
    ?.filter((el) => el?.known_for_department === "Art")
    ?.map((el) => el?.name)
    ?.join(", ");
  const editing = castData?.crew
    ?.filter((el) => el?.known_for_department === "Editing")
    ?.map((el) => el?.name)
    ?.join(", ");
  const acting = castData?.cast
    ?.filter((el) => el?.known_for_department === "Acting")
    ?.map((el) => el?.name)
    ?.join(", ");

  return (
    <div>
      <div className="w-full h-[420px] relative hidden md:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data.backdrop_path}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 md:py-0 flex gap-5 lg:gap-10 flex-col md:flex-row">
        <div className="md:-mt-28 relative mx-auto md:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data.poster_path}
            className="h-80 w-60 rounded object-cover"
          />
        </div>
        <div className="">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data.title || data.name}
          </h2>
          <p className="text-neutral-300">{data.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
            {data.duration || (data.number_of_seasons && <span> | </span>)}
            {data.duration && (
              <p>Duration: {`${duration[0]}h ${duration[1]}m`}</p>
            )}
            {data.number_of_seasons && (
              <p>Total Seasons: {data.number_of_seasons}</p>
            )}
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview:</h3>
            <p>{data.overview || "No Overview available"}</p>

            <Divider />

            <div className="flex item-center gap-4 my-3 text-center">
              <p>Status: {data.status || "No Status available"}</p>
              <span> | </span>

              <p>
                Release Data:{" "}
                {moment(data.release_data).format("MMMM Do YYYY") ||
                  "No Release Data available."}
              </p>
              <span> | </span>

              <p>Revenue: {data.revenue || "No Revenue available"}</p>
            </div>

            <Divider />
          </div>

          <div>
            {director && (
              <>
                <p>
                  <span className="text-white">Director</span>: {director}
                </p>
                <Divider />
              </>
            )}
            {producer && (
              <>
                <p>
                  <span className="text-white">Producers</span>: {producer}
                </p>
                <Divider />
              </>
            )}
            {editing && (
              <>
                <p>
                  <span className="text-white">Editor</span>: {editing}
                </p>
                <Divider />
              </>
            )}
            {sound && (
              <>
                <p>
                  <span className="text-white">Sound</span>: {sound}
                </p>
                <Divider />
              </>
            )}
            {art && (
              <>
                <p>
                  <span className="text-white">Art</span>: {art}
                </p>
                <Divider />
              </>
            )}
            {writer && (
              <>
                <p>
                  <span className="text-white">Writer</span>: {writer}
                </p>
                <Divider />
              </>
            )}
          </div>

          <h2 className="font-bold text-lg mb-2">Cast:</h2>
          <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {castData?.cast?.map((starCast, index) => {
              return (
                <div key={index + "starcast"}>
                  <div>
                    <img
                      src={imageURL + starCast?.profile_path}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <p className="font-bold text-sm text-neutral-400">
                      {starCast?.name || starCast?.original_name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />

        <HorizontalScrollCard
          data={recommendedData}
          heading={"Recommended " + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
