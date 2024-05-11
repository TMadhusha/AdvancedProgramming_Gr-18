package jwl.mis.jewelry_ms.controller;



import jwl.mis.jewelry_ms.Models.SellerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.model.SellerSession;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import jwl.mis.jewelry_ms.repository.SellerSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class SellerController {

// ORM :Done
// Design patterns: Done
//    Bean Scope: By default, Spring beans are singleton scoped. It means that Spring
//    creates only one instance of a bean per container (application context) and shares that single
//    instance throughout the application.
//
//    @Autowired Annotation: When you use the @Autowired annotation to inject dependencies into your controller,
//    Spring ensures that it injects the same instance of the dependency into all components that require it.

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private SellerSessionRepository sellerSessionRepository;

    private final ExecutorService executorService = Executors.newCachedThreadPool();

    @PostMapping("/register-seller")
    public Seller newSupplier(@RequestBody Seller newSeller) {
        // Check if the email already exists
        Seller existingSeller = sellerRepository.findSellerByEmail(newSeller.getEmail());
        if (existingSeller != null) {
            String email = existingSeller.getEmail();
            throw new SellerNotFoundException(email + " is already in use.");
        }

        // Save the new seller to the database and serialize it to a file concurrently
        executorService.submit(() -> {
            saveToDatabase(newSeller);
            serializeToFile(newSeller);
        });

        return newSeller;
    }

    private void saveToDatabase(Seller seller) {
        // Save the new seller to the database
        sellerRepository.save(seller);
    }

    private void serializeToFile(Seller seller) {
        // Serialize the seller object to a file
        try (FileOutputStream fos = new FileOutputStream("seller_detail_backup.ser");
             ObjectOutputStream oos = new ObjectOutputStream(fos)) {
            oos.writeObject(seller);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



//    @PostMapping("/register-seller")
//    Seller newSupplier(@RequestBody Seller newSeller) {
//        // Check if the email already exists
//        Seller existingSeller = sellerRepository.findSellerByEmail(newSeller.getEmail());
//        if (existingSeller != null) {
//            String email = existingSeller.getEmail();
//            throw new SellerNotFoundException(email + " is already in use.");
//        }
//
//        // If the email doesn't exist, save the new seller
//        System.out.println(newSeller);
//        return sellerRepository.save(newSeller);
//
//
//    }











        @PostMapping("/seller-login")
        public CompletableFuture<ResponseEntity<String>> login(@RequestBody SellerLoginRequest loginRequest) {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            // Perform authentication asynchronously
            return CompletableFuture.supplyAsync(() -> authenticateSeller(email, password), executorService);
        }

        private ResponseEntity<String> authenticateSeller(String email, String password) {
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
                sellerSession.setUsername(seller.getUsername());
                sellerSession.setRole(seller.getRole());
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


//    @PostMapping("/seller-login")
//    public ResponseEntity<String> login(@RequestBody SellerLoginRequest loginRequest) {
//        String email = loginRequest.getEmail();
//        String password = loginRequest.getPassword();
//
//        // Find the seller by email
//        Seller seller = sellerRepository.findSellerByEmail(email);
//
//        if (seller == null || !seller.getPassword().equals(password)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        } else {
//            // Generate session ID
//            String sessionId = UUID.randomUUID().toString();
//
//            // Save session data
//            SellerSession sellerSession = new SellerSession();
//            sellerSession.setSeller_id(seller.getSeller_id());
//            sellerSession.setUsername(seller.getUsername());
//            sellerSession.setRole(seller.getRole());
//            sellerSession.setPhonenumber(seller.getPhonenumber());
//            sellerSession.setAddress(seller.getAddress());
//            sellerSession.setEmail(seller.getEmail());
//            sellerSession.setPassword(seller.getPassword());
//            sellerSession.setDob(seller.getDob());
//
//            // Save session data to the repository
//            sellerSessionRepository.save(sellerSession);
//
//            // Return login successful message
//            return ResponseEntity.ok("Login successful");
//        }
//    }

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



    @PutMapping("/change-password")
    public ResponseEntity<?> updateSellerSession(@RequestBody SellerSession newSellerSession) {
        String email = newSellerSession.getEmail();
        String newPassword = newSellerSession.getPassword();

        // Check if email exists in the SellerSession table
        Optional<SellerSession> existingSellerSession = Optional.ofNullable(sellerSessionRepository.findSellersessionByEmail(email));
        if(existingSellerSession.isPresent()) {
            SellerSession sellerSession = existingSellerSession.get();

            // Update the password
            sellerSession.setPassword(newPassword);
            sellerSessionRepository.save(sellerSession);

            return ResponseEntity.ok().build(); // Password updated successfully
        } else {
            // Email doesn't exist, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is invalid"); // You can customize the error message as needed
        }
    }


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
                seller.setUsername(session.getUsername());
                seller.setRole(session.getRole());
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
                seller.setUsername(session.getUsername());
                seller.setRole(session.getRole());
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





