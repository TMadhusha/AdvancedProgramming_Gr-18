package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findAdminByEmail(String email);


}
