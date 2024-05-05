package jwl.mis.jewelry_ms.controller;



import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/save-seller")
    Seller newSupplier(@RequestBody Seller newSeller){
        System.out.println(newSeller);
        return sellerRepository.save(newSeller);
    }
    @GetMapping("/get-seller")
    List<Seller>getAllSeller(){
        return sellerRepository.findAll();
    }

@GetMapping("/update/{seller_id}") //for lodesupplier
Seller getSellerById(@PathVariable("seller_id") Long seller_id){
    return sellerRepository.findById(seller_id)
            .orElseThrow(()->new UserNotFoundException(seller_id));
}


    @PutMapping("/get-seller/{seller_id}")
    Seller updateSeller(@RequestBody Seller newSeller, @PathVariable Long seller_id){


        return sellerRepository.findById(seller_id)
                .map(seller->{
                    seller.setFirstname(newSeller.getFirstname());
                    seller.setLastname(newSeller.getLastname());
                    seller.setPhonenumber(newSeller.getPhonenumber());
                    seller.setEmail(newSeller.getEmail());
                    seller.setPassword(newSeller.getPassword());
                    seller.setAddress(newSeller.getAddress());
                    seller.setDob(newSeller.getDob());
                    return sellerRepository.save(seller);
                }).orElseThrow(()->new UserNotFoundException(seller_id));
    }




    @DeleteMapping("/supplier/{seller_id}")
    String deletesup(@PathVariable Long seller_id){
        if(!sellerRepository.existsById(seller_id)){
//            throw new UserNotFoundException(sup_id);
            return "User Not Found";
        }else sellerRepository.deleteById(seller_id);
        return seller_id+" "+" was deleted";
    }


}


