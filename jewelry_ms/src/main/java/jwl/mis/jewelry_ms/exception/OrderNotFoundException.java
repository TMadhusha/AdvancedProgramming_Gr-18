package jwl.mis.jewelry_ms.exception;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(Long order_id){
        super("Could not find the order with id " + order_id);
    }
}
