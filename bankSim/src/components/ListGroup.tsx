
function ListGroup() {
    let items = ['Sword', 'Shield', 'Potion', 'Boots', 'Helmet'];

    // const ifItem = items.length === 0 ? <p>No items found</p>: null;
    // const ifItem2 = () => {
    //     items.length === 0 ? <p>No items found</p>: null;
    // }
    return (
    <>
        <h1>List Group</h1>
        {items.length === 0 && <p>No items found</p>}
        {/* {ifItem2()} */}
        <ul className="list-group">
            {items.map((item) => (<li className="list-group-item s" 
            key={item} 
            onClick = {()=> console.log('Item clicked', item)}>
            {item}
             </li>
            ))}
        </ul>
    </>);
}

export default ListGroup;