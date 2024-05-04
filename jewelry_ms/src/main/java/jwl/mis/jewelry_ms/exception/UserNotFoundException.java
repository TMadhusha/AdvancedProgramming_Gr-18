package jwl.mis.jewelry_ms.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long sup_id){
        super(sup_id+" "+"Is not Valid...");
    }
}
