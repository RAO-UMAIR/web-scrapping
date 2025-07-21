import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `http://127.0.0.1:8000/api/products/products?page=${page}&limit=${limit}`,
        {
          "Content-Type": "application-json",
        }
      );
      const data = await res.json();
      console.log(data);
      setData(data.data);
    }
    fetchProducts();
  }, [page, limit]);

  return (
    <div className="h-screen pt-4 px-8">
      <h1 className="text-center text-[#d53f28] text-4xl font-bold mb-14">
        Mobile Phones
      </h1>
      <div className="flex items-center  justify-end gap-8 mb-6">
        <div className="relative inline-block">
          <label className="mr-2 font-medium text-[#DC3C22]">Page:</label>
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="appearance-none border border-red-900 px-4 py-1 rounded-md bg-gray-800 text-gray-200  cursor-pointer shadow-sm pr-10"
          >
            {[1, 2, 3, 4, 5].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative inline-block">
          <label className="mr-2 font-medium text-[#DC3C22]">Limit:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="appearance-none border border-red-900 px-4 py-1 rounded-md bg-gray-800 text-gray-200  cursor-pointer shadow-sm pr-10"
          >
            {[6, 12, 18, 24, 30].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 cursor-pointer">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white relative shadow-2xl rounded-sm px-5 py-10 w-full"
          >
            <div className=" flex justify-center w-full ">
              <img
                src={item.image_url}
                className="w-[120px] h-[130px]"
                alt="Product"
              />
            </div>
            {item.reviews && (
              <div className="absolute bottom-28 left-8 text-black bg-yellow-50 text-[12px] font-semibold rounded-3xl px-1 py-[2px]">
                <p className="flex items-end gap-1">
                  <span className="flex items-center">
                    <AiFillStar className="inline text-yellow-400" />
                    {item.rating}
                  </span>

                  <span className="text-[10px] font-normal">
                    {item.reviews} Reviews
                  </span>
                </p>
              </div>
            )}
            <div className="my-4 text-sm text-gray-600 font-semibold">
              {item.title}
            </div>
            <div className="text-gray-950 text-[14px] font-semibold relative">
              <span>Rs</span>
              <span className="ml-1 text-[20px] relative top-[12px]">
                {item.price.replace("Rs", "")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
