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

   
}
