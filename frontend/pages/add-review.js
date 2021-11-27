import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function AddReview() {
  const [value, setValue] = React.useState(2);
  const [reviewText, setreviewText] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.reviewText);
  };

  return (
    <>
    
      <ResponsiveAppBar></ResponsiveAppBar>
      <Card>
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
      />
      <CardContent>
      {/* <div className={styles.container}>
        <h1>Add Review</h1>
      </div> */}


      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Share rating details"
          multiline
          fullWidth
          minRows={3}
          maxRows={10}
          reviewText={reviewText}
          onChange={handleChange}
        />
      </div>
      </CardContent>
      </Card>
    </>
  );
}
