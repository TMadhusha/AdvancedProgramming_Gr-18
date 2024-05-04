package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservation_id;

    private String payment_amount;
    private Date reservation_date;
    private String payment_status;


    private String reservation_status;
    private Date pickup_date;
    private String payment_method;

    private String reservation_type;

    private String additional_notes;

    @ManyToOne
    @JoinColumn(name = "cus_id")
    private Customer customer;

    public Reservation(Long reservation_id, Date reservation_date, String payment_amount, String payment_status, String reservation_status, Date pickup_date, String payment_method, String reservation_type, String additional_notes, Customer customer) {
        this.reservation_id = reservation_id;
        this.reservation_date = reservation_date;
        this.payment_amount = payment_amount;
        this.payment_status = payment_status;
        this.reservation_status = reservation_status;
        this.pickup_date = pickup_date;
        this.payment_method = payment_method;
        this.reservation_type = reservation_type;
        this.additional_notes = additional_notes;
        this.customer = customer;
    }

    public Reservation() {

    }

    public Long getReservation_id() {
        return reservation_id;
    }

    public void setReservation_id(Long reservation_id) {
        this.reservation_id = reservation_id;
    }

    public Date getReservation_date() {
        return reservation_date;
    }

    public void setReservation_date(Date reservation_date) {
        this.reservation_date = reservation_date;
    }

    public String getPayment_amount() {
        return payment_amount;
    }

    public void setPayment_amount(String payment_amount) {
        this.payment_amount = payment_amount;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public String getReservation_status() {
        return reservation_status;
    }

    public void setReservation_status(String reservation_status) {
        this.reservation_status = reservation_status;
    }

    public Date getPickup_date() {
        return pickup_date;
    }

    public void setPickup_date(Date pickup_date) {
        this.pickup_date = pickup_date;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    public String getReservation_type() {
        return reservation_type;
    }

    public void setReservation_type(String reservation_type) {
        this.reservation_type = reservation_type;
    }

    public String getAdditional_notes() {
        return additional_notes;
    }

    public void setAdditional_notes(String additional_notes) {
        this.additional_notes = additional_notes;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}