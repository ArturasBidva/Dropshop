package lt.arturas.spring.articles.models;

import lombok.Data;
import lt.arturas.spring.articles.entities.ProductEntity;

import java.math.BigDecimal;

@Data
public class Product {
    private Long id;
    private String title;

    private String imageUrl;

    private BigDecimal priceWithBalance;

    private Integer quantity;

    private String category;

    private BigDecimal priceWithCard;

    public Product(ProductEntity productEntity) {
        this.id = productEntity.getId();
        this.title = productEntity.getTitle();
        this.imageUrl = productEntity.getImageUrl();
        this.quantity = productEntity.getQuantity();
        this.priceWithCard = productEntity.getPrice();
        this.category = productEntity.getCategory();
        this.priceWithBalance = productEntity.getPrice();
    }

    public Product() {
    }

    public Product(String src, String title, BigDecimal price, String category, Long id) {
        this.id = id;
        this.title = title;
        this.imageUrl = src;
        this.priceWithCard = price;
        this.category = category;
    }

}