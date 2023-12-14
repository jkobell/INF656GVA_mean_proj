# INF656GVA_mean_proj
- A MEAN Stack project which allows users to view food menu items, add food items to an order, select a delivery option, and pay online. 
## The Project
- Overview: The project consists of an Angular(ts) client, a Node/Express API server, and a MongoDB cluster.
The application is organized into 2 areas. The first area is for producing views for Users. The second area is an Administrator only section.
## Responsive Web Design (RWD)
- All views are RWD.
- RWD implementation is through css flex only. No responsive library or CDN is required.  
## To Run
- Install Nodejs 20.5.1, Express 4.18.2, and Angular 16.2.0.
- Create a MongoDb cluster with the 3 collections referenced in server\src\database.ts.
- Alternatively, Mock collections can be used for initial development without a Database.
- ### Client
    - In a terminal, navigate to \<project path>\client.
    - Enter ng serve to start client or ng serve -o to start client and open a browser.
    - Navigate browser to URL localhost:4200/menu for Users view of menu listings.
    - No Authentication is required to view menu listings.
- ### Server
    - In a terminal, navigate to \<project path>\server.
    - Enter npx ts-node src/server.ts
- ### Administrator Area Usage
    - 2 roles are implemented. 
    - AdminCRU allows all operations except Delete and Registration. 
    - AdminCRUD allows all operations.
    - Login authentication is required for Admins. 
    - Only a AdminCRUD can register an AdminCRU
    - Guards authorization restricts unauthorized navigation. 
    - #### Admin only components uses
        - Add a listing.
        - Update a listing. Edit any propertiy of a listing. Only AdminCRUD can Delete a listing. 
        - Upload an image. Converts image to base64 before inserting into db collection.
        - Register new Admin. Only AdminCRUD role can access Register Admin view. 
## ToDos
- Implement the MyOrder component.
- Implement a PayNow component for payments gateway provided Iframe.
## Complementary Application (future epic)
- An Andriod native application for recieving confirmed and paid new orders.

