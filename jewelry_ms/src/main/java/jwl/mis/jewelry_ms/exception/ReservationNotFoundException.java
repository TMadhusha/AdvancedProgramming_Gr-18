package jwl.mis.jewelry_ms.exception;

public class ReservationNotFoundException extends RuntimeException{
    public ReservationNotFoundException (Long reservation_id){
            super("Could not find the reservation with id " + reservation_id);
    }
}
