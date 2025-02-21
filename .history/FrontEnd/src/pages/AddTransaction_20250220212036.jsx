make all components coodes both frontend and back for this descriped workflow Workflow of the AI-Powered Personal Finance Tracker
1. User Authentication
Frontend:

User visits the app and is presented with a login/signup page.

User enters their credentials (email and password) and submits the form.

Backend:

The frontend sends a POST request to the backend (e.g., /api/auth/signup or /api/auth/login).

The backend validates the credentials, creates a new user (if signing up), and generates a JWT token.

The token is sent back to the frontend and stored in Redux state or local storage.

Frontend:

The user is redirected to the dashboard after successful authentication.

2. Adding a Transaction
Frontend:

User navigates to the Add Transaction page and fills out a form (e.g., amount, type, description).

User submits the form.

Backend:

The frontend sends a POST request to the backend (e.g., /api/transactions) with the transaction data.

The backend sends the transaction description to the OpenAI GPT API for categorization.

The AI returns a category (e.g., "Food & Drinks"), which is added to the transaction data.

The transaction is saved in the MongoDB database.

Frontend:

The transaction is added to the Redux state and displayed in the transaction list.

3. Viewing Transactions
Frontend:

User navigates to the Transactions page.

The frontend sends a GET request to the backend (e.g., /api/transactions) to fetch all transactions for the logged-in user.

Backend:

The backend queries the MongoDB database for transactions associated with the user.

The transactions are sent back to the frontend.

Frontend:

The transactions are stored in the Redux state and displayed in a list or table.

4. Editing or Deleting a Transaction
Frontend:

User clicks the Edit or Delete button on a transaction.

Backend:

For editing, the frontend sends a PUT request to the backend (e.g., /api/transactions/:id) with the updated transaction data.

For deleting, the frontend sends a DELETE request to the backend (e.g., /api/transactions/:id).

The backend updates or deletes the transaction in the MongoDB database.

Frontend:

The transaction list in the Redux state is updated, and the UI reflects the changes.

5. Dashboard and Financial Insights
Frontend:

User navigates to the Dashboard page.

The frontend sends a GET request to the backend (e.g., /api/insights) to fetch financial insights (e.g., total income, total expenses, net savings).

Backend:

The backend calculates the insights by querying the MongoDB database for the user’s transactions.

The insights are sent back to the frontend.

Frontend:

The insights are stored in the Redux state and displayed using charts (e.g., pie chart for expenses by category, line chart for spending trends).

6. AI-Powered Categorization
Frontend:

When a user adds a transaction, the description is sent to the backend.

Backend:

The backend sends the description to the OpenAI GPT API with a prompt like: "Categorize the following transaction: 'Starbucks coffee'. Return only the category (e.g., Food & Drinks)."

The AI returns the category, which is added to the transaction data.

Frontend:

The categorized transaction is displayed in the transaction list.

7. Logout
Frontend:

User clicks the Logout button.

The JWT token is removed from Redux state or local storage.

The user is redirected to the login page.

Visual Workflow
User Authentication:

Copy
Frontend → Backend (Auth API) → MongoDB → Frontend (JWT Token)
Adding a Transaction:

Copy
Frontend → Backend (Transaction API) → OpenAI GPT → MongoDB → Frontend (Redux State)
Viewing Transactions:

Copy
Frontend → Backend (Transaction API) → MongoDB → Frontend (Redux State)
Editing/Deleting a Transaction:

Copy
Frontend → Backend (Transaction API) → MongoDB → Frontend (Redux State)
Dashboard and Financial Insights:

Copy
Frontend → Backend (Insights API) → MongoDB → Frontend (Redux State)
AI-Powered Categorization:

Copy
Frontend → Backend (Transaction API) → OpenAI GPT → MongoDB → Frontend (Redux State)
Logout:

Copy
Frontend (Remove JWT Token) → Redirect to Login Page
add reset and forgot password logics with sendmail to the user while forgot password with reset token using jwt token and send mail using nodemailer 