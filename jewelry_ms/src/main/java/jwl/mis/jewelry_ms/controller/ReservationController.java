package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Customer;
import jwl.mis.jewelry_ms.model.Reservation;
import jwl.mis.jewelry_ms.repository.CustomerRepository;
import jwl.mis.jewelry_ms.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping("/postreservations")
    Reservation newReservation(@RequestBody Reservation newReservation){
        return reservationRepository.save(newReservation);
    }
    @GetMapping("/getreservations")
    List<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }

}
