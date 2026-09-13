import React from "react";

// Pure presentational component: just renders the given list of employees
// and delegates edit/delete actions back up to the parent via callbacks.
export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p className="empty-state">No employees found.</p>;
  }

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Job Title</th>
          <th>Salary</th>
          <th>Date of Joining</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.firstName} {emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.jobTitle}</td>
            <td>₹{emp.salary}</td>
            <td>{emp.dateOfJoining || "-"}</td>
            <td>
              <button className="link-btn" onClick={() => onEdit(emp)}>Edit</button>
              <button
                className="link-btn danger"
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
