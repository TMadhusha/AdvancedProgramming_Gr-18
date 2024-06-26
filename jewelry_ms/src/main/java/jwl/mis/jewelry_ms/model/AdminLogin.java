package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AdminLogin {
    //Fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long admin_id;
    private String username;
    private String password;
    private String email;
    private String mobile;




}
