package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class SellerSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long session_id;
    private Long seller_id;
    private String username;
    private String phonenumber;
    private String email;
    private String password;
    private String address;
    private String dob;
    private String role;




}