import Head from "next/head";
import Image from "next/image";
// import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import NavigationBar from "../components/navbar";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CheckboxesGroup from "../components/sandwichCheckboxes";
import { Box } from "@mui/system";

import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  autocompleteClasses,
} from "@mui/material";

import { useAuth } from "../context/AuthenticatedUserContext";
import PizzaCheckboxesGroup from "../components/pizzaCheckboxes";
import SandwichCheckboxesGroup from "../components/sandwichCheckboxes";

export default function AddReview() {
  const [value, setValue] = useState(2);
  const [reviewText, setReviewText] = useState("Controlled");

  const handleChange = (event) => {
    setReviewText(event.target.reviewText);
  };

  const { user, setUser } = useAuth();
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
      <NavigationBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "75%" }}>
          <CardHeader
            avatar={<Avatar alt={getUsername()} src={getProfilePicture()} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={getUsername()}
            subheader="Posting publicly"
            paddingBottom="2px"
          />

          <CardContent style={{ paddingTop: "0px" }}>
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
            <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
              <TextField
                id="filled-input-static"
                label="Food Item"
                // multiline
                fullWidth
                minRows={1}
                maxRows={2}
                reviewText={reviewText}
                onChange={handleChange}
                variant="filled"
                paddingBottom="4px"
              />
            </div>

            <div style={{ paddingTop: "8px" }}>
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
            <div style={{display: "flex", justifyContent: 'center', paddingTop: '16px'}}>
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
              {SandOrPizza == "sandwich" ? (
                <SandwichCheckboxesGroup></SandwichCheckboxesGroup>
              ) : null}
              {SandOrPizza == "pizza" ? (
                <PizzaCheckboxesGroup></PizzaCheckboxesGroup>
              ) : null}
            </div>
            {/* <PizzaCheckboxesGroup></PizzaCheckboxesGroup> */}
          </CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "10px",
              paddingBottom: "16px",
            }}
          >
            <Button size="small" color="primary">
              Post
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
