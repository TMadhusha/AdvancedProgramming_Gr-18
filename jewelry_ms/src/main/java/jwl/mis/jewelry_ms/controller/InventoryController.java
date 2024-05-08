package jwl.mis.jewelry_ms.controller;
import jwl.mis.jewelry_ms.exception.InventoryNotFoundException;
import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    Inventory newInventory(@RequestBody Inventory newInventory){
        Thread thread = new Thread(() -> {
            // Perform the database operation in the new thread
            inventoryRepository.save(newInventory);
        });

        // Start the thread
        thread.start();

        // Return a response immediately
        return newInventory;
    }
    @GetMapping("/inventory")
    List<Inventory> getAllInventory() throws InterruptedException, ExecutionException {
        CompletableFuture<List<Inventory>> future = CompletableFuture.supplyAsync(() -> {
            // Perform the database operation in a separate thread
            return inventoryRepository.findAll();
        });
        return future.get(); // Wait for the asynchronous operation to complete and return the result
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

    @PutMapping("/inventory/{item_id}")
    Inventory updateInventory(@RequestBody Inventory newInventory,@PathVariable String item_id) throws InterruptedException {
        Inventory[] result = new Inventory[1];
        Thread thread = new Thread(() -> {
            // Perform the database operation in the new thread
            result[0] = inventoryRepository.findById(item_id)
                    .map(inventory -> {
                        inventory.setPro_name(newInventory.getPro_name());
                        inventory.setDescription(newInventory.getDescription());
                        inventory.setStartingPrice(newInventory.getStartingPrice());
                        inventory.setImage(newInventory.getImage());
                        return inventoryRepository.save(inventory);
                    }).orElseThrow(() -> new InventoryNotFoundException(item_id));
        });
        thread.start();
        thread.join(); // Wait for the thread to finish
        return result[0];
    }

    @DeleteMapping("/inventory/{item_id}")
    String deleteInventory(@PathVariable String item_id){
        if(!inventoryRepository.existsById(item_id)){
            throw new InventoryNotFoundException(item_id);
        }
        inventoryRepository.deleteById(item_id);
        return "Product with ID "+item_id+ " has been deleted successfully";
    }

}
