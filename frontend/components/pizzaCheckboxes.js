// import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { StarRateRounded } from "@material-ui/icons";
// import PIZZAS from "../constants/pizza"

const PIZZAS = {
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

const PizzaReviewRequirements = {
  cheeses: [1, 1],
  toppings: [1, 1],
  add_ons: [0, 3],
  sauces: [1, 1],
};

export default function PizzaCheckboxesGroup() {
  const [state, setState] = useState({
    cheeses: [],
    toppings: [],
    add_ons: [],
    sauces: [],
  });
  const [error, setError] = useState({
    cheeses: "You must pick at least 1 cheese option.",
    toppings: "You must pick at least 1 topping option.",
    add_ons: "",
    sauces: "You must pick at least 1 spread option.",
  });

  const handleChange = (event, type) => {
    // If it's already in the object, then remove the matching ingredient
    const copy = { ...state };
    if (copy[type].includes(event.target.name)) {
      copy[type] = copy[type].filter(
        (ingredient) => ingredient !== event.target.name
      );
    }

    // Otherwise push it to the object
    else copy[type].push(event.target.name);

    // Check if the length is between min and max
    const [min, max] = PizzaReviewRequirements[type];
    const len = copy[type].length;

    // Set the error based on if it's lower than min or higher than max
    const errCopy = { ...error };
    if (len < min) errCopy[type] = `You must pick at least ${min} ${type}.`;
    else if (len > max) errCopy[type] = `You can pick up to ${max} ${type}.`;
    else errCopy[type] = ``;

    setState(copy);
    setError(errCopy);
    // console.log(copy)
  };

  function checkExists(type, target) {
    return state[type].includes(target);
  }

  return (
    <Box sx={{ display: "flex" }}>
      
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Choose One</FormLabel>
        <FormGroup>
          {PIZZAS.CHEESES.map((cheeses, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("cheeses", cheeses)}
                    onChange={(event) => handleChange(event, "cheeses")}
                    name={cheeses}
                  />
                }
                label={cheeses}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["cheeses"]}</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Choose One</FormLabel>
        <FormGroup>
          {PIZZAS.TOPPINGS.map((toppings, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("toppings", toppings)}
                    onChange={(event) => handleChange(event, "toppings")}
                    name={toppings}
                  />
                }
                label={toppings}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["toppings"]}</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Choose Up To Three</FormLabel>
        <FormGroup>
          {PIZZAS.ADD_ONS.map((add_ons, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("add_ons", add_ons)}
                    onChange={(event) => handleChange(event, "add_ons")}
                    name={add_ons}
                  />
                }
                label={add_ons}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["add_ons"]}</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Choose One</FormLabel>
        <FormGroup>
          {PIZZAS.SAUCES.map((sauces, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("sauces",  sauces)}
                    onChange={(event) => handleChange(event, "sauces")}
                    name={ sauces }
                  />
                }
                label={ sauces }
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["sauces"]}</FormHelperText>
      </FormControl>
    </Box>
  );
}
