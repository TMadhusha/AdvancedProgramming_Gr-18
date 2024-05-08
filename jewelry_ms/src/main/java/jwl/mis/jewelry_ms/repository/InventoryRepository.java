package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Inventory findProductByEmail(String email);
}
