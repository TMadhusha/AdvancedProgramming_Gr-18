package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.InventoryRepository;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    private final SellerRepository sellerRepository;

    public InventoryController(SellerRepository sellerRepository, InventoryRepository inventoryRepository) {
        this.sellerRepository = sellerRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @PostMapping("/inventory")
    public Inventory newInventory(@RequestBody Inventory newInventory) {
        // Save the new inventory item
        return inventoryRepository.save(newInventory);
    }

    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        // Retrieve all inventory items
        return inventoryRepository.findAll();
    }


    @GetMapping("/inventory/seller")
    public List<Inventory> getInventoryBySellerId(@RequestParam String sellerId) {
        // Fetch the Seller object based on the sellerId
        Seller seller = sellerRepository.findById(Long.valueOf(sellerId)).orElse(null);
        if (seller == null) {
            // Handle the case when seller is not found
            return new ArrayList<>(); // Or throw an exception
        }
        // Retrieve inventory items for the fetched seller
        return inventoryRepository.findBySeller(seller);
    }



}

