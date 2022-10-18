package lt.arturas.spring.articles.controller;

import lt.arturas.spring.articles.entities.UserEntity;
import lt.arturas.spring.articles.models.CreditCard;
import lt.arturas.spring.articles.models.Order;
import lt.arturas.spring.articles.models.User;
import lt.arturas.spring.articles.requests.CreateUserRequest;
import lt.arturas.spring.articles.services.CreditCardService;
import lt.arturas.spring.articles.services.OrderService;
import lt.arturas.spring.articles.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;

@RestController
public class UserController {
    private final UserService userService;
    private final OrderService orderService;
    private final CreditCardService creditCardService;

    @Autowired
    public UserController(
            UserService userService,
            CreditCardService creditCardService,
            OrderService orderService
    ) {
        this.userService = userService;
        this.creditCardService = creditCardService;
        this.orderService = orderService;
    }

    @PostMapping("/register")
    @ResponseBody
    ResponseEntity<String> createUser(
            @RequestBody CreateUserRequest createUserRequest
    ) {
        if (userService.checkIfUserExist(createUserRequest.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            userService.createUser(createUserRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping(value = "/checkout", consumes = MediaType.APPLICATION_JSON_VALUE)
    String checkout(
            @RequestBody Order order, Principal principal
    ) {
        System.out.println(order);
        User user = userService.loadUserByUsername(principal.getName());
        orderService.createOrder(order, user);
        return "SUCCESS";
    }

    @GetMapping(value = "/user/{username}")
    User getUserById(
            @PathVariable String username
    ) {
        User user = userService.loadUserByUsername(username);
        UserEntity userEntity = userService.getUserById(user.getId());
        return new User(userEntity);
    }

    @PostMapping(value = "/creditcard", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    ResponseEntity<String> addCreditCard(@RequestBody CreditCard creditCard, Principal principal) {
        if (CreditCard.isValid(creditCard.getNumber())) {
            creditCardService.addCard(creditCard, principal);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(value = "/topup", consumes = MediaType.APPLICATION_JSON_VALUE)
    String topUpValue(@RequestBody BigDecimal balance, Principal principal) {
        User user1 = userService.loadUserByUsername(principal.getName());
        UserEntity userEntity = userService.getUserById(user1.getId());
        userService.topUpBalance(userEntity.getId(), balance);
        return "Success";
    }
}