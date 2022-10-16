# Diligent
Diligent-Take Home Assessment

## Installation

Follow the below mentioned commands to run the project.

Database has ben created and all the connection details has been shared in the .env file(https://www.freesqldatabase.com/).Run the sql scripts in others/diligent.sql if tables are not created already.

Import the Diligent.postman_collection.json file in postman for teating the API locally.

Install all the packages required once project is cloned/downloaded on your local machine using the command.

```bash
npm install
```

and then run the project using the command. Please ensure that your machine has node version >= **16.X**(v16.3.0 - used).

```bash
npm start
```

## Usage

Test project implemented with the below mentioned API's.
```python
1. User Login API(JWT Authentication)
2. User Signup API
3. Create Product API
4. Get Product API
5. Update Product API
6. Delete Product API
```

I have done the error handling, followed the SOA pattern for structuring the project and Have used JWT for Authorization. Adding to this, I have used sequalize ORM for querying purpose.  
