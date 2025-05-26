
A RESTful API for book reviews

Setup

```bash
git clone ...
cd book-review-api
npm install
cp .env.example .env
npm run dev





Testing with Postman

base URL - http://localhost:5000/api

 # 1. Register a New User
    Method: POST
    URL: http://localhost:5000/api/signup
    Body → raw → JSON:

    {
        "username": "Vishvajeet",
        "password": "000000"
    }


# 2. Login
    Method: POST
    URL: http://localhost:5000/api/login
    Body → raw → JSON:

    {
        "username": "Vishvajeet",
        "password": "000000"
    }

# Copy the token from the response and use it in the Authorization

# 3. Add a Book
    Method: POST
    URL: http://localhost:5000/api/books

    Headers:
        Authorization: Bearer JWT_TOKEN
    Body → raw → JSON:

    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy"
    }

# 4. Get All Books
    Method: GET
    URL: http://localhost:5000/api/books
    Headers:
        Authorization: Bearer JWT_TOKEN

# 5. Search Books
    Method: GET
    URL: http://localhost:5000/api/books/search?q=tolkien


 # 6. Get Book by ID
    Method: GET
    URL: http://localhost:5000/api/books/<book_id>




 # 7. Submit a Review
    Method: POST
    URL: http://localhost:5000/api/books/<book_id>/reviews
    Body → raw → JSON:

    {
        "rating": 5,
        "comment": "Amazing story!"
    }


 # 8. Update Your Review 
    Method: PUT
    URL: http://localhost:5000/api/reviews/<reviews_id>
    Body → raw → JSON:

    {
        "rating": 4,
        "comment": "Updated my review, still great!"
    }

 # 9. Delete Your Review 
    Method: DELETE
    URL: http://localhost:5000/api/reviews/<reviews_id>




# Design Decisions and Assumptions

Passwords are kept safe with bcryptjs.
JWT is used to verify logged-in users.
Only logged-in users can add books or reviews.
One review per book per user.
Books and reviews can be viewed in pages (?page=1&limit=5).
Search books by title or author (/api/books/search?q=keyword).