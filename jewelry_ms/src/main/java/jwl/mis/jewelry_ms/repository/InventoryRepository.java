package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface InventoryRepository extends JpaRepository<Inventory, String> {
    List<Inventory> findBySeller(Seller seller);

    @Query("SELECT i FROM Inventory i WHERE i.seller.seller_id = :seller_id")
    List<Inventory> findBySellerId(@Param("seller_id")Long seller_id);

}

