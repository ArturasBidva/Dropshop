package lt.arturas.spring.articles.models;

import lombok.Data;
import lt.arturas.spring.articles.entities.OrderEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
@Data
public class Order {
    private Long id;
    private List<Product> productList;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private BigDecimal price;

    public Order(OrderEntity orderEntity) {
        this.id = orderEntity.getId();
        this.productList = orderEntity.getProductList().stream().map(Product::new).collect(Collectors.toList());
        this.firstName = orderEntity.getFirstName();
        this.lastName = orderEntity.getLastName();
        this.address = orderEntity.getAddress();
        this.city = orderEntity.getCity();
        this.price = orderEntity.getPrice();
    }
    public Order(){

    }
}
