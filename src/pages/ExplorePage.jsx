import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const totalHeight = document.body.offsetHeight - 200;
    const scrollingHeight = window.scrollY + window.innerHeight;

    if (scrollingHeight >= totalHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg font-semibold lg:text-xl my-3">
          Popular {params.explore} Show
        </h3>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                key={exploreData.id + params.explore + index}
                data={exploreData}
                index={index}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
