import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
 } from "@mui/material";
 import {
  Delete,
  ExpandLess,
  ExpandMore,
 } from '@mui/icons-material';

export default function VariantsSlideout({colors, products, deleteHandler}) {
  /**
   * @TODO
   * - List the variants (product and color right now) as categories
   * - Add / Remove variants from a category
   * - Allow specific generations (i.e. only towers, or only these colors) *nice to have*
   */

  const [colorOpen, setColorOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const handleColorCategoryToggleClick = () => {
    setColorOpen(!colorOpen);
  }

  const handleProductCategoryToggleClick = () => {
    setProductOpen(!productOpen);
  }

  return (
    <Box sx={{ p: 4 }}>
      {products && (
        <VariantCategory 
          items={products}
          heading={'Products'}
          isOpen={productOpen}
          toggleHandler={handleProductCategoryToggleClick}
          deleteHandler={deleteHandler}
        />
      )}
      <Divider />
      {colors && (
        <List>
          <VariantCategory 
            items={colors}
            heading={'Colors'}
            isOpen={colorOpen}
            toggleHandler={handleColorCategoryToggleClick}
            deleteHandler={deleteHandler}
          />
        </List>
      )}
    </Box>
  )
}

function VariantCategory({items, heading, isOpen, toggleHandler, deleteHandler}) {
  return (
    <>
      <ListItemButton onClick={toggleHandler}>
        <ListItemText primary={heading} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          {items && items.map( (item, index) => (
            <ListItem 
              key={index}
              secondaryAction={
                <IconButton 
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteHandler(heading.toLowerCase(), index)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}