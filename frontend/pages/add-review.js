// import * as React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import { useAuth } from "../context/AuthenticatedUserContext";
import NavigationBar from "../components/navbar";
import SandwichCheckboxesGroup from "../components/sandwichCheckboxes";
import PizzaCheckboxesGroup from "../components/pizzaCheckboxes";

export default function AddReview() {
  const [value, setValue] = useState(2);
  const [reviewText, setReviewText] = useState("");

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const {user, setUser} = useAuth();
  const getProfilePicture = () => {
    if (user) return user.photoURL;
    else return "/static/images/avatar/2.jpg";
  };

  const getUsername = () => {
    if (user) return user.displayName;
    else return "Joe Bruin";
  };

  const [SandOrPizza, setSandOrPizza] = useState("sandwich");

  const handleChangeSandOrPizza = (event, newSelectionSandOrPizza) => {
    if (newSelectionSandOrPizza !== null)
      setSandOrPizza(newSelectionSandOrPizza);
    console.log(newSelectionSandOrPizza);
  };

  

  return (
    <>
      <NavigationBar/>
      <div
        style={{display: "flex", justifyContent: "center", paddingTop: '8px'}}>
        <Card style={{width: "75%"}}>
          <CardHeader
            avatar={<Avatar alt={getUsername()} src={getProfilePicture()}/>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon/>
              </IconButton>
            }
            title={getUsername()}
            subheader="Posting publicly"
            paddingBottom="2px"
          />

          <CardContent style={{paddingTop: "0px"}}>
            <div>
              <Rating
                name="simple-controlled"
                size="large"
                // paddingTop="2px"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>

            <div style={{paddingTop: "8px"}}>
              <TextField
                id="outlined-multiline-flexible"
                label="Share rating details"
                multiline
                fullWidth
                minRows={3}
                maxRows={10}
                reviewText={reviewText}
                onChange={handleChange}
                variant="filled"
                // paddingBottom='8px'
                // style={{padding: '10px 10px 10px 10px'}}
              />
            </div>
            <div style={{
              display: "flex",
              justifyContent: 'center',
              paddingTop: '16px'
            }}>
              <ToggleButtonGroup
                // color="primary"
                value={SandOrPizza}
                exclusive
                onChange={handleChangeSandOrPizza}
              >
                <ToggleButton value="sandwich">Sandwich</ToggleButton>
                <ToggleButton value="pizza">Pizza</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div>
              {SandOrPizza === "sandwich" ? (
                <SandwichCheckboxesGroup reviewText={reviewText} rating={value}/>
              ) : null}
              {SandOrPizza === "pizza" ? (
                <PizzaCheckboxesGroup reviewText={reviewText} rating={value}/>
              ) : null}
            </div>
          </CardContent>

        </Card>
      </div>
    </>
  );
}
