import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Button } from 'react-materialize';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            sort: 'A'
        }
    }
    handleClick = (id) => {
        this.props.addToCart(id);
    }

    sortChange = (value, data) => {
        let sortedData = data.slice().sort((a, b) => {
            return (value === 'A') ? a.price - b.price : b.price - a.price;
        });
        this.setState({
            items: sortedData,
            sort: value
        });
    }

    filterChange = (filter) => {
        let filteredList = (filter !== 'All') ? this.props.items.filter(item => item.gender === filter) : this.props.items;
        this.setState({
            items: filteredList
        });
        this.sortChange(this.state.sort, filteredList);
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
                        Sort by Price:
                        <select className="mat-select" value={this.state.sort} onChange={(e) => this.sortChange(e.target.value, this.state.items)}>
                            <option value="A">Low to High</option>
                            <option value="D">High to Low</option>
                        </select>
                        Show by Category: 
                        <select className="mat-select" defaultValue="All" onChange={(e) => this.filterChange(e.target.value)}>
                            <option value="All">All</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="K">Kids</option>
                            <option value="S">Sports</option>
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