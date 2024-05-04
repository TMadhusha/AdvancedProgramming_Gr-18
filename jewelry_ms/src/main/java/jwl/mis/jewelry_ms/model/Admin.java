package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminid;
    private String username;
    private String id;
    private String password;




}