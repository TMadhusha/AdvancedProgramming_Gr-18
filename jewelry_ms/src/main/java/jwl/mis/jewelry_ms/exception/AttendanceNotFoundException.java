package jwl.mis.jewelry_ms.exception;

public class AttendanceNotFoundException extends RuntimeException{
    public AttendanceNotFoundException(Long att_id){
        super("Could not found the employee with id "+att_id);
    }
}
