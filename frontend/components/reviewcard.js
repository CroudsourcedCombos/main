import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Avatar from "@mui/material/Avatar";

export default function ReviewCard({ score, category, ingredients }) {
    // Format ingredients to be all strings
    function formatIngredient(ingredients) {
      // If it's an array, format it
      if (Array.isArray(ingredients)) return titleCase(ingredients.join(', '))
      // Otherwise yield it directly
      else return titleCase(ingredients)
    }

    // Title case any strings
    // TO-DO: Move this to be shared across multiple components
    function titleCase(str) {
      const words = str.split(/\s+/)
      const titleCaseArr = words.map(substr => substr[0].toUpperCase() + substr.slice(1))
      return titleCaseArr.join(' ')
    }
    
    return (
    <Card sx={{ width: "100%", border: "1", margin: "10px", display: "flex"}}>
      <Container sx = {{width: "20%"}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Rated
            </Typography>
            <Typography variant="h2" component="div">
            {score}
            </Typography>
        </CardContent>
      </Container>
      <Container sx = {{width: "60%"}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {category}
            </Typography>
            
            {Object.keys(ingredients).map((key, index) => (<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                {titleCase(key)}: {formatIngredient(ingredients[key])}
              </Typography>)
            )}
            
            
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        Image?
      </Container>
      
    </Card>
  );
}
