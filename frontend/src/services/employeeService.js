import axios from "axios";

const API_BASE_URL = 'https://employee-management-backend-1cyi.onrender.com/api/employees';

// Centralized API calls for the Employee resource.
const employeeService = {
  getAll: () => axios.get(API_BASE_URL),

  getById: (id) => axios.get(`${API_BASE_URL}/${id}`),

  create: (employee) => axios.post(API_BASE_URL, employee),

  update: (id, employee) => axios.put(`${API_BASE_URL}/${id}`, employee),

  remove: (id) => axios.delete(`${API_BASE_URL}/${id}`),

  searchByName: (name) =>
    axios.get(`${API_BASE_URL}/search`, { params: { name } }),

  getByDepartment: (department) =>
    axios.get(`${API_BASE_URL}/department/${department}`),
};

export default employeeService;