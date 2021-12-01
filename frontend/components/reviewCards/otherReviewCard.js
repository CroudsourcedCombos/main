import * as React from 'react';
import ReviewCard from "./reviewcard";
import {useAuth} from "../../context/AuthenticatedUserContext";


export default function FoodReviewCard({score, category, name}) {
  const {user} = useAuth();
  console.log(user)
  if (user) {
    const ingredients = JSON.parse(name)
    return <ReviewCard ingredients={ingredients} score={score}
                       category={category} uniqueId={name} user={user}/>
  }
  return <div/>
}


