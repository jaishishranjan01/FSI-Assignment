export interface Equipment {
  id: string
  name: string
  category: string
  quantity: number
  available: number
  condition: "good" | "fair" | "poor"
  description: string
  image: string
  specifications?: string
  usageInstructions?: string
  restrictions?: string
  location?: string
  lastMaintenance?: string
}

export interface Request {
  id: string
  equipmentName: string
  requestDate: string
  returnDate: string
  status: "pending" | "approved" | "issued" | "returned" | "rejected"
  createdAt: string
}

export interface ApprovalRequest {
  id: string
  studentName: string
  equipmentName: string
  requestDate: string
  returnDate: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "staff" | "admin"
  joinDate: string
  activeRequests: number
  totalBorrows: number
  status: "active" | "suspended"
}

// Mock Equipment Catalog
export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "1",
    name: "Football Kit",
    category: "Sports",
    quantity: 5,
    available: 3,
    condition: "good",
    description: "Complete football kit with ball and cones",
    image: "⚽",
    specifications: "Official FIFA size ball, 4 cones, carrying bag included",
    usageInstructions: "Check equipment condition before and after use. Return in original bag.",
    restrictions: "For authorized sports activities only. Maximum borrow period: 3 days",
    location: "Storage Room A",
    lastMaintenance: "2025-10-15",
  },
  {
    id: "2",
    name: "Microscope",
    category: "Lab Equipment",
    quantity: 10,
    available: 7,
    condition: "good",
    description: "High-power laboratory microscope",
    image: "🔬",
    specifications: "40x-1000x magnification, LED illumination, carrying case included",
    usageInstructions: "Handle with care. Clean lens after each use. Store in carrying case.",
    restrictions: "Lab use only. Requires supervision. Maximum borrow period: 5 days",
    location: "Lab 203",
    lastMaintenance: "2025-09-20",
  },
  {
    id: "3",
    name: "Camera",
    category: "Photography",
    quantity: 3,
    available: 2,
    condition: "good",
    description: "DSLR Camera with lens",
    image: "📷",
    specifications: "24MP sensor, 24-70mm lens, 2 batteries included",
    usageInstructions: "Charge batteries overnight. Return with memory card cleared.",
    restrictions: "For authorized projects only. Maximum borrow period: 7 days",
    location: "Media Center",
    lastMaintenance: "2025-10-01",
  },
  {
    id: "4",
    name: "Guitar",
    category: "Musical Instruments",
    quantity: 4,
    available: 1,
    condition: "fair",
    description: "Acoustic guitar",
    image: "🎸",
    specifications: "6-string acoustic, nylon strings, carrying case",
    usageInstructions: "Handle gently. Avoid direct sunlight. Clean strings after use.",
    restrictions: "For music practice only. Maximum borrow period: 2 days",
    location: "Music Room",
    lastMaintenance: "2025-08-15",
  },
  {
    id: "5",
    name: "Projector",
    category: "Electronics",
    quantity: 2,
    available: 1,
    condition: "good",
    description: "Classroom projector",
    image: "🖥️",
    specifications: "3000 lumens, 1080p resolution, wireless connectivity",
    usageInstructions: "Warm up for 2 minutes before use. Cool down before storage.",
    restrictions: "Indoor use only. Requires booking. Maximum borrow period: 1 day",
    location: "AV Room",
    lastMaintenance: "2025-10-10",
  },
  {
    id: "6",
    name: "Basketball",
    category: "Sports",
    quantity: 8,
    available: 5,
    condition: "good",
    description: "Official size basketball",
    image: "🏀",
    specifications: "Size 7, indoor/outdoor use, official weight",
    usageInstructions: "Check pressure before use. Store in cool, dry place.",
    restrictions: "For sports activities only. Maximum borrow period: 3 days",
    location: "Storage Room A",
    lastMaintenance: "2025-10-12",
  },
]

// Mock User Requests
export const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    equipmentName: "Football Kit",
    requestDate: "2025-11-15",
    returnDate: "2025-11-18",
    status: "approved",
    createdAt: "2025-11-10",
  },
  {
    id: "2",
    equipmentName: "Microscope",
    requestDate: "2025-11-20",
    returnDate: "2025-11-22",
    status: "pending",
    createdAt: "2025-11-12",
  },
  {
    id: "3",
    equipmentName: "Camera",
    requestDate: "2025-11-08",
    returnDate: "2025-11-10",
    status: "issued",
    createdAt: "2025-11-05",
  },
]

// Mock Approval Requests
export const MOCK_APPROVALS: ApprovalRequest[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    equipmentName: "Microscope",
    requestDate: "2025-11-20",
    returnDate: "2025-11-22",
    status: "pending",
    requestedAt: "2025-11-12",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    equipmentName: "Camera",
    requestDate: "2025-11-16",
    returnDate: "2025-11-18",
    status: "pending",
    requestedAt: "2025-11-11",
  },
  {
    id: "3",
    studentName: "Charlie Brown",
    equipmentName: "Football Kit",
    requestDate: "2025-11-15",
    returnDate: "2025-11-17",
    status: "approved",
    requestedAt: "2025-11-10",
  },
]

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@school.com",
    role: "student",
    joinDate: "2024-09-15",
    activeRequests: 2,
    totalBorrows: 8,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@school.com",
    role: "student",
    joinDate: "2024-10-01",
    activeRequests: 1,
    totalBorrows: 3,
    status: "active",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@school.com",
    role: "staff",
    joinDate: "2024-08-20",
    activeRequests: 0,
    totalBorrows: 12,
    status: "active",
  },
]

// Analytics Dashboard Stats
export const DASHBOARD_STATS = {
  totalEquipment: 36,
  availableEquipment: 21,
  pendingRequests: 5,
  overdueReturns: 2,
}

export const RECENT_ACTIVITY = [
  { id: 1, action: "Approved request", item: "Microscope", user: "Alice Johnson", time: "2 hours ago" },
  { id: 2, action: "Equipment returned", item: "Camera", user: "David Lee", time: "4 hours ago" },
  { id: 3, action: "New request", item: "Football Kit", user: "Emma Davis", time: "6 hours ago" },
  { id: 4, action: "Equipment issued", item: "Projector", user: "Frank Miller", time: "1 day ago" },
]

export const CATEGORY_STATS = [
  { category: "Sports", equipment: 8, available: 5, usage: "62%" },
  { category: "Lab Equipment", equipment: 10, available: 7, usage: "30%" },
  { category: "Photography", equipment: 3, available: 2, usage: "33%" },
  { category: "Musical Instruments", equipment: 4, available: 1, usage: "75%" },
  { category: "Electronics", equipment: 2, available: 1, usage: "50%" },
]

// Demo Users for Login
export const DEMO_USERS = {
  "student@school.com": { id: "1", role: "student", name: "John Student", email: "student@school.com" },
  "admin@school.com": { id: "2", role: "admin", name: "Admin User", email: "admin@school.com" },
  "staff@school.com": { id: "3", role: "staff", name: "Lab Staff", email: "staff@school.com" },
}
