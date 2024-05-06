package jwl.mis.jewelry_ms.controller;



import jakarta.transaction.Transactional;
import jwl.mis.jewelry_ms.Models.AdminLoginRequest;
import jwl.mis.jewelry_ms.Models.SellerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.model.SellerSession;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import jwl.mis.jewelry_ms.repository.SellerSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;


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







    @Autowired
    private SellerSessionRepository sellerSessionRepository;

    @PostMapping("/seller-login")
    public ResponseEntity<String> login(@RequestBody SellerLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the seller by email
        Seller seller = sellerRepository.findSellerByEmail(email);

        if (seller == null || !seller.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } else {
            // Generate session ID
            String sessionId = UUID.randomUUID().toString();

            // Save session data
            SellerSession sellerSession = new SellerSession();
            sellerSession.setSeller_id(seller.getSeller_id());
            sellerSession.setFirstname(seller.getFirstname());
            sellerSession.setLastname(seller.getLastname());
            sellerSession.setPhonenumber(seller.getPhonenumber());
            sellerSession.setAddress(seller.getAddress());
            sellerSession.setEmail(seller.getEmail());
            sellerSession.setPassword(seller.getPassword());
            sellerSession.setDob(seller.getDob());

            // Save session data to the repository
            sellerSessionRepository.save(sellerSession);

            // Return login successful message
            return ResponseEntity.ok("Login successful");
        }
    }

    @GetMapping("/get-seller")
    List<Seller>getAllSeller(){
        return sellerRepository.findAll();
    }



    @GetMapping("/update/{session_id}")
    public SellerSession getSellerById(@PathVariable("session_id") Long sessionId) {
        return sellerSessionRepository.findById(sessionId)
                .orElseThrow(() -> new UserNotFoundException(sessionId));
    }



    @PutMapping("/update-seller-session/{session_id}")
    public ResponseEntity<SellerSession> updateSellerSession(@RequestBody SellerSession newSellerSession, @PathVariable Long session_id) {
        return sellerSessionRepository.findById(session_id)
                .map(sellerSession -> {
                    sellerSession.setFirstname(newSellerSession.getFirstname());
                    sellerSession.setLastname(newSellerSession.getLastname());
                    sellerSession.setPhonenumber(newSellerSession.getPhonenumber());
                    sellerSession.setEmail(newSellerSession.getEmail());
                    sellerSession.setPassword(newSellerSession.getPassword());
                    sellerSession.setAddress(newSellerSession.getAddress());
                    sellerSession.setDob(newSellerSession.getDob());

                    SellerSession updatedSellerSession = sellerSessionRepository.save(sellerSession);
                    return ResponseEntity.ok(updatedSellerSession);
                })
                .orElse(ResponseEntity.notFound().build());
    }

        @Transactional
        @DeleteMapping("/seller/{seller_id}")
        public String deleteSeller(@PathVariable ("seller_id") Long seller_id) {
            if (!sellerRepository.existsById(seller_id)) {
                return "User Not Found";
            }
                // Delete from Seller table
                sellerRepository.deleteById(seller_id);

                // Delete from SellerSession table
                sellerSessionRepository.deleteById(seller_id);

                return seller_id + " was deleted";


        }



}





