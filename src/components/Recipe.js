import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Table } from 'react-materialize';


class Recipe extends Component {
    render() {
        console.log('addedItems', this.props.addedItems);
        let discount = (this.props.total >= 50) ? (this.props.total/10) : 0;
        let invoiceNum = 'Invoice - #' + (Math.floor(Math.random()*90000000) + 10000);
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
                    
                    <li className="collection-item total-amount">Total: <span className="right">$ {(this.props.total.toFixed(2) - discount.toFixed(2)).toFixed(2)}</span></li>
                </ul>
                <div className="checkout">
                <Modal
                    actions={[
                        <Button flat modal="close" node="button" waves="green">Close</Button>
                    ]}
                    bottomSheet={false}
                    fixedFooter={false}
                    header={invoiceNum}
                    id="modal-0"
                    options={{
                        dismissible: true,
                        endingTop: '10%',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: '4%'
                    }}
                    trigger={<Button node="button" disabled={this.props.total === 0}>Checkout</Button>}>
                        <Table>
                            <thead>
                                <tr>
                                    <th data-field="id" width="25%">Product Name</th>
                                    <th data-field="name" width="25%">Rate</th>
                                    <th data-field="price" width="30%">Qty</th>
                                    <th data-field="total" width="20%">Line Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.addedItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price * item.quantity}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Sub Total</td>
                                    <td>$ {(this.props.total).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Discount</td>
                                    <td>- $ {discount.toFixed(2)}</td>
                                </tr>
                                <tr className="total-invoice">
                                    <td></td>
                                    <td></td>
                                    <td>Amount to be paid</td>
                                    <td>$ {(this.props.total.toFixed(2) - discount.toFixed(2)).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                    </Modal>
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