package jwl.mis.jewelry_ms.exception;

public class SellerNotFoundException extends RuntimeException {
    public SellerNotFoundException(Long seller_id){
        super("Could not find the seller with id " + seller_id);
    }
}
