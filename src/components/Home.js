import React from 'react';
import { connect } from 'react-redux';
import { addToCart, filterBy } from '../actions/cartActions';
import { Button } from 'react-materialize';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }
    handleClick = (id) => {
        this.props.addToCart(id);
    }

    filterChange = (filter) => {
        if(filter !== 'All') {
            let filteredList = this.props.items.filter(item => item.gender === filter);
            this.setState({
                items: filteredList
            });
        } else {
            this.setState({
                items: this.props.items
            });
        }
    }

    render() {
        let itemList = this.state.items.map(item => (
            <div className="col s3" key={item.id}>
                <div className="card">
                    <div className="card-image">
                        <img src={item.img} alt={item.title} />
                        <Button to="/" className="btn-floating halfway-fab waves-effect waves-light" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></Button>
                    </div>
                    <div className="card-content">
                    <span className="card-title">{item.title}</span>
                        <p className="item-price">${item.price}</p>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="container">
                <div className="row">
                    <div className="col s6"><h3 className="page-title">Our Products</h3></div>
                    <div className="col s6 text-right filter-section">
                        Show: 
                        <select className="mat-select" defaultValue="All" onChange={(e) => this.filterChange(e.target.value)}>
                            <option value="All">All</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div>
                
                <div className="box row">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => {
            dispatch(addToCart(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);