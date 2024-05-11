package jwl.mis.jewelry_ms.controller;

import  jwl.mis.jewelry_ms.Models.AdminLoginRequest;
import jwl.mis.jewelry_ms.exception.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;

import jwl.mis.jewelry_ms.model.Seller;
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
    @PostMapping("/adminlogin")
    public ResponseEntity<String> loginSeller(@RequestBody SellerLoginRequest request ){
        Admin admin=adminRepository.findByUserNameAndPassword(request.getUserName(), request.getPassword());
        if(admin!=null){
            return ResponseEntity.ok("Login Succssfull");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

    }

}



