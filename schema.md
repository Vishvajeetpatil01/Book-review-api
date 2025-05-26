# user collection

{
  _id: ObjectId,
  username: String,       
  password: String,       
  createdAt: Date
}

# Book Collection

{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId,     // Reference to User._id
  createdAt: Date
}

# Review Collection

{
  _id: ObjectId,
  user: ObjectId,          // Reference to User._id
  book: ObjectId,          // Reference to Book._id
  rating: Number,          // 1 to 5
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
