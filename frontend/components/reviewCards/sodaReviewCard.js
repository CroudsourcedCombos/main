import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';
import { SODAS } from '../../constants/soda'


export default function SodaReviewCard({score, category, id}) {
  const data = SODAS[id]

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
          <Typography sx={{fontSize: 15}} color="text.primary"
                      gutterBottom>
            {data["drink"]}
          </Typography>


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


