package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Product;
import jwl.mis.jewelry_ms.model.Seller;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Product findProductByEmail(String email);
}
