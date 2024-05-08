package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long product_id;

    private String productname;
    private String startingprice;
    private String description;
    private String author;
    @Column(name = "email")
    private String email;


}
