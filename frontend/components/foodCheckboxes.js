import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxesGroup() {
  const Bread = ["Country Loaf", "Wheat Torpedo Hoagie Roll", "Whole Wheat Bread"]
  const Cheese = ["Cheddar Cheese", "Mozzarella Cheese", "Provolone Cheese", "Vegan Cheddar Cheese", "None"]
  const Toppings = ["Avocado Pulp", "Bacon", "Black Forest Ham", "Egg Salad", "Grilled Rosemary Chicken Breast", 
    "Pepperoni", "Prosciutto", "Roast Beef", "Turkey"];
  const Add_Ons=["Baby Spinach", "Cucumber", "Mixed Peppers", "Pepperoncini", "Pickles", "Red Onion", "Romaine Lettuce",
    "Sliced Black Olives", "Sliced Jalepeno", "Tomatoes"];
  const Spreads_and_Condiments =["Balsamic Vinegar", "Mayonnaise", "Mustard", "Olive Oil", "Olive Salad", "Pesto Sauce",
    "Red Wine Vinegar", "Sun Dried Tomato Pesto"]
  

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
      {/* <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Avocado_Pulp} onChange={handleChange} name="Avocado_Pulp" />
            }
            label="Avocado_Pulp Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Bacon} onChange={handleChange} name="Bacon" />
            }
            label="Bacon Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Black_Forest_Ham} onChange={handleChange} name="Black_Forest_Ham" />
            }
            label="Black_Forest_Ham Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl> */}
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          {}
          <FormControlLabel
            control={
              <Checkbox
                checked={Avocado_Pulp}
                onChange={handleChange}
                name="Avocado_Pulp"
              />
            }
            label="Avocado_Pulp"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Bacon} onChange={handleChange} name="Bacon" />
            }
            label="Bacon"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Black_Forest_Ham}
                onChange={handleChange}
                name="Black_Forest_Ham"
              />
            }
            label="Black_Forest_Ham"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
}
