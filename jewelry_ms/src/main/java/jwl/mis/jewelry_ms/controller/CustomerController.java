package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.Models.CustomerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.model.Custommer;
import jwl.mis.jewelry_ms.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;




    @PostMapping("/register-customer")
    Custommer newCustomer(@RequestBody Custommer newCustommer) {
        // Check if the email already exists
        Custommer existingcustomer = customerRepository.findCustomerByEmail(newCustommer.getEmail());
        if (existingcustomer != null) {
            String email = existingcustomer.getEmail();
            throw new SellerNotFoundException(email + " is already in use.");
        }

        // If the email doesn't exist, save the new seller
        System.out.println(newCustommer);
        return customerRepository.save(newCustommer);
    }

    @PostMapping("/customer-login")
    public ResponseEntity<String> login(@RequestBody CustomerLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the customer by email
        Custommer custommer = customerRepository.findCustomerByEmail(email);

        if (custommer == null || !custommer.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Check your email and password again");
        } else {
            // Return login successful message
            return ResponseEntity.ok("Login successful");
        }
    }


    //view all sellers
    @GetMapping("/get-customer")
    List<Custommer>getAllCustomer(){
        return customerRepository.findAll();
    }






    @PutMapping("/customer-password")
    public ResponseEntity<?> updatecustomer(@RequestBody Custommer newCustommer) {
        String email = newCustommer.getEmail();
        String newPassword = newCustommer.getPassword();

        // Check if email exists in the SellerSession table
        Optional<Custommer> existingCustomer = Optional.ofNullable(customerRepository.findCustomerByEmail(email));
        if(existingCustomer.isPresent()) {
            Custommer custommer = existingCustomer.get();

            // Update the password
            custommer.setPassword(newPassword);
            customerRepository.save(custommer);

            return ResponseEntity.ok().build(); // Password updated successfully
        } else {
            // Email doesn't exist, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is invalid"); // You can customize the error message as needed
        }
    }






}





