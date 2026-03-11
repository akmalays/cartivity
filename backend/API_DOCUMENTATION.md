# Task Manager Backend API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Berguna token yang didapat saat login di header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "username": "username"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "username": "username"
    }
  }
}
```

**Error Response:**
```json
{
  "error": "Email already registered"
}
```

---

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "username": "username",
    "email": "user@example.com"
  }
}
```

**Error Response:**
```json
{
  "error": "Invalid login credentials"
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123!"}'
```

---

### 3. Get User Profile
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 4. Update User Profile
**PUT** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "email": "newemail@example.com",
    "username": "newusername"
  }
}
```

**Curl Example:**
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"username":"newusername","email":"newemail@example.com"}'
```

---

### 5. Delete User Account
**DELETE** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "User account deleted successfully"
}
```

**Curl Example:**
```bash
curl -X DELETE http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 6. Get All Users
**GET** `/api/auth/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": "uuid1",
    "email": "user1@example.com",
    "username": "user1",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": "uuid2",
    "email": "user2@example.com",
    "username": "user2",
    "created_at": "2024-01-02T00:00:00Z"
  }
]
```

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/auth/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Tasks Endpoints

### 1. Get All Tasks (User's Tasks)
**GET** `/api/tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Playing Game",
    "duration": 2,
    "desc": "Description here",
    "done": false,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 2. Create Task
**POST** `/api/tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Task",
  "duration": 1.5,
  "desc": "Task description",
  "done": false
}
```

**Success Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "New Task",
  "duration": 1.5,
  "desc": "Task description",
  "done": false,
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"New Task","duration":1.5,"desc":"Task description","done":false}'
```

---

### 3. Update Task
**PUT** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Task",
  "duration": 2,
  "desc": "Updated description",
  "done": true
}
```

**Success Response (200):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Updated Task",
  "duration": 2,
  "desc": "Updated description",
  "done": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Curl Example:**
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Updated Task","duration":2,"desc":"Updated description","done":true}'
```

---

### 4. Delete Task
**DELETE** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Task deleted"
}
```

**Curl Example:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Shop Endpoints

### 1. Get All Products
**GET** `/api/shop`

**Success Response (200):**
```json
{
  "new_product": [
    {
      "id": "reebok-2",
      "name": "Reebok Speedwick Running Tee",
      "desc": "Moisture-wicking running shirt",
      "available_color": ["black", "lime green"],
      "pics": "/images/reebok-speedwick.png",
      "price": "Rp. 220.000,-",
      "promo_price": "Rp. 170.000,-",
      "tag": "new_product",
      "category": "apparel / men outfit",
      "rating": "4.5",
      "reviews": "1,1k",
      "size_available": ["M", "L", "XL"]
    }
  ],
  "best_seller": [...],
  "special_price": [...]
}
```

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/shop
```

---

### 2. Add Product
**POST** `/api/shop`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "new-product-1",
  "name": "Product Name",
  "desc": "Product description",
  "available_color": ["color1", "color2"],
  "pics": "/images/product.png",
  "price": "Rp. 100.000,-",
  "promo_price": "Rp. 80.000,-",
  "tag": "new_product",
  "category": "apparel / men outfit",
  "rating": "4.5",
  "reviews": "100",
  "size_available": ["M", "L", "XL"]
}
```

**Success Response (201):**
```json
{
  "id": "new-product-1",
  "name": "Product Name",
  "desc": "Product description",
  ...
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/shop \
  -H "Content-Type: application/json" \
  -d '{"id":"new-product-1","name":"Product Name","desc":"Description","price":"Rp. 100.000,-","category":"apparel / men outfit","tag":"new_product"}'
```

---

## Error Handling

Semua error responses akan return dengan format:
```json
{
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - OK (Success)
- `201` - Created (Resource created)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (No token or invalid token)
- `404` - Not Found (Resource not found)
- `500` - Server Error

---

## Notes

1. **Semua endpoint yang membutuhkan auth** harus include token di header `Authorization: Bearer <token>`
2. **Token expiration**: 1 jam (dapat di-set di `.env` JWT_SECRET)
3. **Tasks adalah user-specific** - Setiap user hanya bisa lihat/edit tasks milik mereka sendiri
4. **Products adalah public** - Semua user bisa lihat products
5. **Service Role Key di .env** diperlukan untuk seeding tasks

---

## Testing dengan Postman

1. **Register** → POST `/api/auth/register` → Dapatkan user terdaftar
2. **Login** → POST `/api/auth/login` → Dapatkan token
3. **Copy token** ke header Authorization: `Bearer <token>`
4. **Create Task** → POST `/api/tasks` → Buat task baru
5. **Get Tasks** → GET `/api/tasks` → Lihat semua task
6. **Update Task** → PUT `/api/tasks/:id` → Update task
7. **Delete Task** → DELETE `/api/tasks/:id` → Hapus task
8. **Get Products** → GET `/api/shop` → Lihat semua produk
