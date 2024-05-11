package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Customer;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BidRequest {
    private String productId;
    private double bidAmount;
    private Customer customer;

}
