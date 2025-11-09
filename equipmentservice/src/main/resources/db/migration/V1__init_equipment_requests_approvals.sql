-- equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  quantity INT DEFAULT 0,
  available INT DEFAULT 0,
  condition VARCHAR(100),
  location VARCHAR(255),
  usage_instructions TEXT,
  restrictions TEXT,
  last_maintenance DATE,
  maintenance_interval INT
);

-- requests table
CREATE TABLE IF NOT EXISTS equipment_requests (
  id BIGSERIAL PRIMARY KEY,
  equipment_id BIGINT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL,
  request_date DATE NOT NULL,
  return_date DATE,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- approvals table
CREATE TABLE IF NOT EXISTS approvals (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  equipment_id BIGINT NOT NULL,
  request_date DATE NOT NULL,
  return_date DATE,
  reason TEXT,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
