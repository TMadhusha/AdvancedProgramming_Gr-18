package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exception.AttendanceNotFoundException;
import jwl.mis.jewelry_ms.model.Attendance;
import jwl.mis.jewelry_ms.repository.AttendanceRepository;
import jwl.mis.jewelry_ms.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
public class SalaryController {
    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    SalaryRepository salaryRepository;

    @GetMapping("/calculateSalary/{empId}/{startDate}/{endDate}")
    public double calculateSalary(@PathVariable String empId, @PathVariable String startDate, @PathVariable String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        List<Attendance> attendanceList = attendanceRepository.findByEmpIdAndDateBetween(empId, start, end);

        System.out.println("Attendance List:");
        for (Attendance attendance : attendanceList) {
            System.out.println(attendance); // Assuming you have overridden the toString() method in Attendance class
        }

        double totalWorkingHours = 0;
        for (Attendance attendance : attendanceList) {
            // Calculate working hours for each day (assuming check_Out - check_In)
            LocalTime checkInTime = attendance.getCheck_In();
            LocalTime checkOutTime = attendance.getCheck_Out();

            // Handle null check for checkInTime and checkOutTime
            if (checkInTime != null && checkOutTime != null) {
                double workingHours = calculateWorkingHours(attendance);
                totalWorkingHours += workingHours;
            }
        }

        // Calculate total amount based on totalWorkingHours and salary per hour (you may have to define this)
        // For simplicity, let's assume a fixed salary per hour
        double salaryPerHour = 10; // Example value, replace with your actual salary per hour
        double totalAmount = totalWorkingHours * salaryPerHour;

        System.out.println("Employee ID: " + empId);
        System.out.println("Total working hours: " + totalWorkingHours);
        System.out.println("Total amount: " + totalAmount);

        return totalAmount; // Return the total amount calculated
    }


    private double calculateWorkingHours(Attendance attendance) {
        // Parse check-in and check-out times
        LocalTime checkInTime = attendance.getCheck_In();
        LocalTime checkOutTime = attendance.getCheck_Out();

        // Calculate duration between check-in and check-out times
        Duration duration = Duration.between(checkInTime, checkOutTime);

        // Convert duration to hours
        return duration.toHours();
    }




//    @GetMapping("/salary/{empId}")
//    public double calculateSalary(@PathVariable String empId) {
//        // Retrieve attendance records for the specified employee
//        List<Attendance> attendanceList = attendanceRepository.findByEmpId(empId);
//
//        // Calculate total working hours
//        double totalWorkingHours = attendanceList.stream()
//                .mapToDouble(this::calculateWorkingHours)
//                .sum();
//
//        // Calculate salary
//        double HOURLY_RATE=10.0;
//        double salary = totalWorkingHours * HOURLY_RATE;
//        System.out.println("Salary" + salary);
//        return salary;
//
//    }
//

}