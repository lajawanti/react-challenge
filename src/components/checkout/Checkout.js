import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from './../../reducer/StateProvider.js';
import CheckoutOrderSummary from './checkoutOrderSummary/CheckoutOrderSummary.js';
import SubTotal from './../../components/subtotal/SubTotal.js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./../../reducer/reducer.js";

import './Checkout.css';

const Checkout = () => {
      const [{ cart }, dispatch] = useStateValue();
      // const [country, setCountry] = useState('')

      return (
            <div className = "checkout_main">
                <h1 style = {{color:'rgb(2, 109, 109)', fontSize:'40px', margin:'0 auto'}}>Checkout</h1> 
                <div style = {{display:'flex'}}>
                      {/* First div user info shipping card ... */}
                      <div style = {{display: 'flex',
                                     flexDirection: 'column',
                                     minWidth: '55%'
                                    }}
                      >
                              <div className = "user_details">
                                    <p>1. customer </p>
                              </div>
                              <div className="user_details">
                                    <p style= {{marginBottom:'8px'}}>2. shipping </p>
                                    <span className = "shipping">shipping address</span><br/>
                                    <label className = "shipping">country</label>
                                    <CountryDropdown />
                                    <div className = "shipping shipping_row_div">
                                          <label>first name</label>
                                          <input type ="text" />
                                          <label>last name</label>
                                          <input type ="text" />
                                    </div>
                                    <label className = "shipping">address line 1</label>
                                    <input type ="text" />
                                    <label className = "shipping">address line 2</label>
                                    <input type ="text" />
                                    <div className = "shipping shipping_row_div">
                                          <label>city</label>
                                          <input type ="text" />
                                          <label>state</label>
                                          <RegionDropdown />
                                    </div>
                                    <div className = "shipping shipping_row_div">
                                          <label>postal code</label>
                                          <input type ="text" />
                                          <label>phone number</label>
                                          <input type ="text" />
                                    </div>
                                    <input type="radio" className = "shipping"/>my billing address is same as the shipping address<br/>
                                    <span>shipping method</span>
                                    <input type="radio" className = "shipping"/>free<br/>
                                    <input type="radio" className = "shipping"/>expedite<br/>
                                    <button className = "submit">submit</button>
                              </div>
                              <div className = "user_details">
                                    <p>3. Billing </p>
                              </div>
                              <div className= "user_details">
                                    <p>4. payment </p>
                              </div>
                      </div>

                      {/* Second div for cart summary */}
                      <div className = "checkout_order_summary">
                              <p className="order_summary_heading">
                                    order summary 
                                    <Link to = '/cart' 
                                          style = {{textDecoration:'none', color:' rgb(2, 109, 109)'}}>
                                          <span style= {{paddingLeft:'145px'}}>edit card</span>
                                    </Link>
                              </p>
                              <div style = {{paddingTop:'40px'}}>
                                    {cart && cart.map((cartItem) => (
                                          <CheckoutOrderSummary cartItem = {cartItem}/>
                                    ))}
                              </div>

                              <div>
                                    {/* <SubTotal /> */}
                                    <div className="subtotal_main" style = {{paddingLeft:'0px'}}>
                                          <CurrencyFormat
                                                renderText={(value) => (
                                                      <>
                                                      <p>
                                                            Subtotal ({cart.length} items)  <span>{value}</span>
                                                      </p>
                                                      <p>Shipping
                                                            <span style= {{paddingLeft:'170px'}}>enter zipcode</span>
                                                      </p>
                                                      <p>Coupon Code 
                                                            <span>coupon code</span></p>
                                                      <p>Total  
                                                            <span style= {{paddingLeft:'230px'}}><strong>{value}</strong></span>
                                                      </p>
                                                      </>
                                                )}
                                          
                                                decimalScale={2}
                                                value={getCartTotal(cart)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                          />
                                          
                                          <Link to = '/payment'><button>
                                                Checkout
                                          </button></Link>
                                    </div>
                              </div>
                      </div>
                </div> 
            </div>
      )
}

export default Checkout;
