package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Customer;
import jwl.mis.jewelry_ms.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository  extends JpaRepository<Seller,Long> {
      Seller findByUserNameAndPassword(String userName, String password);
}
