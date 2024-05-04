package jwl.mis.jewelry_ms.controller;
import jwl.mis.jewelry_ms.exception.InventoryNotFoundException;
import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    Inventory newInventory(@RequestBody Inventory newInventory){
        return inventoryRepository.save(newInventory);
    }
    @GetMapping("/inventory")
    List<Inventory> getAllInventory(){
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{item_id}")
    Inventory getInventoryByItemId(@PathVariable String item_id){
        return inventoryRepository.findById(item_id)
                .orElseThrow(()->new InventoryNotFoundException(item_id));
    }

    @PutMapping("/inventory/{item_id}")
    Inventory updateInventory(@RequestBody Inventory newInventory,@PathVariable String item_id){
        System.out.println("test");
        return inventoryRepository.findById(item_id)
                .map(inventory -> {
                    inventory.setItemName(newInventory.getItemName());
                    inventory.setType(newInventory.getType());
                    inventory.setActualPrice(newInventory.getActualPrice());
                    inventory.setDescription(newInventory.getDescription());
                    inventory.setSellingPrice(newInventory.getSellingPrice());
                    inventory.setAvailableStock(newInventory.getAvailableStock());

                    return inventoryRepository.save(inventory);
                }).orElseThrow(()->new InventoryNotFoundException(item_id));
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
