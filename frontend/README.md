# Frontend
I made this in NextJS, with framer-motion for animations and iron-session to handle sessions.

# Routes
 - /account
   - /edit ( login required )
   - /login
   - /register
 - merchants ( login required )
   - /<merchant_name>
     - view all transactions for a certain merchant
   - /transactions
     - /edit
       - create/edit/delete transactions
 - /api
   - /account
   - /edit
     - /account
     - /login
     - /info
     - /is_logged_in
     - /login
     - /logout
     - /register
   - /transactions
     - edit