# Croudsourced Combos

## Getting Started
The components of the project are split up into two folders, one for the backend and one for the frontend. We'll start with the backend:

### Backend
This requires running the database, which takes a decent bit of manual configuration. No prob tho we can do it! 
(this isn't in a shell script because some of these can be a bit tempermental and require manual troubleshooting or configuration choices)
1. `cd backend` to get into the right folder for all these commands
2. `npm i` to get everything you need installed and generate important prisma information you will need to build. Wait for this to continue.
3. `docker compose up` to start up the database. Wait for this to finish before continuing.
4. `npm run reset-seed` to 1) nuke the database to a clean slate (not important here but useful in other cases) 2) update the database to reflect the status of the schema 3) load seed data into the database
5. `npm run build` to build the typescript files to js to be ran with node
6. `npm run start` to start the server and you're good to go!

For an interactive API playground, go to http://localhost:4000

Note: Make sure there are no other instances of this backend running on the same machine, as duplicates will have issues running due to using the same host.

### Frontend
Now we can start up the frontend! Open a new terminal and do the following:
1. `cd frontend` to navigate to the frontend folder
2. `npm i` to install everything. This one takes a bit! NextJS is pretty thicc
3. `npm run build` to create an optimized production build of the nextjs app. This can also take a minute or two as well.
4. `npm run start` to start the compiled app. You're good to go!

## How to use
Reviews can be seen in the http://localhost:3000/ page. Reviews for pizza and sandwiches can be added by clicking on the ADD REVIEW button on the navigation bar on the top of the screen. 
Then, click on the number of stars for the review, and then write text explaining the review and the opinion on the food. Then, click the toggle with possible values SANDWICH and PIZZA and select the food type that is being reviewed.
Lastly, check the boxes corresponding to the ingredients in the food and then click post to send the review data to the server.

Reviews for soda can be added by clicking on the SODA button on the navigation bar on the top of the screen. In the row corresponding to the soda flavor that is to be reviewed, click on the number of stars for the review, and then write text explaining the review and the opinion on the soda. Finally, press the SAVED button for that row to send the soda review data to the server.

On the homepage, which can be accessed by clicking on the Crowdsourced Combos button on the navigation bar on the top left of the screen, the reviews can be seen and filtered.
By default, the left column shows reviews for pizzas and sandwiches and the right column shows soda reviews. 
The toggle in the center top of the page which has the three options SANDWICH, PIZZA, ALL TYPES allows filtering of the left column to just show sandwich reviews, pizza reviews, or a combination of both for ALL TYPES which does not filter by food type. 
There is another toggle in the center top of the page with options PAST WEEK and ALL TIME and this allows filtering of both columns based on the time of the review post. PAST WEEK limits only reviews to show up if it was posted in the last week while ALL TIME doesn't filter by time at all.

## Side Notes
An early figma design is in design_plan.pdf. There were major changes since then but it was foundational in our application's final design.

## Group Member Names:
Raj Piskala
Siddhant Gupta
Julie Cover
Sidharth Reddy Patllollu
Raj Kumar
