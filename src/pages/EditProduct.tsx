import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../features/productSlice';

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.value);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    designer: '',
    price: '',
    category: '',
    gender: '',
    stock: '',
    brand: '',
    discount: '',
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    // Handle image change logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch updateProduct action with editedProduct
    dispatch(updateProduct(editedProduct));
  };

  console.log(product);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        {/* Add similar input fields for other properties */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            value={editedProduct.category}
            onChange={handleSelectChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="clothing">Clothing</option>
            <option value="bags">Bags</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="men"
                checked={editedProduct.gender === 'men'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Men
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="women"
                checked={editedProduct.gender === 'women'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Women
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="all"
                checked={editedProduct.gender === 'all'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              All
            </label>
          </div>
        </div>
        {/* Add similar input fields for other properties */}
        <div className="grid w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white justify-center items-center text-center
              rounded-md hover:bg-blue-600 h-[50px] flex self-center`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
