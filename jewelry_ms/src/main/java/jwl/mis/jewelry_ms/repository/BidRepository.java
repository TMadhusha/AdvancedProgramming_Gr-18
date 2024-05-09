
package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Bids;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BidRepository extends JpaRepository<Bids,Long> {

    @Query("SELECT b FROM Bids b WHERE b.customer.cus_id = :cusId")
    List<Bids> findByCustomerId(@Param("cusId") Long cusId);

}
