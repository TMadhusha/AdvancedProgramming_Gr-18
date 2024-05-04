package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
    @Entity
    public class OnlinePayments {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long opayment_id;
        private String transaction_id;
        private String amount;
        private String payment_method;
        private String status;
        @ManyToOne
        @JoinColumn(name = "cus_id")
        private Customer customer;
        private String payment_date;


        public OnlinePayments() {
        }

        public OnlinePayments(String transaction_id, String amount, String payment_method, String status, Customer customer, String payment_date) {
            this.transaction_id = transaction_id;
            this.amount = amount;
            this.payment_method = payment_method;
            this.status = status;
            this.customer = customer;
            this.payment_date = payment_date;
        }

        public Long getOpayment_id() {
            return opayment_id;
        }

        public void setOpayment_id(Long opayment_id) {
            this.opayment_id = opayment_id;
        }

        public String getTransaction_id() {
            return transaction_id;
        }

        public void setTransaction_id(String transaction_id) {
            this.transaction_id = transaction_id;
        }

        public String getAmount() {
            return amount;
        }

        public void setAmount(String amount) {
            this.amount = amount;
        }

        public String getPayment_method() {
            return payment_method;
        }

        public void setPayment_method(String payment_method) {
            this.payment_method = payment_method;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Customer getCustomer() {
            return customer;
        }

        public void setCustomer(Customer customer) {
            this.customer = customer;
        }

        public String getPayment_date() {
            return payment_date;
        }

        public void setPayment_date(String payment_date) {
            this.payment_date = payment_date;
        }
    }
