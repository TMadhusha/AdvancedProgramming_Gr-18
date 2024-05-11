package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SellerController {
    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/postseller")
    Seller newSeller(@RequestBody Seller newSeller){
        return sellerRepository.save(newSeller);
    }

    @GetMapping("/getseller")
    List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }

}
