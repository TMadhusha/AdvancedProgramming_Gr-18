package jwl.mis.jewelry_ms.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
public class BidItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidItem_id;

    private String name;
    private String description;
    private BigDecimal currentBid;
    private String timeRemaining;

    public BidItems(Long bidItem_id, String name, String description, BigDecimal currentBid, String timeRemaining) {
        this.bidItem_id = bidItem_id;
        this.name = name;
        this.description = description;
        this.currentBid = currentBid;
        this.timeRemaining = timeRemaining;
    }

    public BidItems() {
    }

    public Long getBidItem_id() {
        return bidItem_id;
    }

    public void setBidItem_id(Long bidItem_id) {
        this.bidItem_id = bidItem_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getCurrentBid() {
        return currentBid;
    }

    public void setCurrentBid(BigDecimal currentBid) {
        this.currentBid = currentBid;
    }

    public String getTimeRemaining() {
        return timeRemaining;
    }

    public void setTimeRemaining(String timeRemaining) {
        this.timeRemaining = timeRemaining;
    }
}
