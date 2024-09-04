"use client";
import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee, employeeType } from '../services/api';
import Link from 'next/link';

const Home = () => {
    const [employees, setEmployees] = useState<employeeType[]>([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    console.log(employees);

    const fetchEmployees = async () => {
        try {
            const { data } = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee(id);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Employee List</h1>
            <Link href="/add-employee" className="text-blue-500 hover:underline mb-4 inline-block">
                Add New 
            </Link>
            <ul className="list-disc pl-5 space-y-2">
                {employees.map((emp: employeeType) => (
                    <li key={emp.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                        <span className="font-semibold">{emp.name}</span> - 
                        <span>{emp.position}</span> - 
                        <span className="text-green-500">${emp.salary}</span>
                        <div className="space-x-2">
                            <Link href={`/update-emp/${emp.id}`} className="text-blue-500 hover:underline"> Edit
                            </Link>
                            <button 
                                onClick={() => handleDelete(emp.id)} 
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
