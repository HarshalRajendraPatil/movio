import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const query = location?.search?.slice(3);
  console.log();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query,
          page,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [query]);

  const handleScroll = () => {
    const totalHeight = document.body.offsetHeight - 200;
    const scrollingHeight = window.scrollY + window.innerHeight;

    if (scrollingHeight >= totalHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky z-20 top-[70px]">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query.split("%20").join(" ")}
          className="px-4 py-1 text-lg w-full rounded-full bg-white text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                key={searchData.id + "search " + index}
                data={searchData}
                index={index}
                media_type={"movie"}
                isRated={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
