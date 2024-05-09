package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exception.BidNotFoundException;
import jwl.mis.jewelry_ms.model.Bids;
import jwl.mis.jewelry_ms.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/bids") // Define base URL for bids-related endpoints
public class BidController {

    @Autowired
    private BidRepository bidRepository;

    @GetMapping
    public List<Bids> getAllBids() {
        // Retrieve all bids
        return bidRepository.findAll();
    }

    @GetMapping("/getcustomer/{cus_id}")
    public List<Bids> getBidsByCustomerId(@PathVariable Long cus_id) {
        // Retrieve bids by customer ID
        return bidRepository.findByCustomerId(cus_id);
    }

    @GetMapping("/{bid_id}")
    public Bids getBidById(@PathVariable Long bid_id) {
        // Retrieve a bid by its ID
        return bidRepository.findById(bid_id)
                .orElseThrow(() -> new BidNotFoundException(bid_id));
    }
}
