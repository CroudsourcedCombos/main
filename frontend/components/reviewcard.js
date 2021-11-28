import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Avatar from "@mui/material/Avatar";

const Pizza = {
  TOPPINGS: [
    'Bacon',
    'Black Forest Ham',
    'Grilled Rosemary Chicken Breast',
    'Italian Sausage',
    'Pepperoni',
    'Smoked Salmon',
    'Vegan Sausage',
    'None',
  ],
  CHEESES: [
    'Mozzarella Cheese',
    'Mozzarella Cheese, Fontina Cheese, Parmesan, Gruyere Cheese',
    'Vegan Mozzarella Cheese',
    'No Cheese',
  ],
  SAUCES: [
    'BBQ Sauce',
    'Bechamel Sauce',
    'Buffalo Sauce',
    'Dill & Shallot Cream Cheese',
    'Pesto Sauce',
    'Smoked Tomato Sauce',
    'Spicy Marinara Sauce',
    'No Sauce',
  ],
  ADD_ONS: [
    'Basil',
    'Mixed Peppers',
    'Mushroom',
    'Pineapple',
    'Ranch Dressing',
    'Red Onion',
    'Sliced Black Olives',
    'Sliced Jalapeño',
    'Tomato',
  ],
}


export default function ReviewCard(props) {
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
                {props.type}
            </Typography>
            
            {Object.entries(Pizza).map((ingredient, choice) => (
              <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                {ingredient[0]} : {ingredient[1][choice]}
              </Typography>
            ))}
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        Image?
      </Container>
      
    </Card>
  );
}


