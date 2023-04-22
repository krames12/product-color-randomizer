import React, {useEffect, useState} from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, amber } from "@mui/material/colors";

import ProductColorForm from "./components/ProductColorForm/ProductColorForm";
import CombinationsList from "./components/CombinationsList/CombinationsList";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[500],
    },
    secondary: {
      main: amber[500],
    },
  },
});

export default function App() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem("colors")) || []
  );
  const [combinations, setCombinations] = useState(
    JSON.parse(localStorage.getItem("combinations")) || []
  );

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  const handleProductSubmit = (product) => {
    setProducts([...products, product]);
  };

  const handleColorSubmit = (color) => {
    setColors([...colors, color]);
  };

  const handleGenerateCombination = () => {
    const product =
      products[Math.floor(Math.random() * products.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const combination = `${product} - ${color}`;

    setCombinations([combination, ...combinations.slice(0, 7)]);
    localStorage.setItem(
      "combinations",
      JSON.stringify([combination, ...combinations.slice(0, 7)])
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 4 }}>
          <ProductColorForm addNewColor={handleColorSubmit} addNewProduct={handleProductSubmit} />
          <CombinationsList combinations={combinations} onGenerateCombination={handleGenerateCombination} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}