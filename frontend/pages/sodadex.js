import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
import { SODAS } from "../constants/soda";
import { useAuth } from "../context/AuthenticatedUserContext";

const renderAddReviewButton = ({ row, id }, rows, setRows) => {
  return (
    <strong>
      <Button
        variant="contained"
        color={row.ifUpdated ? "primary" : "error"}
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          // Update the row update status
          row.ifUpdated = true;
        }}
      >
        {row.ifUpdated ? "Saved" : "Update"}
      </Button>
    </strong>
  );
};
const renderReviewStars = ({ row, id }, rows, setRows) => {
  // console.log('params :>> ', params);
  // const { row, id } = params
  return (
    <Rating
      name="simple-controlled"
      size="medium"
      value={row.rating}
      onChange={(event) => {
        // Update the row rating
        if (event.target.value != row.rating) {
          row.rating = event.target.value;
          row.hasTried = true;
          row.hasTriedDisp = "Yes";
        } else {
          //If the same rating is clicked, we delete this review
          row.rating = 0;
          row.hasTried = false;
          row.hasTriedDisp = "No";
          row.reviewText = "";
        }
        row.ifUpdated = false;
        // Make a copy of the rows, update the row to what was passed in
        const rowCopy = [...rows];
        rowCopy[id] = row;
        // Set the news state
        setRows(rowCopy);
      }}
    />
  );
};

const renderReviewText = ({ row, id }, rows, setRows) => {
  //const [reviewText, setReviewText] = useState("");
  return (
    <TextField
      id="outlined-multiline-flexible"
      fullWidth
      multiline
      minRows={1}
      maxRows={3}
      disabled={!row.hasTried}
      onChange={(event) => {
        // Update the row rating
        if (row.rating !== 0) {
          row.reviewText = event.target.reviewText;
        } else {
          row.reviewText = "";
        }
        const rowCopy = [...rows];
        rowCopy[id] = row;
        // Set the new state
        setRows(rowCopy);
        //setReviewText(row.reviewText);
      }}
    />
  );
};

function generateRowsFromSodas() {
  // Go through and change each hasTried to yes or no
  let rows = SODAS.map((row) => {
    row.hasTriedDisp = row.hasTried ? "Yes" : "No";
    return row;
  });

  // Add state for each of the rating numbers, comments, and ifUpdated
  rows = rows.map((row) => {
    // Set defaults for row for these properties
    row.rating = "0";
    row.comment = "";
    row.ifUpdated = true;
    return row;
  });

  return rows;
}

export default function Sodadex() {
  // const [selectionModel, setSelectionModel] = useState([]);
  const { user, setUser } = useAuth();
  const getProfilePicture = () => {
    if (user) return user.photoURL;
    else return "/static/images/avatar/2.jpg";
  };

  const getUsername = () => {
    if (user) return user.displayName;
    else return "Joe Bruin";
  };

  const [rows, setRows] = useState(generateRowsFromSodas);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "drink",
      headerName: "Soda Flavor",
      width: 200,
      editable: false,
    },
    {
      field: "hasTriedDisp",
      headerName: "Have you tried it?",
      width: 150,
      editable: false,
    },
    {
      field: "rating",
      headerName: "Your Rating",
      width: 150,
      renderCell: (params) => renderReviewStars(params, rows, setRows),
      disableClickEventBubbling: true,
    },
    {
      field: "review",
      headerName: "Your comments",
      width: 300,
      renderCell: (params) => renderReviewText(params, rows, setRows),
      disableClickEventBubbling: true,
    },
    {
      field: "postButton",
      headerName: "",
      width: 100,
      renderCell: (params) => renderAddReviewButton(params, rows, setRows),
      disableClickEventBubbling: true,
    },
  ];

  function getHasTriedIndices() {
    const indices = [];
    for (let x = 0; x < rows.length; x += 1) {
      const row = rows[x];
      if (row.hasTried) indices.push(x);
    }
    return indices;
  }

  return (
    <>
      <ResponsiveAppBar />
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
            <div></div>
            <div
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                justifyContent: "center",
              }}
            >
              <header>
                <h1>The Sodadex</h1>
                <p>Explore new flavors. Track your favorite combos!</p>
              </header>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                checkboxSelection
                selectionModel={getHasTriedIndices()}
                hideFooterSelectedRowCount
                onSelectionModelChange={(ids) => {
                  console.log(ids);
                  for (const id of ids) {
                    rows[id].hasTried = true;
                    rows[id].hasTriedDisp = "Yes";
                  }
                  setRows(rows);
                }}
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
          ></div>
        </Card>
      </div>
    </>
  );
}
