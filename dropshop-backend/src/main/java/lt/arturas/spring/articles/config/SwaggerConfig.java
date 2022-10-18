package lt.arturas.spring.articles.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI api(){
        return new OpenAPI().info(createInfo());
    }

    private Info createInfo(){
        return new Info().title("Eshop API")
                .description("Code academy eshop")
                .version("1.0")
                .contact(createContact());
    }

    private Contact createContact(){
        Contact contact = new Contact();
        contact.setName("Arturas Bidva");
        contact.setEmail("arturas.bidva@gmail.com");
        contact.setUrl("google.lt");

        return contact;
    }
}
