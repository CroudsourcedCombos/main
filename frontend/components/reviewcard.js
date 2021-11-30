import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export default function ReviewCard({ score, category, ingredients }) {
  
    const [IsLiked, setIsLiked] = React.useState(false)
    const [AddedToList, setAddedToList] = React.useState(false)
  
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
      
      <Container sx = {{width: "20%",display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CardContent>
              <Typography sx={{ fontSize: 14, display: "flex", justifyContent: "center"}} color="text.secondary" gutterBottom>
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
            
            {Object.keys(ingredients).map((key) => (<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                {titleCase(key)}: <strong>{formatIngredient(ingredients[key])}</strong>
              </Typography>)
            )}
            
            
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Button onClick = {() => {setIsLiked(!IsLiked)}}>
          {IsLiked ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
        </Button>
        <Button onClick = {() => {setAddedToList(!AddedToList)}}>
          {AddedToList ? <PlaylistAddCheckIcon></PlaylistAddCheckIcon> : <PlaylistAddIcon></PlaylistAddIcon>}
        </Button>
      </Container>
      
    </Card>
  );
}