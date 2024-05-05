package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller,Long> {
    Seller findSellerByEmail(String email);
}
