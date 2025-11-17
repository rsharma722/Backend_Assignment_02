# Backend Assignment - Employee & Branch Management API

## Author
**Ravdeep Sharma**  
Email: **rsharma1@rrc.ca**  
GitHub Repository: **https://github.com/rsharma722/Backend_Assignment_02**


# 1. Project Overview
This RESTful API allows managing employees and branches for an organization.

In this module 5 Assignment, the project was enhanced to include:
- Comprehensive OpenAPI documentation (Swagger/Redoc)
- Inline Joi schema documentation
- Secure `.env` configuration using **dotenv**
- Security best practices with **Helmet.js** and **CORS**
- Automated documentation deployment to **GitHub Pages**

This API allows to :
- Create and view branches  
- Add and manage employees  
- Filter employees by department or branch  
- Access public and local API documentation  


# 2. Installation & Setup

- Node.js
- npm
- Git

and for the setup i directly started from my Backend_Assignment_02 folder by open vs code from there.

3. Environment Variables
Created a .env file in the root:

NODE_ENV=development
PORT=3000
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
ALLOWED_ORIGINS=http://localhost:3000

FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY

4. Run the Application
npm run dev
The server runs at:http://localhost:3000

5. API Documentation
Public Documentation
https://rsharma722.github.io/Backend_Assignment_02/

Local Swagger Documentation
http://localhost:3000/api-docs

6. API Examples
1. Created a Branch
POST /api/v1/branches

{
  "name": "Winnipeg Campus",
  "address": "180 Princess St, Winnipeg, MB",
  "phone": "+1-431-555-0000"
}
2.Get All Branches
GET /api/v1/branches

3.Create an Employee
POST /api/v1/employees

{
  "name": "Ravdeep Sharma",
  "position": "Backend Developer",
  "department": "IT",
  "email": "rsharma1@rrc.ca",
  "branchId": "branch_001"
}
7. Security Configuration
Helmet.js
Used for enhancing API security via secure HTTP headers.

import { getHelmetConfig } from "./config/helmetConfig";
app.use(getHelmetConfig());
CORS
Custom configuration that restricts allowed origins based on .env.

import { getCorsOptions } from "./config/corsConfig";
app.use(cors(getCorsOptions()));
Environment Management
All sensitive keys and secrets are stored in .env:

import dotenv from "dotenv";
dotenv.config();

8. Testing

npm test

9. Screenshots
For Screenshots i have uploaded zip file named /Security and Documentation_Screenshots

10. Debugging Analysis Videos
Three videos included in /Debuggin_5:

Debugging Create Branch

Debugging Get All Branches

Debugging Get Branch by ID

Each video includes:

Breakpoints

VSCode debugger
