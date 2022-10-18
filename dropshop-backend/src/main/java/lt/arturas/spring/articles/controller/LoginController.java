package lt.arturas.spring.articles.controller;

import lt.arturas.spring.articles.models.Login;
import lt.arturas.spring.articles.models.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @PostMapping()
    Login loginUser(@AuthenticationPrincipal User user) {
        return new Login(user);
        }
    }