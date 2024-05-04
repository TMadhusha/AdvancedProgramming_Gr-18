package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class AdminLogin {
    //Fields
    @Id
    @GeneratedValue
    private Long id;
    private String ad_Id;
    private String ad_Uname;
    private  String ad_Pwd;

    //getter and setters

    public String getAd_Id() {
        return ad_Id;
    }

    public void setAd_Id(String ad_Id) {
        this.ad_Id = ad_Id;
    }

    public String getAd_Uname() {
        return ad_Uname;
    }

    public void setAd_Uname(String ad_Uname) {
        this.ad_Uname = ad_Uname;
    }

    public String getAd_Pwd() {
        return ad_Pwd;
    }

    public void setAd_Pwd(String ad_Pwd) {
        this.ad_Pwd = ad_Pwd;
    }
}
