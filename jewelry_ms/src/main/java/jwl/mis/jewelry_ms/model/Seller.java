package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seller_id;
    private String user_name;

    private String password;
    private String email;
    private String address;
    private String mobile;
    private String Role;
    private String description;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] sellerIcon;


}
