# This is a Zomato_Clone Website Application

For this Applocation we have used following --

## FrontEnd
### Normal Dependencies
- React - React is a free and open-source front-end JavaScript library for building user interfaces based on components
- React Script - react-scripts are simply scripts to run the build tools required to transform React JSX syntax into plain JavaScript programmatically
- React DOM - The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to
- Web Vitals - Web Vitals helps you to quickly track and perceive how well your website is doing in terms of performance. Therefore it’s crucial to know how we can improve them
- headlessui/react - Set of completely unstyled, fully accessible UI components for React, designed to integrate with Tailwind CSS
- swiper - Swiper is the modern free mobile touch slider with hardware accelerated transitions and amazing native behavior
- Axios - promise based HTTP client for Node.js & the Browser
- react-rating-stars-component - A simple star rating component for your React projects
- leaflet & react-leaflet - leaflet is an open-source JavaScript library for mobile-friendly interactive maps
- react-router-dom - npm package for featuring Routing in clint & server side in React
- react-icons - Include popular icons in your React projects easily with react-icons
- react-simple-image-viewer - Simple image viewer component for React.
- react-context-api - Where we can store or update date from anywhere i.e.data from any component & also we can access it from anywhere in the component

### Developer Dependencies
- TailwindCSS - Utility based CSS Framework including many UI components which does not support predefined classes for many of the UI components unlike other css framework like Bootstrap
- PostCSS - PostCSS is a Node. js tool that transforms your styles using JavaScript plugins. It generates more downloads per week on NPM than other CSS preprocessors like Sass
- AutoPrefixer - For automatically managing vendor prefixes in your CSS, we should use Autoprefixer


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


### API Planning & DB Models
- auth (for user authentication either through google-sign or other method)
- Food (food items and details)
- Resturants (Resturants & their details)
- Menu (Menu and their Details)
- Order (Order & their details)
- Image (All the images related to the zomato)
- Review (storing all the list of review)
- User (User related details, username, email and passwords)