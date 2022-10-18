package lt.arturas.spring.articles.services;

import lt.arturas.spring.articles.entities.OrderEntity;
import lt.arturas.spring.articles.entities.ProductEntity;
import lt.arturas.spring.articles.entities.UserEntity;
import lt.arturas.spring.articles.models.Order;
import lt.arturas.spring.articles.models.Product;
import lt.arturas.spring.articles.models.User;
import lt.arturas.spring.articles.repository.OrderRepository;
import lt.arturas.spring.articles.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public OrderService(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public void createOrder(Order order, User user) {
        UserEntity userEntity = userRepository.getReferenceById(user.getId());
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setAddress(order.getAddress());
        orderEntity.setPrice(order.getPrice());
        orderEntity.setCity(order.getCity());
        orderEntity.setFirstName(order.getFirstName());
        orderEntity.setLastName(order.getLastName());
        orderEntity.setUserEntity(userEntity);
        BigDecimal userBalance = userEntity.getBalance();
        BigDecimal totalCartValue = order.getPrice();
        BigDecimal balanceAfterCheckout = userBalance.subtract(totalCartValue);
        userEntity.setBalance(balanceAfterCheckout);
        List<Long> plist = order.getProductList().stream().map(Product::getId).distinct().toList();
        List<ProductEntity> collect = plist.stream().map(ProductEntity::new).collect(Collectors.toList());
        orderEntity.setProductList(collect);

        orderRepository.save(orderEntity);
        userRepository.save(userEntity);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(Order::new)
                .collect(Collectors.toList());
    }

}