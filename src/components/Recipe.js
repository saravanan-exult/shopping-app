import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipe extends Component {

    componentWillUnmount() {
        // if(this.refs.shipping.checked) {
        //     this.props.substractShipping()
        // }
    }

    handleChecked = (e) => {
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    render() {
        console.log('addedItems', this.props.addedItems);
        let discount = (this.props.total >= 50) ? (this.props.total/10) : 0;
        return (
            <div className="container">
                <ul className="collection">
                    <li className="collection-item price-details">
                        Price Details
                    </li>
                    <li className="collection-item price-summary">
                        <div className="row mb-0">
                            <label className="col s6">
                                Bag Total
                            </label>
                            <label className="col s6 text-right">
                            $ {(this.props.total).toFixed(2)}
                            </label>
                        </div>
                        <div className="row mb-0">
                            <label className="col s6">
                                Discount
                            </label>
                            <label className="col s6 text-right">
                            - $ {discount.toFixed(2)}
                            </label>
                        </div>
                    </li>
                    {/* <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                            <span>Shipping(+6$)</span>
                        </label>
                    </li> */}
                    <li className="collection-item total-amount">Total: <span className="right">$ {(this.props.total.toFixed(2) - discount.toFixed(2)).toFixed(2)}</span></li>
                </ul>
                <div className="checkout">
                    <button className="waves-effect waves-light btn">Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);