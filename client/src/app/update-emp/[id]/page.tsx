"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEmployeesById, updateEmployee, updateEmpType } from '@/services/api ';

interface UpdateEmployeesProps {
    params: { id: number };
}

const UpdateEmployees: React.FC<UpdateEmployeesProps> = ({ params }) => {
    const { id } = params;
    const [input, setInput] = useState<updateEmpType>({
        name: "",
        position: "",
        salary: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await getEmployeesById(id);
                const employeeData = response.data[0]; // Assuming response.data is an array
                if (employeeData) {
                    setInput({
                        name: employeeData.name || "",
                        position: employeeData.position || "",
                        salary: employeeData.salary || 0,
                    });
                } else {
                    setError('No employee data found for ID: ' + id);
                }
            } catch (error) {
                setError('Error fetching employee data: ' + (error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEmployee(id, input);
            router.push('/');
        } catch (error) {
            console.error('Error updating employee:', error);
            setError('Error updating employee: ' + (error as Error).message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: name === 'salary' ? Number(value) : value,
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployees;
