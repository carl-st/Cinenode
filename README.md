# Cinenode
Example of a simple Node.js application with Express and MongoDB.
 
## Setup ##
**Make sure you have the newest Node and NPM already installed.**
### Dependencies installation
```bash
$ npm install

```
### Build application
```bash
$ npm grunt
```

### Start Express back-end
```bash
$ npm start
```

# Other commands

### Start and watch application using nodemon in dev environment
```bash
$ npm run dev
```

### Run tests
```bash
$ npm test
```

# Setting default environment
See `config.json` and set the `ENV` field to `development`, `testing` or `production`.


# Endpoints and functionality
* POST /movies
    * Based on passed title, all movie details are fetched from OMDb API and saved to application database.
    * Request body: `{ "title": string }`
* GET /movies
    * Fetches list of all movies already present in application database.
    * Optional params: `sortBy = string`, `desc = boolean`
* POST /comments
    * Adds a comment to given movie id
    * Request body: `{ "movie": string, "content": string }`
* GET /comments
    * Fetches list of all comments present in application database
* GET /comments/movie
    * Fetches list of all comments for given movie id.
    * Params: `id = string`
