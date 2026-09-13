package com.ems.employeemanagement.exception;

/**
 * Thrown when an employee with a given id does not exist in the database.
 * Handled globally by GlobalExceptionHandler to return a clean 404 response.
 */
public class EmployeeNotFoundException extends RuntimeException {

    public EmployeeNotFoundException(Long id) {
        super("Employee not found with id: " + id);
    }

    public EmployeeNotFoundException(String message) {
        super(message);
    }
}
