package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory,String> {


}
