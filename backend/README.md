# Backend
I made this backend with Django ( + REST Framework ). The routes are kinda messy, but I tried to follow a certain pattern.

## Routes
(only one slash is needed between routes, but one is needed at the end of the URL)
- / - Nothing here, an error if you try to access it
- /users/ - User Authentication, Registration, Edit
    - /login/ - Login with username and password, returns a token
    - /new/ - Register a new user
    - /edit_account/ - Edit your account ( requires token )
    - /edit_login/ - Edit your login ( requires token )
    - /account_info/ - Get your account info ( requires token )
- /transactions/ - Create, Read, Update, Delete transactions ( all require token )
    - /create/ - Create a new transaction
    - /all/ - Get all transactions
    - /dashboard/ - Get all transactions for the dashboard
    - /<merchant_name>/ - Get all transactions for a merchant
    - /edit/\<id>/ - Edit a transaction
    - /delete/\<id>/ - Delete a transaction