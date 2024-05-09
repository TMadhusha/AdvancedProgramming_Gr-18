package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import jwl.mis.jewelry_ms.model.Seller;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String pro_id;
    private String name;
    private String description;
    private String author;
    private double startingPrice;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;
}
