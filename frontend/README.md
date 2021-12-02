# About

CrowdSourced Combos is a web app designed for UCLA students to share reviews for their favorite sandwich, pizza, and drinks from The Study! There are many different combinations of ingredients that can be picked for the sandwiches and pizzas, and this web app shows crowdsourced ratings for the different combinations of ingredients.

The frontend uses Material UI components with Next.js. 

# Getting Started

## Prerequisites

You must have the latest version of [NodeJS](https://nodejs.org/en/) installed for this project to work.

## Installation

Run the following commands:
```bash
git clone https://github.com/CroudsourcedCombos/frontend
cd frontend
npx next build
npm install
```
to set up the repository.

Add a new file `.env.local` and add required environment variables (see `.env.example` for reference) to successfully build the project.

## Running

To run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Reviews can be seen in the http://localhost:3000/ page. Reviews for pizza and sandwiches can be added by clicking on the ADD REVIEW button on the navigation bar on the top of the screen. 
Then, click on the number of stars for the review, and then write text explaining the review and the opinion on the food. Then, click the toggle with possible values SANDWICH and PIZZA and select the food type that is being reviewed.
Lastly, check the boxes corresponding to the ingredients in the food and then click post to send the review data to the server.

Reviews for soda can be added by clicking on the SODA button on the navigation bar on the top of the screen. In the row corresponding to the soda flavor that is to be reviewed, click on the number of stars for the review, and then write text explaining the review and the opinion on the soda. Finally, press the SAVED button for that row to send the soda review data to the server 

## Changing the code

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
