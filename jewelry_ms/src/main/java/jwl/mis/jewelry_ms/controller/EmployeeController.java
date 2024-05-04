package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exception.EmployeeNotFoundException;
import jwl.mis.jewelry_ms.model.Employee;
import jwl.mis.jewelry_ms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    //post the values to the database
    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee){
        return employeeRepository.save(newEmployee);
    }
    //get values form database
    @GetMapping("/employees")
    List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    //get values by using specific Id for updation
    @GetMapping("/employee/{emp_id}")
    Employee getEmployeeById(@PathVariable String emp_id){
        return employeeRepository.findById(emp_id)
                .orElseThrow(()->new EmployeeNotFoundException(emp_id));
    }

   //update the specific values by using the Id
    @PutMapping("/employee/{emp_id}")
    Employee updateEmployee(@RequestBody Employee newEmployee,@PathVariable String emp_id){
        return employeeRepository.findById(emp_id)
                .map(employee -> {
                    employee.setFirstname(newEmployee.getFirstname());
                    employee.setLastname(newEmployee.getLastname());
                    employee.setAddress(newEmployee.getAddress());
                    employee.setEmail(newEmployee.getEmail());
                    employee.setPhoneNo(newEmployee.getPhoneNo());
                    return employeeRepository.save(employee);
                }).orElseThrow(()->new EmployeeNotFoundException(emp_id));
    }

    //delete the specific Id
    @DeleteMapping("/employee/{emp_id}")
    String deleteEmployee(@PathVariable String emp_id){
        if(!employeeRepository.existsById(emp_id)){
            throw new EmployeeNotFoundException(emp_id);
        }
        employeeRepository.deleteById(emp_id);
        return "Employee with ID "+emp_id+ " has been deleted succesfully";
    }
}
