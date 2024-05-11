package jwl.mis.jewelry_ms.exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(String pro_id){
        super("Could not found the Product with Item Id "+ pro_id);
    }
}
