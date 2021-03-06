// import * as React from "react";
import {useState} from "react";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import {Button} from "@mui/material";
import {gql, useMutation} from "@apollo/client";
import { useRouter } from 'next/router'
import Typography from "@mui/material/Typography";

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

const CREATE_SANDWICH_REVIEW = gql`
    mutation CreateSandwichReview(
        $name: String!,
        $rating: Int!,
        $text: String!,
        $firebase_id: String!
    ) {
        createReview(data: {
            author: {
                connect: {
                    firebaseId: $firebase_id
                }
            }
            food: {
                connectOrCreate: {
                    where: {
                        name: $name
                    }
                    create: {
                        name: $name
                        type: pizza
                    }
                }
            }
            rating: $rating
            text: $text
        }) {
            rating
        }
    }
`

const ReviewRequirements = {
  breads: [1, 1],
  cheeses: [0, 1],
  toppings: [0, 2],
  add_ons: [0, 3],
  spreads: [0, 2],
};

export default function SandwichCheckboxesGroup({rating, reviewtext, user}) {
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

  const [sent, setSent] = useState(false)
  const [addSandwich, {called, reset}] = useMutation(CREATE_SANDWICH_REVIEW);
  const router = useRouter()

  const handleChange = (event, type) => {
    // If it's already in the object, then remove the matching ingredient
    const copy = {...state};
    if (copy[type].includes(event.target.name)) {
      copy[type] = copy[type].filter(
        (ingredient) => ingredient !== event.target.name
      );
    }

    // Otherwise push it to the object
    else {
      copy[type].push(event.target.name);
      copy[type] = copy[type].sort();
    }

    // Check if the length is between min and max
    const [min, max] = ReviewRequirements[type];
    const len = copy[type].length;

    // Set the error based on if it's lower than min or higher than max
    const errCopy = {...error};
    if (len < min) errCopy[type] = `You must pick at least ${min} ${type}.`;
    else if (len > max) errCopy[type] = `You can pick up to ${max} ${type}.`;
    else errCopy[type] = ``;

    setState(copy);
    setError(errCopy);
  };

  function checkExists(type, target) {
    return state[type].includes(target);
  }

  const post = () => {
    // if (!errors)
    const errCopy = {...error};

    const hasNonEmptyStrings =
      Object.values(errCopy).filter((x) => x.length > 0).length > 0;

    if (hasNonEmptyStrings)
      console.log("errors, will not stringify")
    else {
      const copy = {...state}
      const reviewDataStr = JSON.stringify(copy);
      addSandwich({
        variables: {
          name: reviewDataStr,
          rating: rating,
          text: reviewtext,
          firebase_id: user.uid,
        },
      })
        .then(res => {
          // Set the button to success
          setSent(true)

          // Refresh the page
          setTimeout(() => router.reload(), 2000)
        })
        .catch(reason => console.error(reason))
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Choose One</FormLabel>
          <FormGroup>
            {Foods.BREADS.map((bread, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkExists('breads', bread)}
                      onChange={event => handleChange(event, 'breads')}
                      name={bread}
                    />
                  }
                  label={bread}
                />
              )
            })}
          </FormGroup>
          <FormHelperText>{error['breads']}</FormHelperText>
        </FormControl>

        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Choose Up To One</FormLabel>
          <FormGroup>
            {Foods.CHEESES.map((cheeses, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkExists('cheeses', cheeses)}
                      onChange={event => handleChange(event, 'cheeses')}
                      name={cheeses}
                    />
                  }
                  label={cheeses}
                />
              )
            })}
          </FormGroup>
          <FormHelperText>{error['cheeses']}</FormHelperText>
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
                      checked={checkExists('toppings', toppings)}
                      onChange={event => handleChange(event, 'toppings')}
                      name={toppings}
                    />
                  }
                  label={toppings}
                />
              )
            })}
          </FormGroup>
          <FormHelperText>{error['toppings']}</FormHelperText>
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
                      checked={checkExists('add_ons', add_ons)}
                      onChange={event => handleChange(event, 'add_ons')}
                      name={add_ons}
                    />
                  }
                  label={add_ons}
                />
              )
            })}
          </FormGroup>
          <FormHelperText>{error['add_ons']}</FormHelperText>
        </FormControl>
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Choose Up To Two</FormLabel>
          <FormGroup>
            {Foods.SPREADS.map((spreads, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkExists('spreads', spreads)}
                      onChange={event => handleChange(event, 'spreads')}
                      name={spreads}
                    />
                  }
                  label={spreads}
                />
              )
            })}
          </FormGroup>
          <FormHelperText>{error['spreads']}</FormHelperText>
        </FormControl>
      </Box>
      <Box>
        {sent ? (
          <Typography align="center" variant="body1" component="p">
            Success!
          </Typography>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '10px',
              paddingBottom: '16px',
            }}
          >
            <Button size="small" color="primary" onClick={post}>
              Post
            </Button>
          </div>
        )}
      </Box>
    </>
  )
}
