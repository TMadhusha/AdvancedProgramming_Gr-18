package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.exception.CustomerNotFoundException;
import jwl.mis.jewelry_ms.exception.InventoryNotFoundException;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.model.Customer;
import jwl.mis.jewelry_ms.model.Inventory;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SellerController {
    @Autowired
    private SellerRepository sellerRepository;
    //add seller
    @PostMapping("/postseller")
    Seller newSeller(@RequestParam("userName") String user_name,
                     @RequestParam("password") String password,
                     @RequestParam("email") String email,
                     @RequestParam("address") String address,
                     @RequestParam("mobile") String mobile,
                     @RequestParam("role") String role,
                     @RequestParam("description") String description,
                     @RequestParam("sellerIcon") MultipartFile sellerIcon) {

        Seller newSeller = new Seller();
        newSeller.setUserName(user_name);
        newSeller.setPassword(password);
        newSeller.setEmail(email);
        newSeller.setAddress(address);
        newSeller.setMobile(mobile);
        newSeller.setRole(role);
        newSeller.setDescription(description);

        try {
            newSeller.setSellerIcon(sellerIcon.getBytes());
        } catch (IOException e) {
            // Handle exception
            e.printStackTrace();
        }

        return sellerRepository.save(newSeller);
    }

    //get all seller
    @GetMapping("/getseller")
    List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }

    //get specific seller for updation
    @GetMapping("/seller/{seller_id}")
    Seller getSellerBySellerId(@PathVariable Long seller_id) throws InterruptedException {
        Seller[] result = new Seller[1];
        Thread thread = new Thread(() -> {
            // Perform the database operation in the new thread
            result[0] = sellerRepository.findById(seller_id)
                    .orElseThrow(() -> new SellerNotFoundException(seller_id));
        });
        thread.start();
        thread.join(); // Wait for the thread to finish
        return result[0];
    }

    //updating seller using seller id
    @PutMapping("/seller/{seller_id}")
    Seller updateSeller(@RequestBody Seller newSeller, @PathVariable Long seller_id) {
        try {
            // Fetch the existing seller item
            Seller existingSeller = sellerRepository.findById(Long.valueOf(seller_id))
                    .orElseThrow(() -> new SellerNotFoundException(seller_id));

            // Update the properties of the existing seller
            existingSeller.setUserName(newSeller.getUserName());
            existingSeller.setAddress(newSeller.getAddress());
            existingSeller.setEmail(newSeller.getEmail());
            existingSeller.setMobile(newSeller.getMobile());
            existingSeller.setRole(newSeller.getRole());
            existingSeller.setDescription(newSeller.getDescription());
            existingSeller.setPassword(newSeller.getPassword());


            // Save the updated seller
            return sellerRepository.save(existingSeller);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update inventory item with ID: " + seller_id, e);
        }
    }

  //seller login
    @PostMapping("/sellerlogin")
    public ResponseEntity<String> loginSeller(@RequestBody SellerLoginRequest request ){
        Seller seller=sellerRepository.findByUserNameAndPassword(request.getUserName(), request.getPassword());
        if(seller!=null){
            return ResponseEntity.ok("Login Succssfull");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

  }


  //delete seller using seller id
  @DeleteMapping("/seller/{seller_id}")
    String deleteCustomer(@PathVariable Long seller_id){
        if(!sellerRepository.existsById(seller_id)){
            throw new CustomerNotFoundException(seller_id);
        }
        sellerRepository.deleteById(seller_id);
        return "Customer with id "+ seller_id +"has been deleted success.";
    }

}
