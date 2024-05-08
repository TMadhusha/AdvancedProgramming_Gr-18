package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Custommer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Custommer,Long> {
    Custommer findCustomerByEmail(String email);


}
