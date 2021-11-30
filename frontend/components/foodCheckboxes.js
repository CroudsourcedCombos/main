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

const Foods = {
  BREADS: ["Country Loaf", "Wheat Torpedo Hoagie Roll", "Whole Wheat Bread"],
  CHEESES: [
    "Cheddar Cheese",
    "Mozzarella Cheese",
    "Provolone Cheese",
    "Vegan Cheddar Cheese",
    "None",
  ],
  TOPPINGS: [
    "Avocado Pulp",
    "Bacon",
    "Black Forest Ham",
    "Egg Salad",
    "Grilled Rosemary Chicken Breast",
    "Pepperoni",
    "Prosciutto",
    "Roast Beef",
    "Turkey",
  ],
  ADD_ONS: [
    "Baby Spinach",
    "Cucumber",
    "Mixed Peppers",
    "Pepperoncini",
    "Pickles",
    "Red Onion",
    "Romaine Lettuce",
    "Sliced Black Olives",
    "Sliced Jalepeno",
    "Tomatoes",
  ],
  SPREADS: [
    "Balsamic Vinegar",
    "Mayonnaise",
    "Mustard",
    "Olive Oil",
    "Olive Salad",
    "Pesto Sauce",
    "Red Wine Vinegar",
    "Sun Dried Tomato Pesto",
  ],
};

const ReviewRequirements = {
  breads: [1, 1],
  cheeses: [0, 1],
  toppings: [0, 2],
  add_ons: [0, 3],
  spreads: [0, 2],
};

export default function CheckboxesGroup() {
  const [state, setState] = useState({
    breads: [],
    cheeses: [],
    toppings: [],
    add_ons: [],
    spreads: [],
  });
  const [error, setError] = useState({
    breads: "You must pick at least 1 bread.",
    cheeses: "",
    toppings: "",
    add_ons: "",
    spreads: "",
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
    const [min, max] = ReviewRequirements[type];
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

  // const { Avocado_Pulp, Bacon, Black_Forest_Ham } = state;
  // const error =
  //   [Avocado_Pulp, Bacon, Black_Forest_Ham].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick One</FormLabel>
        <FormGroup>
          {Foods.BREADS.map((bread, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("breads", bread)}
                    onChange={(event) => handleChange(event, "breads")}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["breads"]}</FormHelperText>
      </FormControl>

      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick Two</FormLabel>
        <FormGroup>
          {Foods.CHEESES.map((cheeses, index) => {
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
        <FormLabel component="legend">Choose Up to Two</FormLabel>
        <FormGroup>
          {Foods.TOPPINGS.map((toppings, index) => {
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
          {Foods.ADD_ONS.map((add_ons, index) => {
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
        <FormLabel component="legend">Pick Two</FormLabel>
        <FormGroup>
          {Foods.SPREADS.map((spreads, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkExists("spreads",  spreads)}
                    onChange={(event) => handleChange(event, "spreads")}
                    name={ spreads }
                  />
                }
                label={ spreads }
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{error["spreads"]}</FormHelperText>
      </FormControl>
    </Box>
  );
}
