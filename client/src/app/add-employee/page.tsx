"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEmployee, employeeType } from '@/services/api ';

const AddEmployee = () => {
    const [input, setInput] = useState<employeeType>({
        id: 0,
        name: "",
        position: "",
        salary: 0,
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addEmployee(input);
            router.push('/');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: name === 'salary' || name === 'id' ? Number(value) : value,
        }));
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="number"
                        name="id"
                        placeholder="Employee ID"
                        value={input.id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Employee Name"
                        value={input.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="position"
                        placeholder="Employee Position"
                        value={input.position}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="salary"
                        placeholder="Employee Salary"
                        value={input.salary}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
