import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { Shuffle } from "@mui/icons-material";

const StyledListItem = styled(ListItem)(({ theme, isEven }) => ({
  backgroundColor: isEven ? theme.palette.grey[800] : theme.palette.grey[900],
  color: theme.palette.text.primary,
}));

export default function CombinationsList({ combinations, onGenerateCombination }) {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom color={theme.palette.text.primary}>
        Previously Generated Combinations
      </Typography>
      {combinations ? (
        <List sx={{ width: "100%" }}>
          {combinations.map((combination, index) => (
            <StyledListItem key={index} isEven={index % 2 === 0}>
              <ListItemText primary={combination} />
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" component="p" color={theme.palette.text.primary}>
          No previously generated combinations
        </Typography>
      )}
      <Button
        variant="contained"
        startIcon={<Shuffle />}
        onClick={onGenerateCombination}
        sx={{ marginTop: "2rem" }}
      >
        Generate Combination
      </Button>
    </>
  );
}