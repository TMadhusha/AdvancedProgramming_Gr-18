package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Bids {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bid_id;
    @ManyToOne
    @JoinColumn(name="pro_id")
    private Inventory inventory;

    @ManyToOne
    @JoinColumn(name="cus_id")
    private Customer customer;

    private double bidPrice;

    private LocalDate date;


    public void setCurrentPrice(double bidAmount) {
    }
}
