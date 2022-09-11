# BudgetWise - A budgeting App
[Link](https://gatlace-budget-app.vercel.app/)

## What is it?
It's a very simple full-stack budgeting app with Token based authentication. 
It allows you to create a budget, create, read, update, and delete purchases, and view your purchases by merchant.
This is my first full-stack app, so it's not jam-packed with features, but it's a good start.

#### This will be a rolling-release project, with features being added as my skills improve.

## Features
- Token and session based authentication
- Create, read, update, and delete purchases
- Edit account
- View purchases by merchant
- View percentage of budget spent at each merchant

## How to run it
- Full app:
    - Install Poetry: `pip install poetry`
    - Install Python dependencies: `poetry install`
    - cd into the `frontend` directory
    - Install Node dependencies: `npm install`
    - cd back to the root directory
    - Run the app: `./manage-app run`
- Backend:
    - Install poetry: `pip install poetry`
    - Install dependencies: `poetry install`
    - Run the backend: `./manage-app backend`
- Frontend:
    - Install Node dependencies: `npm install`
    - Run the frontend: `./manage-app frontend`
- Linting/Formatting: `./manage-app lint`
      - (formats ALL directories except `node_modules` ) 
