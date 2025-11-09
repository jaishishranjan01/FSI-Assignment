# Architecture
<img width="701" height="560" alt="Untitled Diagram drawio (1)" src="https://github.com/user-attachments/assets/7a4193d2-d8a7-47ca-a009-01c0936cd8ff" />

# Database Schema Documentation

## User Service Database

### Table: users

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for each user |
| name | VARCHAR(100) | NOT NULL | Full name of the user |
| email | VARCHAR(100) | NOT NULL, UNIQUE | User's email address for login |
| password | VARCHAR(255) | NOT NULL | Encrypted password hash |
| role | VARCHAR(50) | NOT NULL, FK → roles.name | User role (STUDENT, STAFF, ADMIN) |
| status | VARCHAR(50) | NOT NULL | Account status (ACTIVE, SUSPENDED, INACTIVE) |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`
- INDEX on `role` (foreign key)

**Relationships:**
- `role` references `roles.name`

---

### Table: roles

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for each role |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Role name (STUDENT, STAFF, ADMIN) |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `name`

**Relationships:**
- Referenced by `users.role`

---

## Equipment Service Database

### Table: equipment

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Unique identifier for each equipment item |
| name | VARCHAR(255) | NOT NULL | Name of the equipment |
| category | VARCHAR(100) | NOT NULL | Category (Laptops, Cameras, Lab Equipment, Sports, Musical Instruments, Projectors) |
| description | TEXT | NULL | Detailed description of the equipment |
| quantity | INTEGER | NOT NULL | Total quantity available in inventory |
| available | INTEGER | NOT NULL | Currently available quantity for borrowing |
| condition | VARCHAR(50) | NOT NULL | Physical condition (good, fair, poor) |
| location | VARCHAR(255) | NULL | Storage location or room number |
| usage_instructions | TEXT | NULL | Instructions on how to use the equipment |
| restrictions | TEXT | NULL | Any restrictions or requirements for borrowing |
| last_maintenance | DATE | NULL | Date of last maintenance or inspection |
| maintenance_interval | INTEGER | NULL | Days between required maintenance checks |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `category`
- INDEX on `available` (for availability queries)

**Relationships:**
- Referenced by `requests.equipment_id`
- Referenced by `approvals.equipment_id`
- Referenced by `equipment_specifications.equipment_id`

---

### Table: requests

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Unique identifier for each borrowing request |
| user_id | VARCHAR(100) | NOT NULL | ID of the user making the request |
| equipment_id | VARCHAR(100) | NOT NULL, FK → equipment.id | ID of the requested equipment |
| equipment_name | VARCHAR(255) | NOT NULL | Name of equipment (denormalized for performance) |
| request_date | DATE | NOT NULL | Date when equipment is needed |
| return_date | DATE | NOT NULL | Expected return date |
| notes | TEXT | NULL | Additional notes or special requests from user |
| status | VARCHAR(20) | NOT NULL | Request status (PENDING, APPROVED, REJECTED, RETURNED) |
| created_at | DATE | NOT NULL | Timestamp when request was created |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `user_id`
- INDEX on `equipment_id` (foreign key)
- INDEX on `status`
- INDEX on `created_at`

**Relationships:**
- `equipment_id` references `equipment.id`
- `user_id` references external user service

**Constraints:**
- `return_date` must be after `request_date`
- `status` must be one of: PENDING, APPROVED, REJECTED, RETURNED

---

### Table: approvals

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Unique identifier for each approval record |
| user_id | VARCHAR(100) | NOT NULL | ID of the user who requested the equipment |
| user_name | VARCHAR(255) | NOT NULL | Name of user (denormalized for performance) |
| equipment_id | VARCHAR(100) | NOT NULL, FK → equipment.id | ID of the requested equipment |
| equipment_name | VARCHAR(255) | NOT NULL | Name of equipment (denormalized for performance) |
| request_date | DATE | NOT NULL | Date when equipment is needed |
| return_date | DATE | NOT NULL | Expected return date |
| reason | TEXT | NULL | Reason for approval/rejection by admin |
| status | VARCHAR(20) | NOT NULL | Approval status (PENDING, APPROVED, REJECTED) |
| notes | TEXT | NULL | Admin notes regarding the approval decision |
| created_at | DATE | NOT NULL | Timestamp when approval record was created |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `user_id`
- INDEX on `equipment_id` (foreign key)
- INDEX on `status`

**Relationships:**
- `equipment_id` references `equipment.id`
- `user_id` references external user service

**Constraints:**
- `status` must be one of: PENDING, APPROVED, REJECTED

---

### Table: equipment_specifications

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| equipment_id | BIGINT | PRIMARY KEY, FK → equipment.id | ID of the equipment this specification belongs to |
| specifications | VARCHAR(255) | NOT NULL | Additional technical specifications or features |

**Indexes:**
- PRIMARY KEY on `equipment_id`

**Relationships:**
- `equipment_id` references `equipment.id` (one-to-one relationship)

**Note:** This table stores additional technical details and specifications for equipment items.

---

### Table: flyway_schema_history

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| installed_rank | INTEGER | PRIMARY KEY | Order in which migrations were applied |
| version | VARCHAR(50) | NULL | Version number of the migration |
| description | VARCHAR(200) | NULL | Description of the migration |
| type | VARCHAR(20) | NOT NULL | Type of migration (SQL, JDBC, etc.) |
| script | VARCHAR(1000) | NOT NULL | Name of the migration script file |
| checksum | INTEGER | NULL | Checksum to detect changes in migration files |
| installed_by | VARCHAR(100) | NOT NULL | User who executed the migration |
| installed_on | TIMESTAMP | NOT NULL, DEFAULT NOW() | Timestamp when migration was executed |
| execution_time | INTEGER | NOT NULL | Time taken to execute migration (milliseconds) |
| success | BOOLEAN | NOT NULL | Whether migration was successful |

**Note:** This is a Flyway framework table used for database migration version control. Do not modify manually.

---

## Relationships Summary

### User Service
- `users.role` → `roles.name` (Many-to-One)

### Equipment Service
- `requests.equipment_id` → `equipment.id` (Many-to-One)
- `approvals.equipment_id` → `equipment.id` (Many-to-One)
- `equipment_specifications.equipment_id` → `equipment.id` (One-to-One)

### Cross-Service References
- `requests.user_id` → User Service `users.id`
- `approvals.user_id` → User Service `users.id`

---

## Enumerations

### User Roles
- `STUDENT` - Regular student who can request equipment
- `STAFF` - Lab staff who can approve requests
- `ADMIN` - Administrator with full system access

### User Status
- `ACTIVE` - User can log in and use the system
- `SUSPENDED` - User account temporarily disabled
- `INACTIVE` - User account deactivated

### Equipment Condition
- `good` - Equipment is in excellent working condition
- `fair` - Equipment is functional but shows wear
- `poor` - Equipment is damaged or needs repair

### Equipment Categories
- `Laptops` - Portable computers
- `Cameras` - Photography equipment
- `Lab Equipment` - Scientific laboratory tools
- `Sports` - Sports equipment and gear
- `Musical Instruments` - Instruments for music classes
- `Projectors` - Presentation equipment

### Request Status
- `PENDING` - Waiting for approval
- `APPROVED` - Request approved, equipment can be borrowed
- `REJECTED` - Request denied
- `RETURNED` - Equipment has been returned

---

## Indexes Strategy

### Performance Optimization
1. All foreign keys are indexed for JOIN performance
2. Status fields indexed for filtering pending/active requests
3. Date fields indexed for range queries
4. User lookups optimized with email unique index

### Query Patterns
- **Find available equipment**: `equipment.available > 0 AND equipment.condition = 'good'`
- **User request history**: `requests.user_id = ? ORDER BY created_at DESC`
- **Pending approvals**: `approvals.status = 'PENDING' ORDER BY created_at ASC`
- **Equipment by category**: `equipment.category = ?`

---

## Data Integrity Rules

1. **Cascading Deletes**: Equipment deletion should cascade to specifications but restrict if active requests exist
2. **Quantity Validation**: `equipment.available` must always be ≤ `equipment.quantity`
3. **Date Validation**: `return_date` must be after `request_date`
4. **Status Transitions**: 
   - Request: PENDING → APPROVED/REJECTED → RETURNED
   - Approval: PENDING → APPROVED/REJECTED
5. **Role Validation**: User role must exist in roles table

---

## Maintenance Notes

- **Flyway Migrations**: All schema changes must be versioned through Flyway
- **Denormalization**: `equipment_name` and `user_name` are denormalized in requests/approvals for read performance
- **Audit Trail**: All tables include creation timestamps for audit purposes
- **Password Security**: Passwords must be hashed using BCrypt with minimum 10 rounds
