import { useState } from 'react'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
import { styled } from "@mui/material/styles";
import { TableRow } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
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
import { SODAS } from '../constants/soda';

const renderAddReviewButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="error"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                console.log(params);
                  console.log("Review Button clicked.")
              }}
          >
              {false?"Saved":"Update"}
          </Button>
      </strong>
  )
}
const renderReviewStars = (params) => {
return(
  <Rating
  name="simple-controlled"
  size="medium"
  onChange={handleReviewChange}
  />
  )
}

const renderReviewText = (params) => {
  return(
    <TextField
      id="outlined-multiline-flexible"
      fullWidth
      multiline
      minRows={1}
      maxRows={3}
      variant="filled"
  />
  )
}
const handleReviewChange = (params)=>{

}
const drinks = ["Coke", "Fanta", "Sprite"];
const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'drink',
    headerName: 'Soda Flavor',
    width: 200,
    editable: false,
  },
  {
    field: 'hasTriedDisp',
    headerName: 'Have you tried it?',
    width: 150,
    editable: false,
  },
  {
    field: 'rating',
    headerName: 'Your Rating',
    width:150,
    renderCell: renderReviewStars,
    disableClickEventBubbling: true,  
  },  
  {
    field: 'review',
    headerName: 'Your comments',
    width:300,
    renderCell: renderReviewText,
    disableClickEventBubbling: true,  
  },  
  {
    field: 'postButton',
    headerName: '',
    width:100,
    renderCell: renderAddReviewButton,
    disableClickEventBubbling: true,  
  },  
];

function generateRowsFromSodas() {
  // Go through and change each hasTried to yes or no
  let rows = SODAS.map(row => {
    row.hasTriedDisp = row.hasTried ? 'Yes' : 'No'
    return row
  })

  // Add state for each of the rating numbers, comments, and ifUpdated
  rows = rows.map(row => {
    // Set defaults for row for these properties
    row.rating = 0
    row.comment = ''
    row.ifUpdated = false
    return row
  })

  return rows
}


export default function Sodadex() {
  // const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState(generateRowsFromSodas)
  console.log(rows);

  function getHasTriedIndices() {
    // console.log('tried indices', rows)
    const indices = []
    for (let x = 0; x < rows.length; x += 1) {
      const row = rows[x]
      if (row.hasTried) indices.push(x)
    }
    return indices
  }

  return (
    <>
      <ResponsiveAppBar />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{ width: "75%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                T
              </Avatar>
            }
            title="Username here"
            paddingBottom="2px"
          />

          <CardContent style={{ paddingTop: "0px" }}>
            <div>
            </div>
            <div style={{paddingTop: '8px', paddingBottom: '8px', justifyContent: 'center'}}>
            <header>
              <h1 >The Sodadex</h1>
              <p>Explore new flavors. Track your favorite combos!</p>
            </header>
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                checkboxSelection
                selectionModel={getHasTriedIndices()}
                hideFooterSelectedRowCount
                onSelectionModelChange={
                  (ids) => {
                    console.log(ids)
                    for (const id of ids) {
                      rows[id].hasTried = true;
                      rows[id].hasTriedDisp = 'Yes';
                    }
                    setRows(rows);
                  }
                }
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
          </div>
        </Card>
      </div>
    </>
  );
}
