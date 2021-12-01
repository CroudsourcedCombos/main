import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Modal from "@mui/material/Modal";
import ModalReviewCard from "../modal/ModalReviewCard";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyFoodReviewCard({ score, category, ingredients }) {
  const [IsLiked, setIsLiked] = React.useState(false);
  const [AddedToList, setAddedToList] = React.useState(false);

  // Format ingredients to be all strings
  function formatIngredient(ingredients) {
    // If it's an array, format it
    if (Array.isArray(ingredients)) return titleCase(ingredients.join(", "));
    // Otherwise yield it directly
    else return titleCase(ingredients);
  }

  // Title case any strings
  // TO-DO: Move this to be shared across multiple components
  function titleCase(str) {
    const words = str.split(/\s+/);
    const titleCaseArr = words.map(
      (substr) => substr[0].toUpperCase() + substr.slice(1)
    );
    return titleCaseArr.join(" ");
  }
  return (
    <Card
      sx={{
        width: "100%",
        border: "1",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ width: "100%", paddingTop: "20px" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: 11 }} color="text.secondary">
            {category}
          </Typography>
          <CardContent
            sx={{
              padding: "0",
              display: "flex",
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Typography
              sx={{ fontSize: 11, paddingRight: "15px" }}
              color="text.secondary"
            >
              {"Rating: "}
            </Typography>
            <Rating value={score} readOnly size="medium" />
          </CardContent>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row wrap",
            "&:last-child": {
              paddingBottom: 0,
              paddingTop: 0,
            },
          }}
        >
          {Object.keys(ingredients).map((key) => (
            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
              {titleCase(key)}:{" "}
              <strong>{formatIngredient(ingredients[key])}</strong>
            </Typography>
          ))}
        </CardContent>
      </Container>
      <Container sx={{ width: "100%" }}>
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
            color="text.secondary"
            gutterBottom
          >
            Comments
          </Typography>
          <Typography variant="h7" color="text.primary" gutterBottom>
            "Text goes here djfahkjsdhfas sdfhjkasdfhasdjfhcs"
          </Typography>
        </CardContent>
      </Container>
    </Card>
  );
}
