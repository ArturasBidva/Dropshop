import {Component} from "react";
import "../product.css"


class Product extends Component {
    render() {

        return (
            <div className="product-card">
                <div className="product-tumb">
                    <img src={this.props.itemproduct.imageUrl} alt=""></img>
                </div>
                <div className="product-details">
                    <span className="product-catagory"></span>
                    <h4><a>{this.props.itemproduct.title}</a></h4>
                    <div className="product-bottom-details">
                        <div className="product-price">{this.props.itemproduct.priceWithCard} Eur</div>
                        {this.props.currentUser && <div className="product-item-add-button-container">
                            <button
                                className="product-button"
                                onClick={() => this.props.addToCart(this.props.itemproduct)}><b>Add to cart</b></button>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;