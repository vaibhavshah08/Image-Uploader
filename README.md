This is a MERN (MongoDB, Express, React, Node.js) stack application with authentication. It allows users to sign up, log in, and log out, and provides access to protected routes only for authenticated users. It also allows user to upload images and view images which they have uploaded.

The front-end of the application is built with React, Tailwind CSS and uses React Router for client-side routing. The back-end is built with Node.js and Express, and uses MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT). We are using Firebase as our storage provider media files and Images.

[Live-APP link](https://vaibhav-image-uploader.onrender.com/)

### GCA Activation Parameters

    | Parameter              | Type    | Possible Values                       | Description                                                |
    |-----------------------|---------|--------------------------------------|------------------------------------------------------------|
    | is_gca_enabled        | Boolean | true / false                         | Indicates whether GCA is enabled for the customer.         |
    | gca_activation_status  | String  | NOT_STARTED, APPROVAL_PENDING, IN_PROGRESS, COMPLETED | Status of the GCA activation process for the customer.     |


