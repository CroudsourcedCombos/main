import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';


export default function FoodReviewCard({score, category, name}) {
  const ingredients = JSON.parse(name)
  const keys = Object.keys(ingredients)
  const values = Object.values(ingredients)

  for (let i = 0; i < values.length; i++) {
    if (Array.isArray(values[i])) {
      console.log("inside if")
      values[i] = (values[i]).join(", ");
    }
    ;
  }

  return (
    <Card sx={{width: "100%", border: "1", margin: "10px", display: "flex"}}>
      <Container sx={{width: "20%"}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            Rated
          </Typography>
          <Typography variant="h2" component="div">
            {score}
          </Typography>
        </CardContent>
      </Container>
      <Container sx={{width: "60%"}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {category}
          </Typography>

          {keys.map((key, index) => (
            <Typography key={key} sx={{fontSize: 15}} color="text.primary"
                        gutterBottom>
              {key} : {values[index]}
            </Typography>
          ))}


        </CardContent>
      </Container>
      <Container sx={{
        width: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Image?
      </Container>

    </Card>
  );
}


