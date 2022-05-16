# DEPT OpenAQ Tech Test

This is my approach to the tech test provided by DEPT.

## Development
```bash
npm run dev
# or
yarn dev
```
Main page is located at `pages/index.js`.
App will be running at [http://localhost:3000](http://localhost:3000).



## Deploy on Vercel
This app is easily deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Comments

- Given more time, would prefer to use Typescript
- If there were more components I would create a `components` folder at the top level, so that the components used in `pages/_app.js` would be located in their own directories files. i.e. `components/OpenAQ/Card` or something similar. Seemed unecessary for this task due to the number of components used, also file overhead, unecessary imports etc.
- Would be cool to figure out a way to auto map the Swagger API with params to JS, but as I understand you need the `swagger.config.json`
- I removed the last updated heading on the card, cards seeemed to show locations whereas the last updated value was on the city.
- Added a loading spinner, wasn't in the spec but thought it would provide some feedback when API is slow.