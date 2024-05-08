package jwl.mis.jewelry_ms.controller;


import jwl.mis.jewelry_ms.Models.CustomerLoginRequest;
import jwl.mis.jewelry_ms.Models.SellerLoginRequest;
import jwl.mis.jewelry_ms.exception.SellerNotFoundException;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Customer;
import jwl.mis.jewelry_ms.model.Seller;
import jwl.mis.jewelry_ms.model.SellerSession;
import jwl.mis.jewelry_ms.repository.CustomerRepository;
import jwl.mis.jewelry_ms.repository.SellerRepository;
import jwl.mis.jewelry_ms.repository.SellerSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;




    @PostMapping("/register-customer")
    Customer newCustomer(@RequestBody Customer newCustomer) {
        // Check if the email already exists
        Customer existingcustomer = customerRepository.findCustomerByEmail(newCustomer.getEmail());
        if (existingcustomer != null) {
            String email = existingcustomer.getEmail();
            throw new SellerNotFoundException(email + " is already in use.");
        }

        // If the email doesn't exist, save the new seller
        System.out.println(newCustomer);
        return customerRepository.save(newCustomer);
    }

    @PostMapping("/customer-login")
    public ResponseEntity<String> login(@RequestBody CustomerLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the customer by email
        Customer customer = customerRepository.findCustomerByEmail(email);

        if (customer == null || !customer.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Check your email and password again");
        } else {
            // Return login successful message
            return ResponseEntity.ok("Login successful");
        }
    }


    //view all sellers
    @GetMapping("/get-customer")
    List<Customer>getAllCustomer(){
        return customerRepository.findAll();
    }






    @PutMapping("/customer-password")
    public ResponseEntity<?> updatecustomer(@RequestBody Customer newCustomer) {
        String email = newCustomer.getEmail();
        String newPassword = newCustomer.getPassword();

        // Check if email exists in the SellerSession table
        Optional<Customer> existingCustomer = Optional.ofNullable(customerRepository.findCustomerByEmail(email));
        if(existingCustomer.isPresent()) {
            Customer customer = existingCustomer.get();

            // Update the password
            customer.setPassword(newPassword);
            customerRepository.save(customer);

            return ResponseEntity.ok().build(); // Password updated successfully
        } else {
            // Email doesn't exist, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is invalid"); // You can customize the error message as needed
        }
    }






}





