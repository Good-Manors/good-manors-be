# Good Manors BackEnd Server

Express server for hosting Good Manors.


### Routes 
#### Auth routes

'/api/v1/auth'

* post(/signup) - Signs Up a New user
 
* post(/signin) - Signs In an Existing user

* get(/verify) - Verifies Session Cookies


#### Homes routes
'/api/v1/homes'
* post(/) - Posts a new Home for a User
* get(/) - Returns all homes for a User
* get(/:id) - Gets a Home by its Id
* put(/:id) - Updates a Home using its Id
* delete(/:id) - Deletes a Home using its Id

#### Drawers routes
'/api/v1/drawers
* post(/) - Posts a new Drawer for a User
* get(/home/:id) - Returns all Drawers for a single Home, :id is the Home's Id
* get(/:id) - Gets a Drawer by its Id
* put(/:id) - Updates a Drawer using its Id
* delete(/:id) - Deletes a Drawer using its Id



#### Cards routes
'/api/v1/cards'
* post(/) - Posts a new Card for a User
* get(/drawer/:id) - Returns all Cards for a Drawer, :id is the Drawers Id
* get(/:id) - Gets a Card by its Id
* put(/:id) - Updates a Card using its Id
* delete(/:id) - Deletes a Card using its Id

## Scripts
  * "test": "jest --verbose --runInBand",
  * "test:watch": "npm run test -- --watch",
  * "start": "node server.js",
  * "start:watch": "nodemon server.js"
 