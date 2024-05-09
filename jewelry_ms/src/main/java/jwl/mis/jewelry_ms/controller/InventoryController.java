package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    Inventory newInventory(@RequestParam("image") MultipartFile image, @RequestParam("pro_id") String pro_id, @RequestParam("pro_name") String pro_name, @RequestParam("description") String description, @RequestParam("author") String author, @RequestParam("startingPrice") String startingPrice) {
        try {
            Inventory newInventory = new Inventory();
            newInventory.setPro_id(pro_id);
            newInventory.setPro_name(pro_name);
            newInventory.setDescription(description);
            newInventory.setAuthor(author);
            newInventory.setStartingPrice(Double.parseDouble(startingPrice));
            newInventory.setImage(image.getBytes()); // Store image data in byte array or BLOB field
            return inventoryRepository.save(newInventory);
        } catch (IOException e) {
            // Handle IO exception
            e.printStackTrace();
            return null;
        }
    public Inventory newInventory(@RequestBody Inventory newInventory) {
        // Save the new inventory item
        return inventoryRepository.save(newInventory);
    }

    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        // Retrieve all inventory items
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{item_id}")
    Inventory getInventoryByItemId(@PathVariable String item_id) throws InterruptedException {
        Inventory[] result = new Inventory[1];
        Thread thread = new Thread(() -> {
            // Perform the database operation in the new thread
            result[0] = inventoryRepository.findById(item_id)
                    .orElseThrow(() -> new InventoryNotFoundException(item_id));
        });
        thread.start();
        thread.join(); // Wait for the thread to finish
        return result[0];
    }

    @PutMapping("/inventory/{pro_id}")
    Inventory updateInventory(@RequestBody Inventory newInventory, @PathVariable String pro_id) {
        try {
            // Fetch the existing inventory item
            Inventory existingInventory = inventoryRepository.findById(pro_id)
                    .orElseThrow(() -> new InventoryNotFoundException(pro_id));

            // Update the properties of the existing inventory item
            existingInventory.setPro_name(newInventory.getPro_name());
            existingInventory.setDescription(newInventory.getDescription());
            existingInventory.setStartingPrice(newInventory.getStartingPrice());
            existingInventory.setImage(newInventory.getImage());

            // Save the updated inventory item
            return inventoryRepository.save(existingInventory);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update inventory item with ID: " + pro_id, e);
        }
    }

    @DeleteMapping("/inventory/{pro_id}")
    String deleteInventory(@PathVariable String pro_id){
        if(!inventoryRepository.existsById(pro_id)){
            throw new InventoryNotFoundException(pro_id);
        }
        inventoryRepository.deleteById(pro_id);
        return "Product with ID "+pro_id+ " has been deleted successfully";
    }

}
