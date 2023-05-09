import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
 } from "@mui/material";
 import {
  ChevronLeft,
  Delete,
  ExpandLess,
  ExpandMore,
 } from '@mui/icons-material';
 import { styled } from '@mui/material/styles';

export default function VariantsSlideout({colors, products, deleteHandler, isSlideoutOpen, handleSlideoutClose}) {
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
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
        },
      }}
      variant="persistent"
      anchor="left"
      open={isSlideoutOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleSlideoutClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ p: 0 }}>
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
    </Drawer>
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
