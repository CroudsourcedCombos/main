import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SampleModalReviews = [
  {
  username: "Joe Bruin",
  profilePic: "/static/images/avatar/2.jpg",
  stars: 5,
  reviewText: "I thought this would be bad. I was right",
},
{
  username: "Jo Brooin",
  profilePic: "/static/images/avatar/2.jpg",
  stars: 3,
  reviewText: "This was good. Very good.",
}, 
{
  username: "Go Brueyn",
  profilePic: "/static/images/avatar/2.jpg",
  stars: 1,
  reviewText: "No",
}, 
]




function ModalReviewCard({username, profilePic, stars, reviewText}) {
  return (<div style={{ display: "flex", justifyContent: "center", padding: '8px' }}>
        <Card sx = {{width : "100%"}}>
          <CardHeader
            avatar={<Avatar alt={username} src={profilePic} />}
            title={username}
            subheader="Posting publicly"
            paddingBottom="2px"
          />

          <CardContent style={{ paddingTop: "0px" }}>
            <div>
              <Rating
                name="simple-controlled"
                size="large"
                value={stars}
                readOnly = "true"
              />
            </div>
            <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
              {reviewText}
            </div>
          </CardContent>
          
        </Card>
      </div>)
}




function ModalReview() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>All Reviews</Button>
      {/* <Container> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx = {{maxHeight: '100%', overflow : "auto", width: "70%"}}>
        <ModalReviewCard {...SampleModalReviews[0]}></ModalReviewCard>
        <ModalReviewCard {...SampleModalReviews[1]}></ModalReviewCard>
        <ModalReviewCard {...SampleModalReviews[2]}></ModalReviewCard>
        <ModalReviewCard {...SampleModalReviews[1]}></ModalReviewCard>
        <ModalReviewCard {...SampleModalReviews[2]}></ModalReviewCard>
        <ModalReviewCard {...SampleModalReviews[0]}></ModalReviewCard>
        </Container>
      </Modal>
      {/* </Container> */}
    </div>
  );
}




export default function ReviewCard({ score, category, ingredients }) {
  
    const [IsLiked, setIsLiked] = React.useState(false)
    const [AddedToList, setAddedToList] = React.useState(false)
  
  // Format ingredients to be all strings
    function formatIngredient(ingredients) {
      // If it's an array, format it
      if (Array.isArray(ingredients)) return titleCase(ingredients.join(', '))
      // Otherwise yield it directly
      else return titleCase(ingredients)
    }

    // Title case any strings
    // TO-DO: Move this to be shared across multiple components
    function titleCase(str) {
      const words = str.split(/\s+/)
      const titleCaseArr = words.map(substr => substr[0].toUpperCase() + substr.slice(1))
      return titleCaseArr.join(' ')
    }
    
    return (
    <Card sx={{ width: "100%", border: "1", margin: "10px", display: "flex"}}>
      
      <Container sx = {{width: "20%",display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CardContent>
              <Typography sx={{ fontSize: 14, display: "flex", justifyContent: "center"}} color="text.secondary" gutterBottom>
              Rated
              </Typography>
              <Typography variant="h2" component="div">
              {score}
              </Typography>
          </CardContent>
        </Container>
      
      <Container sx = {{width: "60%"}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {category}
            </Typography>
            
            {Object.keys(ingredients).map((key) => (<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                {titleCase(key)}: <strong>{formatIngredient(ingredients[key])}</strong>
              </Typography>)
            )}
            
            
          </CardContent>
      </Container>
      <Container sx = {{width: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Button onClick = {() => {setIsLiked(!IsLiked)}}>
          {IsLiked ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
        </Button>
        <Button onClick = {() => {setAddedToList(!AddedToList)}}>
          {AddedToList ? <PlaylistAddCheckIcon></PlaylistAddCheckIcon> : <PlaylistAddIcon></PlaylistAddIcon>}
        </Button>
        <ModalReview></ModalReview>
      </Container>
      
    </Card>
  );
}