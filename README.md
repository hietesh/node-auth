# node-auth
Node Auth Project uses Passport Library for local authentication and google authentication for login,signup,logout

1) You can login via username, email or google authentication
2) You'll get a mail when you signed up
3) You'll get a mail to reset the password (forgot password) (link expired in 2 mins)
4) Password stored in db encrypted (bcryptjs library is used)
5) You'll need your own credentials to fill in the env file inorder to run this project as these are sensitive information and should not be shared , sample env file is provided fill the details according to the comments

# Routes

Login route
http://localhost:3000/app/login

Sign Up route
http://localhost:3000/app/sign-up

Forgot Password Route
http://localhost:3000/app/forgot-password

Password Reset Route
http://localhost:3000/app/reset-password

# Steps to install

1) Clone the repository
2) cd into the project
3) run 'npm install' to install all the dependencies
4) rename the .env_sample to .env 
5) Refer the comments in the .env file (remove the comments),Express session secret, Fill in the all the Gmail details, Google Auth Credentails etc
6)  Run the project via 'npm start'

Note :- For sending Email's please set the App Password in the google security section and use that as a password, Google as removed the less secure apps section (refer the below video)
https://www.youtube.com/watch?v=rqPmaDxigNY

# Hosted Link
https://node-app-login-hitesh.herokuapp.com/app/login
