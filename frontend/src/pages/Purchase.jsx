import React, { useState } from "react";
import { ShoppingCart, MapPin, CreditCard } from "lucide-react";
import "./Home.css";
import "./Purchase.css";

const Purchase = () => {
  const [formData, setFormData] = useState({
    product: "ESP32 IoT Monitoring Kit",
    quantity: 1,
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const products = [
    { id: 1, name: "ESP32 IoT Monitoring Kit", price: 2500, image: "esp32.jpg" },
    { id: 2, name: "LM35D Temperature Sensor", price: 299, image: "lm35d.jpg" },
    { id: 3, name: "YF-S201 Water Flow Sensor", price: 499, image: "yf-s201.jpg" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully! Delivery to: ${formData.address}, ${formData.city}`);
  };

  const selectedProduct = products.find(p => p.name === formData.product);
  const totalPrice = selectedProduct ? selectedProduct.price * formData.quantity : 0;

  return (
    <div className="purchase-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <ShoppingCart className="title-icon" />
            Purchase Products
          </h2>
          <p className="page-subtitle">Order IoT sensors and monitoring equipment</p>
        </div>
      </div>

      <div className="purchase-layout">
        <div className="order-section">
          <div className="order-card">
            <h3 className="section-heading">
              <MapPin size={20} />
              Delivery Details
            </h3>
            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-group">
                <label>Selected Product</label>
                <select name="product" value={formData.product} onChange={handleChange}>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} - ₹{product.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button type="submit" className="checkout-btn">
                <CreditCard size={18} />
                Proceed to Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
