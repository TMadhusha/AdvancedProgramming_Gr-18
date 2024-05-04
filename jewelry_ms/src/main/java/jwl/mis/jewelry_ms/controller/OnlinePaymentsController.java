package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.OnlinePayments;
import jwl.mis.jewelry_ms.repository.OnlinePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class OnlinePaymentsController {
    @Autowired
    private OnlinePaymentRepository onlinePaymentRepository;

    @PostMapping("/postpayments")
    OnlinePayments newOPayments(@RequestBody OnlinePayments newOPayments){
        return onlinePaymentRepository.save(newOPayments);
    }

    @GetMapping("/getpayments")
    List<OnlinePayments> getAllOPayments(){
        return onlinePaymentRepository.findAll();
    }

}
