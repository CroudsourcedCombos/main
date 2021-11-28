import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

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

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    Avocado_Pulp: true,
    Bacon: false,
    Black_Forest_Ham: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Avocado_Pulp, Bacon, Black_Forest_Ham } = state;
  const error =
    [Avocado_Pulp, Bacon, Black_Forest_Ham].filter((v) => v).length !== 2;

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
                    checked={bread}
                    onChange={handleChange}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>

      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          {Foods.CHEESES.map((bread, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={bread}
                    onChange={handleChange}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
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
          {Foods.TOPPINGS.map((bread, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={bread}
                    onChange={handleChange}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
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
          {Foods.ADD_ONS.map((bread, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={bread}
                    onChange={handleChange}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          {Foods.SPREADS.map((bread, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={bread}
                    onChange={handleChange}
                    name={bread}
                  />
                }
                label={bread}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
}
