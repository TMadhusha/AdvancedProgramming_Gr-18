package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Bids;
import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.repository.BidRepository;
import jwl.mis.jewelry_ms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class BidController {

    private static final Logger LOGGER = Logger.getLogger(BidController.class.getName());

    private final BidRepository bidRepository;
    private final InventoryRepository inventoryRepository;

    @Autowired
    public BidController(BidRepository bidRepository, InventoryRepository inventoryRepository) {
        this.bidRepository = bidRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @PostMapping("/bid")
    public ResponseEntity<String> placeBid(@RequestBody BidRequest bidRequest) {
        try {
            // Retrieve inventory item
            Optional<Inventory> optionalInventory = inventoryRepository.findById(bidRequest.getProductId());
            if (optionalInventory.isPresent()) {
                Inventory inventory = optionalInventory.get();

                // Check if bid price is higher than current price
                if (bidRequest.getBidAmount() > inventory.getCurrentPrice()) {
                    Bids bid = new Bids();
                    bid.setInventory(inventory);
                    bid.setCustomer(bidRequest.getCustomer());
                    bid.setBidPrice(bidRequest.getBidAmount());
                    bid.setCurrentPrice(bidRequest.getBidAmount()); // Set current price to bid amount
                    bid.setDate(LocalDate.now());

                    // Save the bid
                    bidRepository.save(bid);

                    // Update the current price of the inventory item
                    inventory.setCurrentPrice(bidRequest.getBidAmount());
                    inventoryRepository.save(inventory); // Save changes to the inventory

                    return ResponseEntity.ok("Bid placed successfully.");
                } else {
                    return ResponseEntity.badRequest().body("Bid amount must be higher than current price.");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error occurred while placing bid", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while placing bid.");
        }
    }

    @GetMapping("/bids")
    public List<Bids> getAllBids() {
        return bidRepository.findAll();
    }


}
