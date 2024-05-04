package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;

import java.time.Month;

@Entity
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_seq")
    @SequenceGenerator(name = "id_seq", sequenceName = "id_sequence", allocationSize = 1)
    private Long id;
    private String empId;
    private int year;
    private int month;
    private double totalWorkingHours;
    private double totalAmount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public double getTotalWorkingHours() {
        return totalWorkingHours;
    }

    public void setTotalWorkingHours(double totalWorkingHours) {
        this.totalWorkingHours = totalWorkingHours;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
