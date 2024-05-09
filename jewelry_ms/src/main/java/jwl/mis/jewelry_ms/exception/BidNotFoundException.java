package jwl.mis.jewelry_ms.exception;

public class BidNotFoundException extends RuntimeException {
    public BidNotFoundException(Long bid_id) {
        super("Could not find the bid with id " + bid_id);
    }
}
