package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.EmailVerificationToken;
import org.springframework.data.repository.CrudRepository;

public interface EmailVerificationTokenRepository extends CrudRepository<EmailVerificationToken, Integer> {
    EmailVerificationToken findBytoken(String token);
}
