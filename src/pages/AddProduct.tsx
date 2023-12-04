import { useState } from 'react';
import React from 'react';
import supabase from '../config/supabaseClient';
import { useToast } from '@chakra-ui/react';

const AddProduct = () => {
  const toast = useToast();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
    imageUrl: '',
    discount: '',
    gender: '',
    designer: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // Upload image to Supabase Storage
      const { data: imageUploadData, error: imageUploadError } =
        await supabase.storage
          .from('products-images') // Replace 'product-images' with your actual bucket name
          .upload(`product_images/${Date.now()}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageUploadError) {
        setIsLoading(false);
        console.log('Error uploading image:', imageUploadError);
        toast({
          title: 'Error uploading image',
          status: 'error',
          duration: 1000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      // Get the URL of the uploaded image
      const imageUrl = imageUploadData.path;

      // Insert data into the 'products' table
      const { data: productInsertData, error: productInsertError } =
        await supabase.from('menProducts').insert([{ ...product, imageUrl }]);

      if (productInsertError) {
        console.error('Error inserting product data:', productInsertError);
        toast({
          title: 'Error inserting product data.',
          status: 'error',
          duration: 1000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'Product data inserted successfully.',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'top-right',
        });
        console.log('Product data inserted successfully:', productInsertData);
        // Reset the form after successful submission
        setProduct({
          name: '',
          price: '',
          category: '',
          stock: '',
          brand: '',
          imageUrl: '',
          discount: '',
          gender: '',
          designer: '',
        });
        setImageFile(null);
      }
    } catch (error) {
      toast({
        title: 'Error.',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

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
            value={product.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Designer
          </label>
          <input
            type="text"
            name="designer"
            value={product.designer}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            value={product.category}
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
                checked={product.gender === 'men'}
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
                checked={product.gender === 'women'}
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
                checked={product.gender === 'all'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              All
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Discount (Off)
          </label>
          <input
            type="text"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
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
              rounded-md hover:bg-blue-600 h-[50px] flex self-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
