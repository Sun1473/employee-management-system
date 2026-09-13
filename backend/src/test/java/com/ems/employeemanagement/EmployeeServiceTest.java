package com.ems.employeemanagement;

import com.ems.employeemanagement.entity.Employee;
import com.ems.employeemanagement.exception.EmployeeNotFoundException;
import com.ems.employeemanagement.repository.EmployeeRepository;
import com.ems.employeemanagement.service.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Simple unit tests for EmployeeServiceImpl using Mockito to mock the repository layer,
 * so we test business logic in isolation without needing a real database.
 */
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    private EmployeeServiceImpl employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        employeeService = new EmployeeServiceImpl(employeeRepository);
    }

    @Test
    void getEmployeeById_shouldReturnEmployee_whenFound() {
        Employee employee = new Employee(1L, "Rahul", "Sharma", "rahul@example.com",
                "Engineering", "Software Developer", 45000.0, null);
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        Employee result = employeeService.getEmployeeById(1L);

        assertEquals("Rahul", result.getFirstName());
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    void getEmployeeById_shouldThrowException_whenNotFound() {
        when(employeeRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(EmployeeNotFoundException.class,
                () -> employeeService.getEmployeeById(99L));
    }

    @Test
    void createEmployee_shouldSaveEmployee_whenEmailIsUnique() {
        Employee employee = new Employee(null, "Priya", "Verma", "priya@example.com",
                "HR", "HR Executive", 35000.0, null);
        when(employeeRepository.findByEmail("priya@example.com")).thenReturn(Optional.empty());
        when(employeeRepository.save(employee)).thenReturn(employee);

        Employee result = employeeService.createEmployee(employee);

        assertNotNull(result);
        assertEquals("Priya", result.getFirstName());
    }
}
