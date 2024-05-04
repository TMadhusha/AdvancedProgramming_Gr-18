//package jwl.mis.jewelry_ms.controller;
//
//import jakarta.mail.MessagingException;
//import jwl.mis.jewelry_ms.model.EmailRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class EmailController {
//    @Autowired
//    private EmailService emailService;
//
//    @PostMapping("/send-email")
//    public void sendEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
//        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
//    }
//
//}
