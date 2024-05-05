package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.BidItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidItemsRepository extends JpaRepository<BidItems, Long> {
}
