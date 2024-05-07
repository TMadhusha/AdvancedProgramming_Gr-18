package jwl.mis.jewelry_ms.model;


import jakarta.persistence.*;
import lombok.Data;
import java.sql.Blob;
import java.util.Date;

@Entity
@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long product_id;
    private String productname;
    private Long startingprice;
    private String description;
    private String author;
    //private Long seller_id;
    @Column(name = "email")
    private String email;







}



