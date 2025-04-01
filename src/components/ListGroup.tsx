interface ListGroupProps {
    items: string[];
    heading: string;
    onSelectItem  : (item: string) => void;
}
import { useState } from "react";

function ListGroup({items, heading, onSelectItem} : ListGroupProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // const ifItem = items.length === 0 ? <p>No items found</p>: null;
    // const ifItem2 = () => {
    //     items.length === 0 ? <p>No items found</p>: null;
    // }
    return (
    <>
        <h1>{heading}</h1>
        {items.length === 0 && <p>No items found</p>}
        {/* {ifItem2()} */}
        <ul className="list-group">
            {items.map((item, index) => (<li className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
            key={item} 
            onClick = {()=> {setSelectedIndex(index);
                onSelectItem(item);
            }}>
                
            {item}
             </li>
            ))}
        </ul>
    </>);
}

export default ListGroup;