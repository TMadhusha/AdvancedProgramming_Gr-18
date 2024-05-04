package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Order_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_id;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private Date order_date;
    private double payment_amount;
    private String payment_status;
    private Date pickup_date;
    private String payment_method;
    private String order_status;


    // Constructors
    public Order_details() {
    }

    public Order_details(Long order_id, Reservation reservation, Item item, Date order_date, double payment_amount, String payment_status, Date pickup_date, String payment_method, String order_status) {
        this.order_id = order_id;
        this.reservation = reservation;
        this.item = item;
        this.order_date = order_date;
        this.payment_amount = payment_amount;
        this.payment_status = payment_status;
        this.pickup_date = pickup_date;
        this.payment_method = payment_method;
        this.order_status = order_status;
    }

    public Long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public double getPayment_amount() {
        return payment_amount;
    }

    public void setPayment_amount(double payment_amount) {
        this.payment_amount = payment_amount;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
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

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }
}