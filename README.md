# node-auth
This is the node auth project

# Routes

Login route
http://localhost:3000/app/login

Sign Up route
http://localhost:3000/app/sign-up

Forgot Password Route
http://localhost:3000/app/forgot-password

Password Reset Route
http://localhost:3000/app/password-reset

# Steps to install

1) Clone the repository
2) cd into the project
3) run 'npm install' to install all the dependencies
4) rename the .env_sample to .env 
5) Refer the comments in the .env file (remove the comments),Express session secret, Fill in the all the Gmail details, Google Auth Credentails etc
6)  Run the project via 'npm start'

Note :- For sending Email's please set the App Password in the google security section and use that as a password, Google as removed the less secure apps section (refer the below video)
https://www.youtube.com/watch?v=rqPmaDxigNY
