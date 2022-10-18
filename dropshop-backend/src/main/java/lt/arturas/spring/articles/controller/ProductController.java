package lt.arturas.spring.articles.controller;

import lt.arturas.spring.articles.models.Product;
import lt.arturas.spring.articles.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lt.arturas.spring.articles.ApplicationPath.PRODUCTS;

@RestController
@CrossOrigin
@RequestMapping(PRODUCTS)
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getAllProducts() {
        return productService.getALlProducts();
    }

}