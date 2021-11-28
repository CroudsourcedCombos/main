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

export default function BasicCard() {
    const [Rating, setRating] = React.useState(0);
    const [Category, setCategory] = React.useState("Sandwhich");
    const [Ingredients, setIngredients] = React.useState([])
  
    return (
    <Card sx={{ width: "100%", border: "1", margin: "10px", display: "flex", alignContent: "space-between"}}>
      <Container sx = {{width: "20%"}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Rated
            </Typography>
            <Typography variant="h2" component="div">
            9
            </Typography>
        </CardContent>
      </Container>
      <Container sx = {{width: "65%"}}>
          <CardContent>
              Ingredients
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", alignContent: "center"}}>
        <CardActions>
            <Button size="small">See Full Review</Button>
        </CardActions>
      </Container>
      
    </Card>
  );
}
