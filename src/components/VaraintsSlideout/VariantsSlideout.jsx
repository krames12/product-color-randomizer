import React, { useEffect, useState } from 'react';
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
  TextField,
 } from "@mui/material";
 import {
  Add,
  ChevronLeft,
  Delete,
  ExpandLess,
  ExpandMore,
 } from '@mui/icons-material';
 import { styled } from '@mui/material/styles';

export default function VariantsSlideout({
  colors, 
  products, 
  addHandler, 
  deleteHandler, 
  isSlideoutOpen, 
  handleSlideoutClose
}) {
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

  const handleAddNewVariant = (category, variantName) => {
    addHandler(category.toLowerCase(), variantName);
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
            addHandler={handleAddNewVariant}
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
              addHandler={handleAddNewVariant}
              deleteHandler={deleteHandler}
            />
          </List>
        )}
      </Box>
    </Drawer>
  )
}

function VariantCategory({items, heading, isOpen, toggleHandler, addHandler, deleteHandler}) {
  const [newVariant, setNewVariant] = useState('');

  return (
    <>
      <ListItemButton onClick={toggleHandler}>
        <ListItemText primary={heading} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem key={`add-${heading}-item`} sx={{ pr: 1.5}} >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} component="form" onSubmit={event => {
              event.preventDefault();
              addHandler(heading, newVariant);
              setNewVariant('');
            }} >
              <TextField 
                id="standard-basic" 
                label={`Add`}
                onChange={ event => setNewVariant(event.target.value) }
                value={newVariant}
                variant="standard"
              />
              <Add sx={{ color: 'action.active', my: 0.5, ml: 2 }} />
            </Box>
          </ListItem>
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

function AddNewVariant({addHandler}) {
  return <TextField id="standard-basic" label={`Add`} variant="standard" /> ;
}
