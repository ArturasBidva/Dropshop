package lt.arturas.spring.articles.services;

import lt.arturas.spring.articles.entities.CreditCardEntity;
import lt.arturas.spring.articles.entities.UserEntity;
import lt.arturas.spring.articles.models.CreditCard;
import lt.arturas.spring.articles.models.User;
import lt.arturas.spring.articles.repository.CreditCardRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class CreditCardService {
    private final UserService userService;
    private final CreditCardRepository creditCardRepository;

    public CreditCardService(UserService userService,CreditCardRepository creditCardRepository) {
        this.userService = userService;
        this.creditCardRepository = creditCardRepository;
    }

    public Long addCard(CreditCard creditCard, Principal principal) {

        User user = userService.loadUserByUsername(principal.getName());
        UserEntity userEntity = userService.getUserById(user.getId());
        CreditCardEntity creditCardEntity = new CreditCardEntity();
        creditCardEntity.setUserEntity(userEntity);
        creditCardEntity.setNumber(creditCard.getNumber());
        creditCardEntity.setName(creditCard.getName());
        creditCardEntity.setCvc(creditCard.getCvc());
        creditCardEntity.setExpiry(creditCard.getExpiry());
        creditCardRepository.save(creditCardEntity);
        return creditCardEntity.getId();
    }
    public void deleteCreditCard(CreditCard creditCard){
        creditCardRepository.deleteById(creditCard.getId());
    }

}
