# Authentication Server / Module

An Express/Node.js based server using a custom "authentication" module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom "authorization" module that will grant/deny users access to the server based on their role or permissions level.

## Business Requirements

Our business is expanding! We have a real need to manage a list of users of many types, and control their access to our data accordingly. The system to be built will have the following core features:

1. Users can create an account, associated with a "role"
1. User Roles will be pre-defined and will each have a list of allowed capabilities
   - `admin` can read, create, update, delete
   - `editor` can read, create, update
   - `writer` can read, create
   - `user` can read
1. Users can then login with a valid username and password
1. Alternatively, users can login using an OAuth provider such as **Google** or **GitHub**
   - In this case, users should be automatically assigned the role of `user`
1. Once logged in, Users can then access any route on the server, so long as they are permitted by the capabilities that match their role.
   - For example, a route that deletes records should only work if your user role is "admin"

## Technical Requirements

The application will be created with the following overall architecture and methodologies

1. Node.js
1. ES6 Classes and best practices
1. ExpressJS Web Server, built modularly
   - "Auth" routes for handling the login and authentication system
     - POST `/signup` to create an account
     - POST `/signin` to login with Basic Auth
     - GET `/oauth`
   - Middleware for handling 404 and 500 conditions
   - Middleware for handling each type of authentication
     - Basic (username + password) to be used on the `/signin` route only
       - i.e. `app.post('/signin', basicAuthentication, (req, res) => { ... })`
     - OAuth (3rd Party) to be used on the `/oauth` route only
       - i.e. `app.get('/oauth', OAuth, (req, res) => { ... })`
       - Handles the handshake process from a 3rd party OAuth system
     - Bearer (token) to be used on any other route in the server that requires a logged in user
       - i.e. `app.get('/secretstuff', tokenAuthentication, (req, res) => { ... })`
   - Middleware for handling authorization
     - To be run after Bearer Middleware on routes to be protected
     - Accepts a "capability" as a parameter
     - i.e. `app.delete('/secretstuff', tokenAuthRequired, capability('delete'), (req, res) => { ... })`
1. User Persistence using a Mongo Database (NoSQL)
   - Mongoose Schemas (data models) to define and model data
1. Test Driven Development, using Jest
   - Tests will be runnable locally
   - Tests will auto-execute (CI) in your repo using GitHub actions
   - Tests will use a 3rd party library called `supergoose` to:
     - "mock" the mongo running database
     - "mock" the running Express server
1. Deployment to Heroku

### Data Model

We will need to store user information into our system permanently. Use following fields/data types

#### Users

- username: Type: String, Required
- password: Type: String, Required
- email: Type: String
- fullname: Type: String
- role: Type: String, must be one of: admin, editor, writer, user

### Application Structure (proposed)

> NOTE: The majority of our work for this server will be done within the `src/auth` folder. The rest of the system should be generic express. Why? It's our intention to be able to "lift" the `auth` folder and "drop" it into any other server (such as our API server) and be able to use authorization to "protect" those CRUD routes. This makes our entire auth system very modular. Think of `index.js` and `server.js` as nothing more than the basics to get a server started, with 100% of the actual logic living within the `auth` module

```text
├── .gitignore
├── .eslintrc.json
├── __tests__
│   ├── auth.router.test.js
│   ├── basic-auth.test.js
│   ├── bearer-auth.test.js
│   ├── 500.test.js
│   ├── model-finder.test.js
│   ├── mongo.js
├── src
│   ├── auth
│   │   ├── router.js
│   │   ├── middleware
│   │   │   ├── basic.js
│   │   │   ├── bearer.js
│   │   │   ├── oauth.js
│   │   ├── models
│   │   │   ├── users-model.js
│   ├── middleware
│   │   ├── 404.js
│   │   ├── 500.js
│   │   ├── model-finder.js
│   ├── server.js
├── index.js
└── package.json
```

### I/O Examples

#### Signup

The signup process will require a POST request to the `/signup` route.

- This route should accept a request body in either JSON or form/urlencoded formats.

POST <http://yourauthserver.com/signup>

```javascript
  {
    "username":"awesomecoder",
    "password":"youcantguessthis33!",
    "fullname":"Awesome Coder",
    "email":"awesome@coders.com"
  }
```

Output from the server:

HTTP Headers:

```bash
Set-Cookie: auth=ENCRYPTED.JWT.TOKEN; Path=/
token:ENCRYPTED.JWT.TOKEN
Content-Type: application/json
```

BODY:

```javascript
{
    "token": "ENCRYPTED.JWT.TOKEN",
    "user": {
        "__v": 0,
        "_id": "5ec44dcde458f14f77b3d8c6",
        "acl": [],
        "password": "$2b$10$Bw5tNNSUACEEHW94CaRItuLsoz/nomUMh4eLTD/T23Ks0mCtUp3Iq",
        "role": "user",
        "username": "awesomecoder"
    }
}
```

#### Sign In (Basic Auth)

The Basic Authentication processes is initiated by invoking a POST on your `/oauth` route with a Basic Authorization header.  The **Basic Auth Middleware** should at this point validate the user account in our database, and return an object with a re-authentication/bearer token and the user object or an error object

POST <http://yourauthserver.com/signin>

Send Basic Authentication Header

```Authorization: Basic encodedpasswordcombo```

- With `httpie` from the command line: `-a awesomecoder:youcantguessthis33!`
- With postman, use "Basic Auth" and set the username and password
- From a website that has a login form, using Basic Auth, enter the username and password
- Query String and Request Body shall be ignored

Output from the server:

SUCCESSFUL LOGIN:

HTTP Headers:

```bash
Set-Cookie: auth=ENCRYPTED.JWT.TOKEN; Path=/
token:ENCRYPTED.JWT.TOKEN
Content-Type: application/json
```

RESPONSE BODY:

```javascript
{
    "token": "ENCRYPTED.JWT.TOKEN",
    "user": {
        "acl": [],
        "username": "awesomecoder"
    }
}
```

ERROR RESPONSE:

Status Code: 500

```javascript
{
    "error": "Invalid Login"
}
```

#### Sign In (OAuth)

The OAuth processes is initiated in the browser, using a 3rd party authentication/authorization service. It will, once the user has granted permission, invoke a GET on your `/oauth` route.  The OAuth middleware should at this point complete the handshaking process, create/update a local user account in our database, and return an object with a re-authentication/bearer token and the user object

GET <http://yourauthserver.com/oauth>

Output from the server should be the same as with **Basic Authentication":

#### Re-Authentication (Bearer Auth)

POST <http://yourauthserver.com/signin>

Send Basic Authentication Header

```Authorization: Basic encodedpasswordcombo```

- With `httpie` from the command line: `-a awesomecoder:youcantguessthis33!`
- With postman, use "Basic Auth" and set the username and password
- From a website that has a login form, using Basic Auth, enter the username and password
- Query String and Request Body shall be ignored

Output from the server:

HTTP Headers:

```bash
Set-Cookie: auth=ENCRYPTED.JWT.TOKEN; Path=/
token:ENCRYPTED.JWT.TOKEN
Content-Type: application/json
```

BODY:

```javascript
{
    "token": "ENCRYPTED.JWT.TOKEN",
    "user": {
        "acl": [],
        "username": "awesomecoder"
    }
}
```

#### Bearer Authentication

Re-Authentication can be achieved on any route in the express server, not just the authentication routes.

For example, assume we want to require that a user be logged in, in order to access a route:

From the browser (or agent): GET <http://myapi.com/api/v1/food>, along with a Bearer Token in the header

On the server, this is handled in a delete route definition and handler

```javascript
app.get('/api/v1/food', tokenAuthentication, (req, res) => {...});
```

1. First, the tokenAuthentication middleware will re-authenticate the user
1. If the token is valid (the user is good), the route handler will execute as it normally would
1. If the token is invalid, or the capability is not present for the user, the system should respond with a standard error

```javascript
{
  error: "Access Denied"
}
```

#### Authorization

Authorization can be achieved on any route in the express server, not just the authentication routes. Authorization happens **after authentication** and should match the user's capabilities with the permissions required.

For example, assume we want to delete record number 12345 from our food database using our REST API

From the browser (or agent): DELETE <http://myapi.com/api/v1/food/12345>, along with a Bearer Token

On the server, this is handled in a delete route definition and handler

```javascript
app.delete('/api/v1/food', tokenAuthentication, capabilities('delete'), (req, res) => {...});
```

1. First, the tokenAuthentication middleware will re-authenticate the user
1. If the user's token is valid, the capabilities middleware will run
1. If the user's role allows them to (in this case) "delete", the actual route handler will run
1. At any time, if the token is invalid, or the capability is not present for the user, the system should respond with a standard error:

```javascript
{
  error: "Access Denied"
}
```

## Development Process, Milestones

1. **Phase 1: Basic Authentication**
   - Create a basic express server with the following features:
     - Users Model (Mongoose Schema)
     - `/signup` route that creates a user
     - `/signin` route that attempts to log a user in
     - `BasicAuth` middleware that validates the user as a part of the `/signin` process
   - Implement: Modularize and Test a starter server

1. **Phase 2: Bearer Authentication**
   - Re-Authenticate Users
   - Accepts a TOKEN in the **Authorization: Bearer** header
   - Validates the user
   - Allows or Denies access to the route handler
   - Implement: Debug, Extend Token Security
1. **Phase 3: Authorization**
   - Role Based Authorization System
   - Combines the Bearer Token with User roles to give fine grained access control
   - Implement: Protect API Routes, Write tests
