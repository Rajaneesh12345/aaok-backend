# About
This is project consists of a React.js frontend, which is compiled and served by an Express.js backend. The backend is the only application running on the web host. The Express.js backend is also used to connect to a MySQL server and manages that communication so that it is not visible to users. The Express.js application is configured to route requests to URLs that it does not define to the compiled React.js frontend, which uses its own separate routing to serve responses. The React.js frontend can make requests to the backend if it needs information from the MySQL server at `localhost:5000`, the address the backend is configured to listen on.
# Instructions

NOTE: Instructions assume you are using a terminal/shell.

**IMPORTANT**: Set the following lines in your ~/.bashrc, ~/.zshrc, or other corresponding shell profile dotfile. Also, ensure that the repository is always set to private and that these values are not made public. On the web server, these values are set in the apache config file for the application (see the reference under the "Deploy..." header).

```
export MYSQL_HOST="hoaprdaaokdb01.cc.ku.edu"
export MYSQL_USER="alw"
export MYSQL_PASSWORD="excsXUs8DP"
export MYSQL_DBNAME="Stiller"
```

This sets the username and password of the MySQL server account that the
application will authenticate with. It will attempt to connect to the MySQL
database with the name "Stiller", and it will try to contact the database
server at the host address. The application will grab these values from the
environment at runtime, so they must be set in your shell session. Adding these
lines to the shell profile ensures that they are set each time a new shell
session is started. To have these changes take effect, execute 'source ~/<name of dotfile>' or open a new shell session.

## Workflow for making changes
1. Install Node.js (comes with npm)
2. Navigate to AAOK directory
3. Run ```npm install```
4. Navigate to aaok/client
5. Run ```npm install```
6. Run `npm run start` to start front end.
7. In another terminal, navigate to aaok/ and run ```npm run dev``` to start the Express.js backend w/ hot-reloading.
8. In a browser, navigate to ```localhost:3000``` to view the website. This will load the React application running on React's development server.
  - This application at localhost:3000 will make its backend requests to localhost:5000, which is the address for the backend's development server

NOTE: Running the frontend and backend separately allows you to take advantage of React's hot-reloading, as well as the backend's. You will be sending requests directly to the front-end from your browser, which is using its own built-in webserver. It will make requests the the backend, which we also have running on its own webserver.

## Workflow for viewing site as used in production
1. Install Node.js (comes with npm)
2. Navigate to AAOK directory
3. Run ```npm install```
4. Navigate to ```aaok/client/```
5. Run ```npm install```
6. Run ```npm run build``` to output compiled front-end to ```/client/build/``` directory.
7. Navigate up a level to ```aaok/```
8. Run ```npm run start``` to run the Express.js server without Nodemon package's hot-reloading function (what your web host will do).

NOTE: This runs the backend only, not the front end, which will pass any endpoints not defined for the Express.js backend to the built React app automatically, in the /client/build/ directory. However, this means that you will need to run 'npm run build' again or use the 'Workflow for making changes'

9. In a browser, navigate to ```localhost:5000```, the Express.js url. Visiting the site in this manner emulates what is happening on the web host.


## Deploying on Linux CentOS with Apache and Phusion Passenger (Apache mod-passenger)
See the following reference: https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/digital_ocean/apache/oss/el7/deploy_app.html
- This guide was used to configure the Linux web server to run our application
  - Relevant items for deployment begin at step 2 of '7 Deploy App'
- Note, an existing version of the application has already been deployed. This means 'myappuser' and the 'myapp' directory have already been created, and steps where a file is edited/created have already been completed.
  - 'myappuser' should be replaced by 'aaok' (or 'aaokweb', one of the two)
  - 'myapp' should be replaced by 'aaok'
- Notably, 'sudo apachectl restart' is used to restart/reload the application server. This is required to update the website after changes are made to the built application on the server.


On the server...
1. Navigate to the aaok project directory at /var/www/aaok/
2. If not already there, enter into the project directory (contains a .git folder).
3. execute: 'git pull origin master' to merge the changes from the 'master' branch of the GitHub repository
4. execute: 'npm install' to update backend's dependencies
5. Enter into the 'client/' directory
6. execute: 'npm install' to update react project dependencies
7. execute: 'npm run build --production' to build the React application so that its changes are included in the backend's build directory
9. execute: 'sudo apachectl restart' to restart the web server. Your changes should now be live on the website.
