import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  jobTitle: "",
  salary: "",
  dateOfJoining: "",
};

// Handles both "create new employee" and "edit existing employee"
// depending on whether `editingEmployee` prop is set.
export default function EmployeeForm({ editingEmployee, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
    } else {
      setForm(emptyForm);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, form);
      } else {
        await employeeService.create(form);
      }
      setForm(emptyForm);
      onSaved();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(
          err.response?.data?.message || "Something went wrong while saving."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>

      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Job Title</label>
          <input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />
          {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={form.dateOfJoining || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingEmployee ? "Update" : "Add Employee"}
        </button>
        {editingEmployee && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
