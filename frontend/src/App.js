import React, { useEffect, useState, useCallback } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import employeeService from "./services/employeeService";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = searchTerm
        ? await employeeService.searchByName(searchTerm)
        : await employeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      setError("Could not connect to the backend. Is the Spring Boot server running on port 8080?");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    await employeeService.remove(id);
    fetchEmployees();
  };

  const handleSaved = () => {
    setEditingEmployee(null);
    fetchEmployees();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Management System</h1>
        <p>A simple full-stack CRUD app — Spring Boot + React + MySQL</p>
      </header>

      <main className="app-main">
        <EmployeeForm
          editingEmployee={editingEmployee}
          onSaved={handleSaved}
          onCancel={() => setEditingEmployee(null)}
        />

        <div className="list-section">
          <div className="list-header">
            <h2>Employees</h2>
            <input
              className="search-box"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <EmployeeList
              employees={employees}
              onEdit={setEditingEmployee}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
