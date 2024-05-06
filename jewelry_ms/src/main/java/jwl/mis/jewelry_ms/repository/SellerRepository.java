package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller,Long> {
    Seller findSellerByEmail(String email);


}
