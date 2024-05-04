package jwl.mis.jewelry_ms.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class UserNotFoundAdvaice {

    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exeptionHandler(UserNotFoundException exception){

        Map<String,String> errorMap=new HashMap<>();

        errorMap.put("errorMessage",exception.getMessage());

        return errorMap;

    }
}