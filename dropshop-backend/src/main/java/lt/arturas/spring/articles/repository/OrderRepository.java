package lt.arturas.spring.articles.repository;

import lt.arturas.spring.articles.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
}
