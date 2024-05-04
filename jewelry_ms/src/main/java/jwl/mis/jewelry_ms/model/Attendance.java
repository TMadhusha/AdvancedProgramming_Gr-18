package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Attendance {
    //fields
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_seq")
//    @SequenceGenerator(name = "id_seq", sequenceName = "id_sequence", allocationSize = 1)
    private Long att_id;
    private String empId;
    private LocalDate date;
    private LocalTime check_In;
    private LocalTime check_Out;
    private String status;

    //getter and setter


    public Long getAtt_id() {
        return att_id;
    }

    public void setAtt_id(Long att_id) {
        this.att_id = att_id;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getCheck_In() {
        return check_In;
    }

    public void setCheck_In(LocalTime check_In) {
        this.check_In = check_In;
    }

    public LocalTime getCheck_Out() {
        return check_Out;
    }

    public void setCheck_Out(LocalTime check_Out) {
        this.check_Out = check_Out;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

