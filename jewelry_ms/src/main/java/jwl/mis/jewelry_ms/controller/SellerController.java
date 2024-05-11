package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.model.Customer;
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
@CrossOrigin(origins = "*")
public class SellerController {
    @Autowired
    private SellerRepository sellerRepository;

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

    @GetMapping("/getseller")
    List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }

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

}
