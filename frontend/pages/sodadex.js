import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid/";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SODAS } from "../constants/soda";
import { useAuth } from "../context/AuthenticatedUserContext";
import { gql, useMutation } from "@apollo/client";
import { client } from "../apolo-client";

const CREATE_SODA_REVIEW = gql`
  mutation WriteSoda(
    $soda_id: String!
    $firebase_id: String!
    $rating: Int!
    $comment: String
  ) {
    createReview(
      data: {
        food: {
          connectOrCreate: {
            where: { name: $soda_id }
            create: { name: $soda_id, type: soda }
          }
        }
        author: { connect: { firebaseId: $firebase_id } }
        rating: $rating
        text: $comment
      }
    ) {
      food {
        id
      }
    }
  }
`;

const GET_SODAS = gql`
  query GetSoda($firebase_id: String!) {
    reviews(
      where: {
        author: { is: { firebaseId: { equals: $firebase_id } } }
        food: { is: { type: { equals: soda } } }
      }
    ) {
      food {
        name
      }
      rating
      text
    }
  }
`;

const renderAddReviewButton = (
  { row, id },
  rows,
  uid,
  setRows,
  createSodaReview
) => {
  if (row.server) return <p>Already Reviewed</p>;
  return (
    <strong>
      <Button
        variant="contained"
        color={row.ifUpdated ? "primary" : "error"}
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          if (row.rating === "0")
            return
          // Update the row update status
          row.ifUpdated = true;
          row.server = true;
          const rowCopy = [...rows];
          rowCopy[id] = row;
          // Set the news state
          setRows(rowCopy);
          createSodaReview({
            variables: {
              soda_id: row.id.toString(),
              firebase_id: uid,
              rating: parseInt(row.rating),
              comment: row.reviewText,
            },
          })
            .then((event) => console.log(event))
            .catch((e) => console.error(e));
        }}
      >
        {row.ifUpdated ? "Saved" : "Update"}
      </Button>
    </strong>
  );
};
const renderReviewStars = ({ row, id }, rows, setRows) => {
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
      value={row.reviewText}
      disabled={!row.hasTried}
      onChange={(event) => {
        // Update the row rating
        if (row.rating !== 0) {
          row.reviewText = event.target.value;
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

function generateRowsFromSodas(sodaData) {
  // Go through and change each hasTried to yes or no
  let rows = SODAS.map((row) => {
    row.hasTriedDisp = row.hasTried ? "Yes" : "No";
    row.rating = "0";
    row.reviewText = "";
    row.ifUpdated = true;
    return row;
  });

  if (sodaData !== undefined)
    // Go through and update this based on the sodaData
    sodaData["reviews"].forEach((sodaDatum) => {
      rows[sodaDatum["food"]["name"]].rating = sodaDatum["rating"];
      rows[sodaDatum["food"]["name"]].hasTriedDisp = "Yes";
      rows[sodaDatum["food"]["name"]].hasTried = true;
      rows[sodaDatum["food"]["name"]].reviewText = sodaDatum["text"];
      rows[sodaDatum["food"]["name"]].server = true;
    });

  return rows;
}

function SodaDexComponent({ user }) {
  // const [selectionModel, setSelectionModel] = useState([]);
  const [createSodaReview] = useMutation(CREATE_SODA_REVIEW);

  const getProfilePicture = () => {
    if (user) return user.photoURL;
    else return "/static/images/avatar/2.jpg";
  };

  const getUsername = () => {
    if (user) return user.displayName;
    else return "Joe Bruin";
  };

  const [rows, setRows] = useState(generateRowsFromSodas);

  useEffect(() => {
    client
      .query({
        variables: {
          firebase_id: user.uid,
        },
        query: GET_SODAS,
      })
      .then((data) => setRows(generateRowsFromSodas(data["data"])));
  }, [user.uid]);

  let columns = [];
  if (user)
    columns = [
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
        width: 150,
        renderCell: (params) =>
          renderAddReviewButton(
            params,
            rows,
            user.uid,
            setRows,
            createSodaReview
          ),
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
            <div />
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
            <div style={{ height: 640, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disablecheckboxSelection
                disableColumnMenu
                disableColumnFilter
                selectionModel={getHasTriedIndices()}
                hideFooterSelectedRowCount
                onSelectionModelChange={(ids) => {
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
          />
        </Card>
      </div>
    </>
  );
}

export default function Sodadex() {
  const { user, setUser } = useAuth();
  if (user) return <SodaDexComponent user={user} />;
  return <div />;
}
