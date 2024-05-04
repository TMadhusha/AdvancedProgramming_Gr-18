package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.OnlinePayments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlinePaymentRepository extends JpaRepository<OnlinePayments, Long> {
    // Define custom query methods if needed
}
