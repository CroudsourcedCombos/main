import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
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
import { Button } from "@mui/material";

export default function AddReview() {
  const [value, setValue] = React.useState(2);
  const [reviewText, setreviewText] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.reviewText);
  };

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{ width: "75%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Username"
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
            <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
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

            <div style={{paddingTop: '8px'}}>
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
