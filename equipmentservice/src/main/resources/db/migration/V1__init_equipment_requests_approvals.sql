-- =============================
-- Table: equipment
-- =============================
CREATE TABLE equipment (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    quantity INT NOT NULL,
    available INT NOT NULL,
    condition VARCHAR(50),
    location VARCHAR(255),
    usage_instructions TEXT,
    restrictions TEXT,
    last_maintenance DATE,
    maintenance_interval INT
);

CREATE TABLE equipment_specifications (
    equipment_id BIGINT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    specifications VARCHAR(255) NOT NULL
);

-- =============================
-- Table: approvals
-- =============================
CREATE TABLE approvals (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    equipment_id VARCHAR(100) NOT NULL,
    equipment_name VARCHAR(255) NOT NULL,
    request_date DATE,
    return_date DATE,
    reason TEXT,
    status VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at DATE
);

-- =============================
-- Table: requests
-- =============================
CREATE TABLE requests (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    equipment_id VARCHAR(100) NOT NULL,
    equipment_name VARCHAR(255) NOT NULL,
    request_date DATE,
    return_date DATE,
    notes TEXT,
    status VARCHAR(20) NOT NULL,
    created_at DATE
);
