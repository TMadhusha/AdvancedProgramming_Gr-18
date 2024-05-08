package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.Models.AdminLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;




    @PostMapping("/register-admin")
    Admin newAdmin(@RequestBody Admin newAdmin) {
        // Check if the email already exists
        Admin existingadmin = adminRepository.findAdminByEmail(newAdmin.getEmail());
        if (existingadmin != null) {
            String email = existingadmin.getEmail();
            throw new SellerNotFoundException(email + " is already in use.");
        }

        // If the email doesn't exist, save the new seller
        System.out.println(newAdmin);
        return adminRepository.save(newAdmin);
    }

    @PostMapping("/admin-login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the customer by email
        Admin admin = adminRepository.findAdminByEmail(email);

        if (admin == null || !admin.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Check your email and password again");
        } else {
            // Return login successful message
            return ResponseEntity.ok("Login successful");
        }
    }


    //view all sellers
    @GetMapping("/get-admin")
    List<Admin>getAllCustomer(){
        return adminRepository.findAll();
    }






    @PutMapping("/admin-password")
    public ResponseEntity<?> updatecustomer(@RequestBody Admin newAdmin) {
        String email = newAdmin.getEmail();
        String newPassword = newAdmin.getPassword();

        // Check if email exists in the SellerSession table
        Optional<Admin> existingAdmin = Optional.ofNullable(adminRepository.findAdminByEmail(email));
        if(existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();

            // Update the password
           admin.setPassword(newPassword);
            adminRepository.save(admin);

            return ResponseEntity.ok().build(); // Password updated successfully
        } else {
            // Email doesn't exist, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is invalid"); // You can customize the error message as needed
        }
    }






}





