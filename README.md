# Autonomize-assignment
This serves as the backend for the primary application, employing Node.js and Express.js for backend development and MongoDB as the underlying database. The JOI validator, a third-party library, is incorporated to validate the MongoDB URL and port number. Additionally, regular expressions (regex) are applied within the schema to validate email addresses and URLs for specific fields. Furthermore, error handling has been implemented in each controller to enhance validation processes.
Endpoints are as follows:-

1.  Search by Username and Location Route
Endpoint:GET /search


Description:
Searches data based on username or location query given.

2. Get User by Username Route
Endpoint:GET /:username


Description:
Fetches user data by the given username. If the user is not found in the database, it fetches the data from the GitHub API and stores it in the database.

3. Sorting Route
Endpoint:GET /

Description:
Sorts the data on the given criteria in query and not provided any returns the list of all users.

4. Soft Delete Route
Endpoint:DELETE /:username


Description:
Soft deletes a user by setting the isDeleted flag to true.

5. Update Data Route
Endpoint:PATCH /:username

Description:
Updates user data by the given username. If the user is marked as deleted, it returns an appropriate message.

