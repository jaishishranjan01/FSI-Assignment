# Backend API Integration Guide

This document lists all backend API endpoints needed to replace the mock data in the School Equipment Lending Portal. All endpoints should be implemented on your backend (Node.js, Python, Java, etc.) and called from the frontend through the centralized API client in `lib/api-client.ts`.

---

## Authentication Endpoints

**Location**: `app/page.tsx`, `app/auth/signup/page.tsx`, `app/auth/forgot-password/page.tsx`

### 1. POST /api/auth/login

**Purpose**: User login with email and password
**Request Body**:
\`\`\`json
{
"email": "user@school.edu",
"password": "password123"
}
\`\`\`
**Response**:
\`\`\`json
{
"id": "user-123",
"email": "user@school.edu",
"name": "John Doe",
"role": "student",
"status": "active",
"token": "jwt-token-here"
}
\`\`\`
**Current Mock Location**: `app/page.tsx` (localStorage validation)
**DONE**

---

### 2. POST /api/auth/signup

**Purpose**: Register new user
**Request Body**:
\`\`\`json
{
"email": "newuser@school.edu",
"password": "password123",
"name": "Jane Doe",
"role": "student"
}
\`\`\`
**Response**: Same as login response
**Current Mock Location**: `app/auth/signup/page.tsx`
**DONE**

---

### 3. POST /api/auth/forgot-password

**Purpose**: Request password reset
**Request Body**:
\`\`\`json
{
"email": "user@school.edu"
}
\`\`\`
**Response**:
\`\`\`json
{
"message": "Password reset link sent to email",
"status": "success"
}
\`\`\`
**Current Mock Location**: `app/auth/forgot-password/page.tsx`
**DONE**

---

## Equipment Endpoints

**Location**: `lib/api-client.ts` - `equipmentAPI` object

### 1. GET /api/equipment

**Purpose**: Fetch all equipment
**Query Parameters**: None
**Response**:
\`\`\`json
[
{
"id": "equip-001",
"name": "Microscope",
"category": "Laboratory",
"description": "High precision microscope for biology lab",
"quantity": 5,
"available": 3,
"condition": "good",
"location": "Lab Building A - Room 101",
"specifications": ["1000x magnification", "LED illumination"],
"usageInstructions": "Handle with care, follow lab protocols",
"restrictions": "Biology students only",
"lastMaintenance": "2025-10-15",
"maintenanceInterval": 30
}
]
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `MOCK_EQUIPMENT`

---

### 2. GET /api/equipment/:id

**Purpose**: Fetch single equipment by ID
**URL Parameter**: `id` - Equipment ID
**Response**: Single equipment object (same structure as above)
**Current Mock Location**: `lib/api-client.ts` - `equipmentAPI.getById()`

---

### 3. GET /api/equipment/search

**Purpose**: Search equipment by query and/or category
**Query Parameters**:

- `q` (string, optional): Search query for name/description
- `category` (string, optional): Filter by category (e.g., "Laboratory", "Sports", "Musical")
  **Response**: Array of equipment objects matching criteria
  **Current Mock Location**: `lib/api-client.ts` - `equipmentAPI.search()`

---

### 4. POST /api/equipment

**Purpose**: Create new equipment (Admin only)
**Request Body**:
\`\`\`json
{
"name": "New Equipment",
"category": "Laboratory",
"description": "Description here",
"quantity": 10,
"condition": "good",
"location": "Building A - Room 101",
"specifications": ["spec1", "spec2"],
"usageInstructions": "Instructions here",
"restrictions": "Restrictions here",
"maintenanceInterval": 30
}
\`\`\`
**Response**: Created equipment object with ID
**Current Mock Location**: `lib/api-client.ts` - `equipmentAPI.create()`
**Component Used**: `components/EquipmentManagement.tsx`

---

### 5. PUT /api/equipment/:id

**Purpose**: Update equipment details (Admin only)
**URL Parameter**: `id` - Equipment ID
**Request Body**: Same as POST /api/equipment (partial updates allowed)
**Response**: Updated equipment object
**Current Mock Location**: `lib/api-client.ts` - `equipmentAPI.update()`
**Component Used**: `components/EquipmentManagement.tsx`

---

### 6. DELETE /api/equipment/:id

**Purpose**: Delete equipment (Admin only)
**URL Parameter**: `id` - Equipment ID
**Response**:
\`\`\`json
{
"success": true,
"message": "Equipment deleted successfully"
}
\`\`\`
**Current Mock Location**: `lib/api-client.ts` - `equipmentAPI.delete()`
**Component Used**: `components/EquipmentManagement.tsx`

---

## Request Endpoints (Borrowing Requests)

**Location**: `lib/api-client.ts` - `requestAPI` object

### 1. GET /api/requests

**Purpose**: Get all requests for a user
**Query Parameters**:

- `userId` (string, required): User ID
  **Response**:
  \`\`\`json
  [
  {
  "id": "req-001",
  "equipmentName": "Microscope",
  "requestDate": "2025-11-15",
  "returnDate": "2025-11-20",
  "status": "pending",
  "createdAt": "2025-11-09"
  }
  ]
  \`\`\`
  **Current Mock Location**: `lib/mock-data.ts` - `MOCK_REQUESTS`
  **Components Used**: `components/StudentDashboard.tsx`, `components/MyRequests.tsx`

---

### 2. POST /api/requests

**Purpose**: Create new borrowing request
**Request Body**:
\`\`\`json
{
"equipmentId": "equip-001",
"userId": "user-123",
"requestDate": "2025-11-15",
"returnDate": "2025-11-20",
"notes": "Optional notes about the request"
}
\`\`\`
**Response**: Created request object with ID and status "pending"
**Current Mock Location**: `lib/api-client.ts` - `requestAPI.create()`
**Component Used**: `app/equipment/[id]/page.tsx` - Request modal

---

### 3. PATCH /api/requests/:id/status

**Purpose**: Update request status
**URL Parameter**: `id` - Request ID
**Request Body**:
\`\`\`json
{
"status": "approved"
}
\`\`\`
**Status Values**: "pending", "approved", "rejected", "returned", "overdue"
**Response**: Updated request object
**Current Mock Location**: `lib/api-client.ts` - `requestAPI.updateStatus()`

---

## Approval Endpoints

**Location**: `lib/api-client.ts` - `approvalAPI` object

### 1. GET /api/approvals

**Purpose**: Get all approval requests
**Query Parameters**: None
**Response**:
\`\`\`json
[
{
"id": "app-001",
"userId": "user-123",
"userName": "John Doe",
"equipmentId": "equip-001",
"equipmentName": "Microscope",
"requestDate": "2025-11-15",
"returnDate": "2025-11-20",
"reason": "Lab experiment",
"status": "pending",
"createdAt": "2025-11-09"
}
]
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `MOCK_APPROVALS`
**Components Used**: `components/RequestApprovals.tsx`, `components/AdminDashboard.tsx`

---

### 2. GET /api/approvals?status=pending

**Purpose**: Get only pending approvals
**Query Parameters**:

- `status` (string): Filter by status ("pending", "approved", "rejected")
  **Response**: Array of approval objects filtered by status
  **Current Mock Location**: `lib/api-client.ts` - `approvalAPI.getPending()`
  **Components Used**: `components/AdminDashboard.tsx` - Overview tab

---

### 3. POST /api/approvals/:id/approve

**Purpose**: Approve a borrowing request (Admin/Staff only)
**URL Parameter**: `id` - Approval ID
**Request Body**: Empty or optional notes
**Response**: Updated approval object with status "approved"
**Current Mock Location**: `lib/api-client.ts` - `approvalAPI.approve()`
**Component Used**: `components/RequestApprovals.tsx`

---

### 4. POST /api/approvals/:id/reject

**Purpose**: Reject a borrowing request (Admin/Staff only)
**URL Parameter**: `id` - Approval ID
**Request Body**:
\`\`\`json
{
"reason": "Equipment not available",
"notes": "Optional rejection notes"
}
\`\`\`
**Response**: Updated approval object with status "rejected"
**Current Mock Location**: `lib/api-client.ts` - `approvalAPI.reject()`
**Component Used**: `components/RequestApprovals.tsx`

---

## User Management Endpoints

**Location**: `lib/api-client.ts` - `userAPI` object

### 1. GET /api/users

**Purpose**: Get all users
**Query Parameters**: None
**Response**:
\`\`\`json
[
{
"id": "user-001",
"name": "John Doe",
"email": "john@school.edu",
"role": "student",
"status": "active",
"activeRequests": 2,
"totalBorrows": 15
}
]
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `MOCK_USERS`
**Component Used**: `components/UserManagement.tsx`
**DONE**

---

### 2. GET /api/users/search

**Purpose**: Search users by name/email and filter by role
**Query Parameters**:

- `q` (string, optional): Search query
- `role` (string, optional): Filter by role ("student", "staff", "admin", "all")
  **Response**: Array of user objects matching criteria
  **Current Mock Location**: `lib/api-client.ts` - `userAPI.search()`
  **Component Used**: `components/UserManagement.tsx`

---

### 3. PATCH /api/users/:id/status

**Purpose**: Update user status (Admin only)
**URL Parameter**: `id` - User ID
**Request Body**:
\`\`\`json
{
"status": "suspended"
}
\`\`\`
**Status Values**: "active", "suspended", "inactive"
**Response**: Updated user object
**Current Mock Location**: `lib/api-client.ts` - `userAPI.updateStatus()`
**Component Used**: `components/UserManagement.tsx`

---

## Analytics Endpoints

**Location**: `lib/api-client.ts` - `analyticsAPI` object

### 1. GET /api/analytics/stats

**Purpose**: Get dashboard statistics
**Query Parameters**: None
**Response**:
\`\`\`json
{
"totalEquipment": 45,
"activeRequests": 12,
"usersCount": 150,
"approvalRate": 92.5,
"borrowsThisMonth": 28
}
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `DASHBOARD_STATS`
**Components Used**: `components/EquipmentAnalytics.tsx`, `components/AdminDashboard.tsx`

---

### 2. GET /api/analytics/activity

**Purpose**: Get recent activity log
**Query Parameters**: None
**Response**:
\`\`\`json
[
{
"id": "act-001",
"type": "request_created",
"user": "John Doe",
"description": "Requested Microscope",
"timestamp": "2025-11-09T10:30:00Z"
}
]
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `RECENT_ACTIVITY`
**Component Used**: `components/AdminDashboard.tsx`

---

### 3. GET /api/analytics/categories

**Purpose**: Get category-wise equipment statistics
**Query Parameters**: None
**Response**:
\`\`\`json
[
{
"category": "Laboratory",
"count": 15,
"available": 8,
"borrowed": 7
}
]
\`\`\`
**Current Mock Location**: `lib/mock-data.ts` - `CATEGORY_STATS`
**Component Used**: `components/EquipmentAnalytics.tsx`

---

## Implementation Steps

1. **Set up your backend** with these exact endpoints and response formats
2. **Replace API calls** in `lib/api-client.ts` by removing the setTimeout mock delays and replacing with actual fetch/axios calls
3. **Example implementation**:
   \`\`\`typescript
   export const equipmentAPI = {
   async getAll(): Promise<Equipment[]> {
   const response = await fetch('/api/equipment')
   return response.json()
   },
   // ... rest of endpoints
   }
   \`\`\`
4. **Update authentication** in components to use your backend auth system
5. **Test thoroughly** with your backend running

---

## Notes

- All timestamps should be in ISO 8601 format or YYYY-MM-DD
- Implement proper error handling (400, 401, 403, 404, 500 status codes)
- Add JWT token validation for protected endpoints
- Implement proper CORS headers if frontend and backend are on different domains
- Add request rate limiting for security
- Implement pagination for large datasets (equipment, users, requests, approvals)
