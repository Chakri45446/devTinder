- Read

- what are dependencies and devDependencies
- what is the use of "-g" while npm install
- Difference between caret and tilda (^ & ~);
- Create a new git Repository
- Intialize the repository
- add .gitignore (node_modules)
- Intialize the Project with npm init (package.json)
- Add src file => app.js
- Install Express
- Create a Server
- Listen to port 4555
- Write request handlers for "/" and "/works"
- Install Nodemon (auto relaod the server) and Update Scripts inside package.json
- Play with routes and route extensions ex: / , /works
- Order of the routes matter a lot
- Install Postman app and make a workspace/collection > test api call
- Write logic to handle GET , POST , DELETE API Calls and test them in postman
- Explore routing and use of ? , + , () , \* in the routes
- use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route" , rH , [rH1 , rH2] , rH3 , rH4 , rH5)
- what is the middleware && why do we need it?
- How express JS basically handles requests behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/" , (err,req,res,next) => {}); and use at the end of an application.

- Create a free cluster on MongoDB official website(Mongo Atlas)
- Install Mongoose library
- Connect your application to the database "Connection_URL"/devTinder
- Call the connectionDB function and connect to Database before starting application on 4500
- Create a userSchema & user Model
- Create a POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try , catch

- Difference between JS and JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user(postman)
- User.findOne() with duplicate email ids , which objects returned
- API - Get user by emailId
- API - Feed API - GET /feed - get all the users from the database
- Create a delete user API
- Difference between PUT and PATCH
- API - Update a user
- Explore Mongoose Documentation for Models methods
- What are options in a Model.findOneAndUpdate method , explore more about it.
- API - Update the user with email ID

- Explore schems types options from the documentation
- Add required , unique , lowercase , mim , minLength , maxLength, trim
- Add default
- Create a Custom Validate Function for gender
- Improve the DB schema - PUT all appropriate validations on each filed in schema
- Add timestamps to the user Schema
- Add API level validations on patch request & signup post API
- Data Sanitizing - Add API validation for each field
- Install Validator
- Explore Validator Library functions and use Validator functions for password , email and photoUrl
- NEVER TRUST req.body(because it can get any malicious data to your database)

- Validate data in signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user with encrypted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

- Instal cookie-parser
- Just send a dummy cookie to user
- Create GET /profile API check if you get the cookie back
- Install jasonwebtoken
- In login API , after email and password validation, create a JWT token and send it to user in cookie
- Read the cookie inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create userSchema method to validatePassword(password)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express Router
- Create Routes folder for managing authRouter , profile , request routers
- Create authRouter , profileRouter , requestRouter
- Import these routes in app.js
- Create POST /logout API
- Create PATCH /pofile/edit API
- Create PATCH /profile/forgotpassword API
- Make sure validate all data in every POST , PATCH

- Create Connection Request Schema
- Send Connection Request API
- Proper Validation of data
- Think about all Corner Cases
- $or and $and query in mongoDB -https://www.mongodb.com/docs/manual/reference/mql/query-predicates/logical/
- schema.pre("save") function(){}
- Read more anout indexes in Mongodb
- Why we need index in DB?
- What is the advantage and disadvantage of creating?
- Read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- \*\*\* ALWAYS THINK ABOUT THE CORNER CASES

- Write code with prpoer Validations for POST /request/review/:status/:requestId
- Thought Process - POST & GET
- Read about ref and populate
- Create GET /user/requests/received with all checks
- Create GET /user/connections

- Logic for GET /feed API
- Explore the $nin , $and , $ne , $or and other query operators
- Pagination - skip() & limit()

/feed?page=1&limit=10 => skip(0) & limit = 10 => starts 0 - 10
/feed?page=2&limit=10 => skip(10) & limit = 10 => starts 11 - 20
/feed?page=3&limit=10 => skip(0) & limit = 10 => starts 21 - 30
