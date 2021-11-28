import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Avatar from "@mui/material/Avatar";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ReviewCard() {
    const [Rating, setRating] = React.useState(0);
    const [Category, setCategory] = React.useState("Sandwhich");
    const [Ingredients, setIngredients] = React.useState([])
  
    return (
    <Card sx={{ width: "100%", border: "1", margin: "10px", display: "flex"}}>
      <Container sx = {{width: "20%"}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Rated
            </Typography>
            <Typography variant="h2" component="div">
            {Rating}
            </Typography>
        </CardContent>
      </Container>
      <Container sx = {{width: "60%"}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {Category}
            </Typography>
            <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                Bread: Whole Wheat
            </Typography>
            <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                Cheese: Provolone
            </Typography>
            <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                Toppings: Tomato
            </Typography>
            <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                Sauce: Mayo
            </Typography>
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        Image?
      </Container>
      
    </Card>
  );
}
