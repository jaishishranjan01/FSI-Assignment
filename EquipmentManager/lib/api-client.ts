// This file provides a centralized API client that can be easily replaced
// with real backend API calls. Currently uses mock data for development.

import {
  MOCK_EQUIPMENT,
  MOCK_REQUESTS,
  MOCK_APPROVALS,
  MOCK_USERS,
  DASHBOARD_STATS,
  RECENT_ACTIVITY,
  CATEGORY_STATS,
  type Equipment,
  type Request,
  type ApprovalRequest,
  type User,
} from "./mock-data"

// ============================================================================
// EQUIPMENT ENDPOINTS
// ============================================================================

export const equipmentAPI = {
  /**
   * Get all equipment
   * TODO: Replace with: GET /api/equipment
   */
  async getAll(): Promise<Equipment[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_EQUIPMENT
  },

  /**
   * Get equipment by ID
   * TODO: Replace with: GET /api/equipment/:id
   */
  async getById(id: string): Promise<Equipment | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_EQUIPMENT.find((e) => e.id === id) || null
  },

  /**
   * Search equipment
   * TODO: Replace with: GET /api/equipment/search?q=:query&category=:category
   */
  async search(query: string, category?: string): Promise<Equipment[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    let results = MOCK_EQUIPMENT

    if (query) {
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      results = results.filter((e) => e.category === category)
    }

    return results
  },

  /**
   * Create new equipment
   * TODO: Replace with: POST /api/equipment
   */
  async create(data: Omit<Equipment, "id">): Promise<Equipment> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newEquipment: Equipment = {
      ...data,
      id: Date.now().toString(),
    }
    MOCK_EQUIPMENT.push(newEquipment)
    return newEquipment
  },

  /**
   * Update equipment
   * TODO: Replace with: PUT /api/equipment/:id
   */
  async update(id: string, data: Partial<Equipment>): Promise<Equipment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = MOCK_EQUIPMENT.findIndex((e) => e.id === id)
    if (index === -1) return null
    MOCK_EQUIPMENT[index] = { ...MOCK_EQUIPMENT[index], ...data }
    return MOCK_EQUIPMENT[index]
  },

  /**
   * Delete equipment
   * TODO: Replace with: DELETE /api/equipment/:id
   */
  async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = MOCK_EQUIPMENT.findIndex((e) => e.id === id)
    if (index === -1) return false
    MOCK_EQUIPMENT.splice(index, 1)
    return true
  },
}

// ============================================================================
// REQUEST ENDPOINTS
// ============================================================================

export const requestAPI = {
  /**
   * Get all requests for a user
   * TODO: Replace with: GET /api/requests?userId=:userId
   */
  async getUserRequests(userId: string): Promise<Request[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_REQUESTS
  },

  /**
   * Create new request
   * TODO: Replace with: POST /api/requests
   */
  async create(data: {
    equipmentId: string
    requestDate: string
    returnDate: string
    notes?: string
  }): Promise<Request> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const equipment = MOCK_EQUIPMENT.find((e) => e.id === data.equipmentId)
    if (!equipment) throw new Error("Equipment not found")

    const newRequest: Request = {
      id: Date.now().toString(),
      equipmentName: equipment.name,
      requestDate: data.requestDate,
      returnDate: data.returnDate,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    MOCK_REQUESTS.push(newRequest)
    return newRequest
  },

  /**
   * Update request status
   * TODO: Replace with: PATCH /api/requests/:id/status
   */
  async updateStatus(id: string, status: Request["status"]): Promise<Request | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const request = MOCK_REQUESTS.find((r) => r.id === id)
    if (!request) return null
    request.status = status
    return request
  },
}

// ============================================================================
// APPROVAL ENDPOINTS
// ============================================================================

export const approvalAPI = {
  /**
   * Get pending approvals
   * TODO: Replace with: GET /api/approvals?status=pending
   */
  async getPending(): Promise<ApprovalRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_APPROVALS.filter((a) => a.status === "pending")
  },

  /**
   * Get all approvals
   * TODO: Replace with: GET /api/approvals
   */
  async getAll(): Promise<ApprovalRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_APPROVALS
  },

  /**
   * Approve a request
   * TODO: Replace with: POST /api/approvals/:id/approve
   */
  async approve(id: string): Promise<ApprovalRequest | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const approval = MOCK_APPROVALS.find((a) => a.id === id)
    if (!approval) return null
    approval.status = "approved"
    return approval
  },

  /**
   * Reject a request
   * TODO: Replace with: POST /api/approvals/:id/reject
   */
  async reject(id: string): Promise<ApprovalRequest | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const approval = MOCK_APPROVALS.find((a) => a.id === id)
    if (!approval) return null
    approval.status = "rejected"
    return approval
  },
}

// ============================================================================
// USER ENDPOINTS
// ============================================================================

export const userAPI = {
  /**
   * Get all users
   * TODO: Replace with: GET /api/users
   */
  async getAll(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_USERS
  },

  /**
   * Search users
   * TODO: Replace with: GET /api/users/search?q=:query&role=:role
   */
  async search(query?: string, role?: string): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    let results = MOCK_USERS

    if (query) {
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (role && role !== "all") {
      results = results.filter((u) => u.role === role)
    }

    return results
  },

  /**
   * Update user status
   * TODO: Replace with: PATCH /api/users/:id/status
   */
  async updateStatus(id: string, status: User["status"]): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) return null
    user.status = status
    return user
  },
}

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

export const analyticsAPI = {
  /**
   * Get dashboard stats
   * TODO: Replace with: GET /api/analytics/stats
   */
  async getStats() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DASHBOARD_STATS
  },

  /**
   * Get recent activity
   * TODO: Replace with: GET /api/analytics/activity
   */
  async getActivity() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return RECENT_ACTIVITY
  },

  /**
   * Get category statistics
   * TODO: Replace with: GET /api/analytics/categories
   */
  async getCategories() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return CATEGORY_STATS
  },
}
