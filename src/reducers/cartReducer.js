import Item1 from '../product-img/item1.jpg'
import Item2 from '../product-img/item2.jpg'
import Item3 from '../product-img/item3.jpg'
import Item4 from '../product-img/item4.jpg'
import Item5 from '../product-img/item5.jpg'
import Item6 from '../product-img/item6.jpg'
import Item7 from '../product-img/item7.jpg'
import Item8 from '../product-img/item8.jpg'

 
const initialState = {
    items: [
        {id:1, title: 'Product 1', gender: 'M', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima', price:110,img:Item1},
        {id:2,title:'Product 2', gender: 'M', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price:80,img: Item2},
        {id:3,title:'Product 3', gender: 'M', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima",price:120,img: Item3},
        {id:7,title:'Product 4', gender: 'M', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima",price:120,img: Item7},
        {id:4,title:'Product 5', gender: 'F', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price:260,img:Item4},
        {id:5,title:'Product 6', gender: 'F', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price:160,img: Item5},
        {id:6,title:'Product 7', gender: 'F', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima",price:90,img: Item6},
        {id:8,title:'Product 8', gender: 'F', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima",price:120,img: Item8}
    ],
    addedItems: [],
    total:0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_CART': {
            let addedItem = state.items.find(item=> item.id === action.id);
            let existed_item= state.addedItems.find(item=> action.id === item.id);
            if(existed_item) {
                addedItem.quantity += 1;
                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            } else {
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price;
                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal
                }
            }
        }

        case 'FILTER_BY': {
            let listItems = [...state.items];
            if(action.filter !== 'All') {
                console.log('before', state.items);
                let filteredList = listItems.filter(item => item.gender === action.filter);
                console.log('after', state.items);
                return {
                    ...state,
                    items: filteredList
                }
            }
        }

        case 'REMOVE_ITEM' : {
            let itemToRemove= state.addedItems.find(item=> action.id === item.id);
            let new_items = state.addedItems.filter(item=> action.id !== item.id);
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }

        case 'ADD_QUANTITY': {
            let addedItem = state.items.find(item=> item.id === action.id);
            addedItem.quantity += 1;
            let newTotal = state.total + addedItem.price;
            return{
                ...state,
                total: newTotal
            }
        }

        case 'SUB_QUANTITY': {
            let addedItem = state.items.find(item=> item.id === action.id);
            if(addedItem.quantity === 1) {
                let new_items = state.addedItems.filter(item=>item.id !== action.id);
                let newTotal = state.total - addedItem.price;
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            } else {
                addedItem.quantity -= 1;
                let newTotal = state.total - addedItem.price;
                return{
                    ...state,
                    total: newTotal
                }
            }
        }

        case 'ADD_SHIPPING': {
            return {
                ...state,
                total: state.total + 6
            }
        }

        case 'SUB_SHIPPING': {
            return{
                ...state,
                total: state.total - 6
            }
        }
        default:
            return state;
    }
}

export default cartReducer;