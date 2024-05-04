package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
}
