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
export default function Sodadex() {
  const drinks = ["Coke", "Fanta", "Sprite"];
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'drink',
      headerName: 'Soda Flavor',
      width: 850,
      editable: false,
    },
  ];
const rows = SODAS;

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
