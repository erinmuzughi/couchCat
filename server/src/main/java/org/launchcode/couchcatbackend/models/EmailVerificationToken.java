package org.launchcode.couchcatbackend.models;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Entity
public class EmailVerificationToken {
    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue
    private int id;

    private String token;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "userId")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION);


    public EmailVerificationToken(String token, User user, LocalDateTime expiryDate) {
        this.token = token;
        this.user = user;
        this.expiryDate = expiryDate;
    }

    public EmailVerificationToken() {
    }

    public int getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
}
