package jwl.mis.jewelry_ms.exception;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(String emp_id){
        super("Could not found the employee with id "+emp_id);
    }
}
