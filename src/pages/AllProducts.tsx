import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCloth, fetchAllClothes } from '../features/allClothsSlice';
import CardSearch from '../components/CardSearch';

const AllProducts = () => {
  const dispatch = useDispatch();
  const allClothes = useSelector((state) => state.allClothes.value);

  const [result, setResult] = useState('');

  useEffect(() => {
    dispatch(fetchAllClothes());
  }, [dispatch]);

  const handleDelete = (itemId) => {
    // Dispatch the deleteCloth action with the itemId
    dispatch(deleteCloth(itemId));
  };

  // Filter items based on the search input
  const filteredItems = allClothes.filter((item) => {
    const lowercasedQuery = result.toLowerCase();

    // Check if the name, brand, or designer includes the search query
    return (
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.brand.toLowerCase().includes(lowercasedQuery) ||
      item.designer.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <>
      <div className=" mt-10 mx-auto flex w-full justify-center">
        <input
          className="input"
          placeholder="Search"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      </div>

      <div className="mt-20">
        {filteredItems.map((item, i) => {
          return (
            <div className="flex justify-center gap-x-4">
              <span
                className="text-red-600 cursor-pointer"
                onClick={() => handleDelete(item.id)} // Pass the item id to the handleDelete function
              >
                delete
              </span>
              <Link
                to={`/edit/${item.id}`}
                className="text-blue-600 cursor-pointer"
              >
                edit
              </Link>
              <CardSearch key={i} foundItem={item} status={true} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
