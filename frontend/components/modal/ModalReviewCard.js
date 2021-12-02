import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import CardContent from '@mui/material/CardContent';

export default function ModalReviewCard({username, profilePic, stars, reviewText}) {
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