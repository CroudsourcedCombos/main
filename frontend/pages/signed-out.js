import NavigationBar from "../components/navbar";
import { Container } from "@mui/material";
import { useState } from "react";
import ReviewCard from "../components/reviewcard.js";

const dataset = [
  {
    score: 10,
    category: "Sandwich",
    ingredients: {
      bread: "sourdough",
      cheese: ["provolone"],
      toppings: ["tomato", "lettuce"],
      sauce: ["mayo", "sundried tomato pesto"],
    },
  },
  {
    score: 2,
    category: "Sub",
    ingredients: {
      bread: "torpedo hoagie",
      cheese: ["swiss"],
      toppings: ["onion"],
      sauce: ["sundried tomato pesto"],
    },
  },
  {
    score: 7,
    category: "Salad",
    ingredients: {
      greens: "baby spinach",
      protein: "chicken",
      toppings: ["goat cheese", "olives", "garbanzo beans"],
      dressing: "ranch",
    },
  },
  {
    score: 4,
    category: "Coffee",
    ingredients: {
      type: "french press",
      milk: "none",
      sugar: "2 packets",
    },
  },
];

export default function SignedOut() {
  const [value, setValue] = useState(2);
  const [reviewText, setreviewText] = useState("Controlled");

  const handleChange = (event) => {
    setreviewText(event.target.reviewText);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Container sx={{ width: "60%", margin: "10px" }}>
          <ReviewCard {...dataset[0]} />
          <ReviewCard {...dataset[1]} />
          <ReviewCard {...dataset[2]} />
        </Container>
        <Container sx={{ width: "40%", margin: "10px" }}>
          <ReviewCard {...dataset[3]} />
        </Container>
      </Container>
    </>
  );
}
