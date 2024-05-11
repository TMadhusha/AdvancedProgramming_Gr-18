package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exception.CustomerNotFoundException;
import jwl.mis.jewelry_ms.model.Customer;
import jwl.mis.jewelry_ms.repository.CustomerRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/customer")
    Customer newCustomer(@RequestBody Customer newCustomer){
        return customerRepository.save(newCustomer);
    }
    @GetMapping("/getcustomer")
    List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @GetMapping("/customer/{cus_id}")
    Customer getCustomerById(@PathVariable Long cus_id){
        return customerRepository.findById(cus_id)
                .orElseThrow(()->new CustomerNotFoundException(cus_id));
    }

    @PutMapping("/customer/{cus_id}")
    Customer updateCustomer(@RequestBody Customer newCustomer, @PathVariable Long cus_id) {
        return customerRepository.findById(cus_id)
                .map(customer -> {
                    customer.setUserName(newCustomer.getUserName());
                    customer.setEmail(newCustomer.getEmail());
                    customer.setAddress(newCustomer.getAddress());
                    customer.setMobile(newCustomer.getMobile());
                    customer.setRole(newCustomer.getRole());
                    customer.setPassword(newCustomer.getPassword());
                    return customerRepository.save(customer);
                })
                .orElseThrow(() -> new CustomerNotFoundException(cus_id));
    }

    @DeleteMapping("/customer/{cus_id}")
    String deleteCustomer(@PathVariable Long cus_id){
        if(!customerRepository.existsById(cus_id)){
            throw new CustomerNotFoundException(cus_id);
        }
        customerRepository.deleteById(cus_id);
        return "Customer with id "+ cus_id +"has been deleted success.";
    }
}
