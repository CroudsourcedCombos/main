import * as React from "react";
import Card from "@mui/material/Card";
import { Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Modal from "@mui/material/Modal";
import ModalReviewCard from "../modal/ModalReviewCard";
import TextField from "@mui/material/TextField";
import { gql, useMutation, useQuery } from "@apollo/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GET_USER_LISTS_FOR_FOOD = gql`
  query GetUserLists($firebase_id: String!, $food_id: String!) {
    fav_foods: foods(
      where: {
        usersWithFavs: { some: { firebaseId: { equals: $firebase_id } } }
        name: { equals: $food_id }
      }
    ) {
      name
      usersWithFavs {
        name
      }
      id
    }
    to_try_foods: foods(
      where: {
        usersWantTry: { some: { firebaseId: { equals: $firebase_id } } }
        name: { equals: $food_id }
      }
    ) {
      name
      usersWantTry {
        name
      }
      id
    }
  }
`;

const TOGGLE_TRY = gql`
  mutation ToggleTry($firebase_id: String!, $food_name: String!) {
    toggleTry(food_name: $food_name, where: { firebaseId: $firebase_id }) {
      usersWantTry {
        firebaseId
        id
      }
      __typename
      id
    }
  }
`;

const TOGGLE_FAV = gql`
  mutation ToggleLiked($firebase_id: String!, $food_name: String!) {
    toggleLiked(food_name: $food_name, where: { firebaseId: $firebase_id }) {
      usersWithFavs {
        firebaseId
        id
      }
      __typename
      id
    }
  }
`;

const GET_REVIEWS = gql`
  query GetReviews($food_name: String!, $search_term: String) {
    reviews: searchReviews(
      where: { food: { is: { name: { equals: $food_name } } } }
      orderBy: [{ creationDate: asc }]
      search: $search_term
    ) {
      id
      author {
        id
        name
      }
      rating
      text
    }
  }
`;

function ModalReviews({ foodId }) {
  const [open, setOpen] = React.useState(false);
  const [search_value, set_search_value] = React.useState("");
  const { data, loading, refetch, variables } = useQuery(GET_REVIEWS, {
    variables: {
      food_name: foodId,
    },
    fetchPolicy: "cache-first",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSearch = async (event) => {
    if (event.code === "Enter") {
      await refetch({
        food_name: foodId,
        search_term: search_value !== "" ? search_value : undefined,
      });
    }
  };
  if (loading) return <div />;

  if (!data) return <Typography>No data to display</Typography>;

  return (
    <div>
      <Button onClick={handleOpen}>All Reviews</Button>
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container sx={{ maxHeight: "100%", overflow: "auto", width: "70%" }}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "white",
                width: "80%",
                marginTop: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                label="Search Reviews"
                variant="standard"
                value={search_value}
                onChange={(event) => set_search_value(event.target.value)}
                onKeyDown={handleSearch}
              />
            </Container>

            {data["reviews"].length > 0 ? (
              data["reviews"].map((datum) => {
                return (
                  <ModalReviewCard
                    key={datum["id"]}
                    reviewText={datum["text"]}
                    profilePic={"/static/images/avatar/2.jpg"}
                    stars={datum["rating"]}
                    username={datum["author"]["name"]}
                  />
                );
              })
            ) : (
              <div>No reviews!</div>
            )}
          </Container>
        </Modal>
      </Container>
    </div>
  );
}

export default function ReviewCard({
  score,
  category,
  ingredients,
  user,
  uniqueId,
}) {
  const { loading, data } = useQuery(GET_USER_LISTS_FOR_FOOD, {
    variables: {
      firebase_id: user.uid,
      food_id: uniqueId.toString(),
    },
    fetchPolicy: "cache-first",
  });
  const [toggleTry] = useMutation(TOGGLE_TRY, {
    variables: {
      firebase_id: user.uid,
      food_name: uniqueId.toString(),
    },
    refetchQueries: [GET_USER_LISTS_FOR_FOOD],
  });
  const [toggleFav] = useMutation(TOGGLE_FAV, {
    variables: {
      firebase_id: user.uid,
      food_name: uniqueId.toString(),
    },
    refetchQueries: [GET_USER_LISTS_FOR_FOOD],
  });
  if (loading) return <div />;
  if (!data)
    return (
      <Card
        sx={{ width: "100%", border: "1", margin: "10px", display: "flex" }}
      >
        <Container
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>No Data Found!</Typography>
        </Container>
      </Card>
    );

  // TODO: Check the backend for these
  const IsLiked = data["fav_foods"].length > 0;
  const AddedToList = data["to_try_foods"].length > 0;

  // Format ingredients to be all strings
  function formatIngredient(ingredients) {
    // If it's an array, format it
    if (Array.isArray(ingredients)) return titleCase(ingredients.join(", "));
    // Otherwise yield it directly
    else return titleCase(ingredients);
  }

  // Title case any strings
  // TO-DO: Move this to be shared across multiple components
  function titleCase(str) {
    if (str === "") return "";
    const words = str.split(/\s+/);
    const titleCaseArr = words.map(
      (substr) => substr[0].toUpperCase() + substr.slice(1)
    );
    return titleCaseArr.join(" ");
  }

  return (
    <Card sx={{ width: "100%", border: "1", margin: "10px", display: "flex" }}>
      <Container
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, display: "flex", justifyContent: "center" }}
            color="text.secondary"
            gutterBottom
          >
            Rated
          </Typography>
          <Typography variant="h2" component="div">
            {score}
          </Typography>
        </CardContent>
      </Container>

      <Container sx={{ width: "60%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {titleCase(category)}
          </Typography>

          {Object.keys(ingredients).map((key) => (
            <Typography
              key={key}
              sx={{ fontSize: 15 }}
              color="text.primary"
              gutterBottom
            >
              {titleCase(key)}:{" "}
              <strong>{formatIngredient(ingredients[key])}</strong>
            </Typography>
          ))}
        </CardContent>
      </Container>
      <Container
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            toggleFav();
          }}
        >
          {IsLiked ? (
            <FavoriteIcon></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon></FavoriteBorderIcon>
          )}
        </Button>
        <Button
          onClick={() => {
            toggleTry();
          }}
        >
          {AddedToList ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
        </Button>
        <ModalReviews foodId={uniqueId} />
      </Container>
    </Card>
  );
}
