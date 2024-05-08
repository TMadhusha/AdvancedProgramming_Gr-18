package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Inventory {
    @Id
    private String pro_id;
    private String pro_name;
    private String description;
    private String author;
    private double startingPrice;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;



}
