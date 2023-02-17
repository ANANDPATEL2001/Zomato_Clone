# This is a Zomato_Clone Website Application

For this Applocation we have used following --
## FrontEnd

## BackEnd
### Normal Dependencies
- express - framework for Node.js
- mongoose - Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB
- .env - Dotenv is a zero-dependency module that loads environment
- bcryptjs - bcrypt is a password-hashing function based on the Blowfish cipher incorporating a salt to protect against rainbow table attacks
- express-session - HTTP server-side framework used to create and manage a session middleware.
- jsonwebtoken - JWTs are used for authentication. This token tells the server what routes, services, and resources the user is allowed to access
- passport -  Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies
- passport-jwt - This module lets you authenticate endpoints using a JSON web token
- joi - The Schema description language and data validator for JavaScript
- aws-sdk - The AWS SDK for JavaScript simpliﬁes use of AWS Services by providing a set of libraries that are consistent and familiar for JavaScript developers
- mutler - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

### Developer dependencies
- passport-google-oauth2 - This module allows authentication using Google in our Node.js applications
- nodemon - for automatic reloading of the website 
- @babel/cli - Command Line Interface used to execute all the commands of Babel
- @babel/core  
- @babel/node - used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments
- @babel/preset-env - used to manage which syntax transforms are needed by your target environment(s)

### API Planning
- auth (for user authentication either through google-sign or other method)
- Food (food items and details)
- Resturants (Resturants & their details)
- Menu (Menu and their Details)
- Order (Order & their details)
- Image (All the images related to the zomato)
- Review (storing all the list of review)
- User (User related details, username, email and passwords)