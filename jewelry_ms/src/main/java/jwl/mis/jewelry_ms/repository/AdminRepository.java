package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {

    Admin findAdminByUsername(String username);

}
