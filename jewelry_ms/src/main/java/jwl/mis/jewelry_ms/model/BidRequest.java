package jwl.mis.jewelry_ms.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BidRequest {
    private BigDecimal amount;
    private boolean isAutomatic;

    public BidRequest(BigDecimal amount, boolean isAutomatic) {
        this.amount = amount;
        this.isAutomatic = isAutomatic;
    }
}
