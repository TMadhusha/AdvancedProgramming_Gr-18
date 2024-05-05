package jwl.mis.jewelry_ms.exception;

public class SellerNotFoundException extends RuntimeException{
    public SellerNotFoundException(String email){
        super(email+" "+"; try Another Email...");
    }
}
