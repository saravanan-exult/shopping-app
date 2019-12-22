import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, addQuantity, subtractQuantity } from '../actions/cartActions';
import Recipe from './Recipe';

class Cart extends Component {

    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    render() {
        let addedItems = this.props.items.length ? 
            (
                this.props.items.map(item => (
                    <li className="collection-item avatar row" key={item.id}>
                        <div className="item-img col s6"> 
                            <img src={item.img} alt={item.img} className=""/>
                        </div>

                        <div className="item-desc col s6">
                            <span className="title">{item.title}</span>
                            <p><b>Price: ${item.price}</b></p>
                            <p>
                                <b>Quantity: {item.quantity}</b> 
                            </p>
                            <div className="add-remove">
                                <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>add</i></Link>
                                <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>remove</i></Link>
                            </div>
                            <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                        </div>
                    </li>
                ))
            ) : (<p className="no-items">No items found in cart.</p>)
        
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <div className="row">
                        <div className="col s8">
                            <ul className="collection">
                                {addedItems}
                            </ul>
                        </div>
                        <div className="col s4">
                            <Recipe />
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);