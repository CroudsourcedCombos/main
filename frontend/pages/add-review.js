import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

export default function AddReview() {
  const [value, setValue] = React.useState(2);
  const [reviewText, setreviewText] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.reviewText);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Add Review</h1>
      </div>
      <div>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          minRows={3}
          maxRows={10}
          reviewText={reviewText}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
