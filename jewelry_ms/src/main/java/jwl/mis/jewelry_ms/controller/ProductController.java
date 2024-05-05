package jwl.mis.jewelry_ms.controller;



import jwl.mis.jewelry_ms.Models.SellerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Product;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.ProductRepository;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SellerRepository sellerRepository;




    @PostMapping("/add-product")
    ResponseEntity<?> newProduct(@RequestBody Product newProduct) {
        // Check if the seller_id exists in the seller table
        Optional<Seller> sellerOptional = sellerRepository.findById(newProduct.getSeller_id());
        if (sellerOptional.isPresent()) {
            // Save the product if the seller_id exists
            Product savedProduct = productRepository.save(newProduct);
            return ResponseEntity.ok(savedProduct);
        } else {
            // Return an error response if the seller_id doesn't exist
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Seller with the provided ID does not exist.");
        }
    }




























//
//    @GetMapping("/update/{seller_id}") //for lodesupplier
//Seller getSellerById(@PathVariable("seller_id") Long seller_id){
//    return sellerRepository.findById(seller_id)
//            .orElseThrow(()->new UserNotFoundException(seller_id));
//}
//
//
//    @PutMapping("/get-seller/{seller_id}")
//    Seller updateSeller(@RequestBody Seller newSeller, @PathVariable Long seller_id){
//
//
//        return sellerRepository.findById(seller_id)
//                .map(seller->{
//                    seller.setFirstname(newSeller.getFirstname());
//                    seller.setLastname(newSeller.getLastname());
//                    seller.setPhonenumber(newSeller.getPhonenumber());
//                    seller.setEmail(newSeller.getEmail());
//                    seller.setPassword(newSeller.getPassword());
//                    seller.setAddress(newSeller.getAddress());
//                    seller.setDob(newSeller.getDob());
//                    return sellerRepository.save(seller);
//                }).orElseThrow(()->new UserNotFoundException(seller_id));
//    }
//
//
//
//
//    @DeleteMapping("/supplier/{seller_id}")
//    String deletesup(@PathVariable Long seller_id){
//        if(!sellerRepository.existsById(seller_id)){
////            throw new UserNotFoundException(sup_id);
//            return "User Not Found";
//        }else sellerRepository.deleteById(seller_id);
//        return seller_id+" "+" was deleted";
//    }
//

}


