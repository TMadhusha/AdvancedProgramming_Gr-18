package jwl.mis.jewelry_ms.controller;

import  jwl.mis.jewelry_ms.Models.AdminLoginRequest;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;

import jwl.mis.jewelry_ms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api/supplier")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;
    //Admin Register
    @PostMapping("/register")
    Admin newAdmin(@RequestBody Admin newAdmin){
        return adminRepository.save(newAdmin);
    }
    //Delete An admin
    @DeleteMapping("/delete-supplier/{adminid}")
    String deleteadmin(@PathVariable("adminid") Long adminid ){
        if(!adminRepository.existsById(adminid)){
            throw new UserNotFoundException(adminid);
        }
        adminRepository.deleteById(adminid);
        return adminid+" "+" was deleted";
    }



    // Check if username and password match
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Find the admin by username
        Admin admin = adminRepository.findAdminByUsername(username);

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } else {
            if (admin.getPassword().equals(password)) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        }
    }

}



