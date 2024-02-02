package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.EmailVerificationToken;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface EmailVerificationTokenRepository extends CrudRepository<EmailVerificationToken, Integer> {
    EmailVerificationToken findByToken(String token);

    EmailVerificationToken findByUser(User user);

    Integer findUserIdByToken(String token);

}
