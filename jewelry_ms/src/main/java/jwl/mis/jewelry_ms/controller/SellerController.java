package jwl.mis.jewelry_ms.controller;



import jwl.mis.jewelry_ms.Models.AdminLoginRequest;
import jwl.mis.jewelry_ms.Models.SellerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

//    @PostMapping("/register-seller")
//    Seller newSupplier(@RequestBody Seller newSeller){
//        System.out.println(newSeller);
//        return sellerRepository.save(newSeller);
//    }
@PostMapping("/register-seller")
Seller newSupplier(@RequestBody Seller newSeller) {
    // Check if the email already exists
    Seller existingSeller = sellerRepository.findSellerByEmail(newSeller.getEmail());
    if (existingSeller != null) {
        String email = existingSeller.getEmail();
        throw new SellerNotFoundException(email + " is already in use.");
    }

    // If the email doesn't exist, save the new seller
    System.out.println(newSeller);
    return sellerRepository.save(newSeller);
}




    @PostMapping("/seller-login")
    public ResponseEntity<String> login(@RequestBody SellerLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the admin by username
        Seller seller = sellerRepository.findSellerByEmail(email);

        if (seller == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } else {
            if (seller.getPassword().equals(password)) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid E-mail or password");
            }
        }
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


