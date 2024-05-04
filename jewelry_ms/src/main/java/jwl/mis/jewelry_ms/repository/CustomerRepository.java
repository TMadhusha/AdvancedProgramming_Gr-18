package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {


}
