import * as React from 'react';
import {SODAS} from '../../constants/soda'
import ReviewCard from "./reviewcard";
import {useAuth} from "../../context/AuthenticatedUserContext";


export default function SodaReviewCard({score, category, id}) {
  const {user} = useAuth();
  if (user) {
    const data = SODAS[id]
    return (
      <ReviewCard score={score} category={category}
                  ingredients={{soda: data["drink"]}} uniqueId={id} user={user}/>
    );
  }
  return <div/>
}


