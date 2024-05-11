package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity

public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seller_id;
    private String userName;

    private String password;
    private String email;
    private String address;
    private String mobile;
    private String Role;
    private String description;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] sellerIcon;

    public Long getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(Long seller_id) {
        this.seller_id = seller_id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getSellerIcon() {
        return sellerIcon;
    }

    public void setSellerIcon(byte[] sellerIcon) {
        this.sellerIcon = sellerIcon;
    }
}
