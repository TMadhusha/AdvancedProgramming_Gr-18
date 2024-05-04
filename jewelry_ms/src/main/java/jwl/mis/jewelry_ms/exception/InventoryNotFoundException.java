package jwl.mis.jewelry_ms.exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(String item_id){
        super("Could not found the Product with Item Id "+item_id);
    }
}
