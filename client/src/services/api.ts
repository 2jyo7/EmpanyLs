import axios from 'axios';

export interface employeeType {
    id: number;
    name: string;
    position: string;
    salary: number;
}

export interface updateEmpType {
    name: string;
    position: string;
    salary: number;
}

const api = axios.create({
    baseURL: 'http://localhost:2100', // Replace with your backend URL
});

// Fetch all employees
export const getEmployees = () => api.get('/empList');

// Fetch an employee by ID
export const getEmployeesById = (id: number) => api.get(`/empList/${id}`);

// Add a new employee
export const addEmployee = (employee: employeeType) => api.post('/addEmpList', employee);

// Update an existing employee by ID
export const updateEmployee = (id: number, employee: updateEmpType) => api.put(`/updateEmpList/${id}`, employee);

// Delete an employee by ID
export const deleteEmployee = (id: number) => api.delete(`/deleteEmpList/${id}`);
