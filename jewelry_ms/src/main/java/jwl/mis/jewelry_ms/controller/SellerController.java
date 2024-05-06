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

import java.util.Optional;
import java.util.UUID;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private SellerSessionRepository sellerSessionRepository;


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

    //view all sellers
    @GetMapping("/get-seller")
    List<Seller>getAllSeller(){
        return sellerRepository.findAll();
    }


//loadseller
    @GetMapping("/load")
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
    }    //ok
    @PostMapping("/seller-logout")
    public ResponseEntity<String> logout() {
        // Get all seller session data
        List<SellerSession> sellerSessions = sellerSessionRepository.findAll();

        // Iterate over each seller session
        for (SellerSession session : sellerSessions) {
            // Find the corresponding seller in the seller table
            Optional<Seller> optionalSeller = sellerRepository.findById(session.getSeller_id());

            // If seller exists, update its attributes
            if (optionalSeller.isPresent()) {
                Seller seller = optionalSeller.get();
                // Update seller attributes as needed
                // For example:
                seller.setSeller_id(session.getSeller_id());
                seller.setFirstname(session.getFirstname());
                seller.setLastname(session.getLastname());
                seller.setPhonenumber(session.getPhonenumber());
                seller.setEmail(session.getEmail());
                seller.setDob(session.getDob());
                seller.setPassword(session.getPassword());
                seller.setAddress(session.getAddress());

                // seller.set...

                // Save the updated seller data
                sellerRepository.save(seller);
            } else {
                // If seller does not exist, create a new seller
                Seller seller = new Seller();
                // Set seller attributes based on seller session data
                // For example:
                seller.setSeller_id(session.getSeller_id());
                seller.setFirstname(session.getFirstname());
                seller.setLastname(session.getLastname());
                seller.setPhonenumber(session.getPhonenumber());
                seller.setEmail(session.getEmail());
                seller.setDob(session.getDob());
                seller.setPassword(session.getPassword());
                seller.setAddress(session.getAddress());

                // Save the new seller data
                sellerRepository.save(seller);
            }
        }

        // Delete all seller session data
        sellerSessionRepository.deleteAll();

        return ResponseEntity.ok("Logout successful");
    }





}





