package jwl.mis.jewelry_ms.exception;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(Long cus_id){
        super("Could not find the user with id " + cus_id);
    }
}
