import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

function ProductColorForm({ addNewProduct, addNewColor }) {
  const [product, setProduct] = useState("");
  const [color, setColor] = useState("");

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (product.trim() !== '') {
      addNewProduct(product);
      setProduct('');
    }
  };

  const handleAddColor = (event) => {
    event.preventDefault();
    if (color.trim() !== '') {
      addNewColor(color);
      setColor('');
    }
  };

  return (
    <Paper variant="outlined" style={{ padding: "16px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h5">Add Product and Color</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Product"
            variant="outlined"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Color"
            variant="outlined"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddColor}>
            Add Color
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductColorForm;