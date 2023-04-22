import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import cx from 'classnames';

export default function App() {
  const [product, setProduct] = useState('');
  const [color, setColor] = useState('');
  const [combinations, setCombinations] = useState(JSON.parse(localStorage.getItem('combinations')));
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')));
  const [colors, setColors] = useState(JSON.parse(localStorage.getItem('colors')));
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem('combinations', JSON.stringify(combinations));
  }, [combinations]);

  const generateCombination = () => {
    const newProduct = products[Math.floor(Math.random() * products.length)];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newCombination = `${newProduct} - ${newColor}`;

    setProduct(newProduct);
    setColor(newColor);
    setCombinations([newCombination, ...combinations.slice(0, 2)]);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (product.trim() !== '') {
      setProducts([...products, product]);
      setProduct('');
    }
  };

  const handleAddColor = (event) => {
    event.preventDefault();
    if (color.trim() !== '') {
      setColors([...colors, color]);
      setColor('');
    }
  };

  return (
    <div class="min-h-screen bg-teal-500 text-gray-800">
      <div class="container mx-auto px-4 pt-8">
        <form class="flex flex-col space-y-4 mb-8">
          <label class="text-lg font-bold">Product:</label>
          <input
            type="text"
            class="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <label class="text-lg font-bold">Color:</label>
          <input
            type="text"
            class="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            class="bg-amber-500 text-gray-800 py-2 px-4 rounded-lg font-bold hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
          <button
            class="bg-amber-500 text-gray-800 py-2 px-4 rounded-lg font-bold hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
            onClick={handleAddColor}
          >
            Add Color
          </button>
        </form>
        <button
          class="bg-cyan-500 text-gray-800 py-2 px-4 rounded-lg font-bold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          onClick={generateCombination}
        >
          Generate Combination
        </button>
        <div class="mt-8">
          {combinations.slice(0, 4).map((combination, index) => (
            <div
              class={cx('py-2 px-4 rounded-lg', {
                'bg-gray-100': index === 0,
                'bg-gray-200': index === 1,
                'bg-gray-300': index === 2,
              })}
              key={combination}
            >
              {combination}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}