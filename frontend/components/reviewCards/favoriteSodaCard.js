import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { SODAS } from "../../constants/soda";
import Rating from "@mui/material/Rating";

export default function FavoriteSodaCard({ score, category, id, comment }) {
  const data = SODAS[id];

  return (
    <Card
      sx={{
        width: "100%",
        border: "1",
        margin: "10px",
        display: "flex",
        "& > *": {
          paddingRight: "5px",
          paddingLeft: "5px",
        },
      }}
    >
      <Container sx={{ width: "50%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 15 }} color="primary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {data["drink"]}
          </Typography>
        </CardContent>
      </Container>
      <Container sx={{ width: "50%", justifyContent: "space-between" }}>
        <CardContent>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            Rating
          </Typography>
          <Rating value={score} readOnly size="large" />
        </CardContent>
      </Container>
    </Card>
  );
}
