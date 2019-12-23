import Item1 from '../product-img/item1.jpg'
import Item2 from '../product-img/item2.jpg'
import Item3 from '../product-img/item3.jpg'
import Item4 from '../product-img/item4.jpg'
import Item5 from '../product-img/item5.jpg'
import Item6 from '../product-img/item6.jpg'
import Item7 from '../product-img/item7.jpg'
import Item8 from '../product-img/item8.jpg'
import Item9 from '../product-img/item9.jpg'
import Item10 from '../product-img/item10.jpg'
import Item11 from '../product-img/item11.jpg'
import Item12 from '../product-img/item12.jpg'
import Item13 from '../product-img/item13.jpg'
import Item14 from '../product-img/item14.jpg'
import Item15 from '../product-img/item15.jpg'
import Item16 from '../product-img/item16.jpg'

 
const initialState = {
    items: [
        {id:1, title: 'Product 1', gender: 'M', price:30, img: Item1},
        {id:2, title:'Product 2', gender: 'M', price:22, img: Item2},
        {id:3, title:'Product 3', gender: 'M', price:26, img: Item3},
        {id:7, title:'Product 4', gender: 'M', price:15, img: Item7},
        {id:4, title:'Product 5', gender: 'F', price:30, img:Item4},
        {id:5, title:'Product 6', gender: 'F', price:14, img: Item5},
        {id:6, title:'Product 7', gender: 'F', price:18, img: Item6},
        {id:8, title:'Product 8', gender: 'F', price:25, img: Item8},
        {id:9, title: 'Product 9', gender: 'K', price:30, img: Item9},
        {id:10, title:'Product 10', gender: 'K', price:22, img: Item10},
        {id:11, title:'Product 11', gender: 'K', price:26, img: Item11},
        {id:12, title:'Product 12', gender: 'K', price:15, img: Item12},
        {id:13, title:'Product 13', gender: 'S', price:30, img:Item13},
        {id:14, title:'Product 14', gender: 'S', price:14, img: Item14},
        {id:15, title:'Product 15', gender: 'S', price:18, img: Item15},
        {id:16, title:'Product 16', gender: 'S', price:25, img: Item16}
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