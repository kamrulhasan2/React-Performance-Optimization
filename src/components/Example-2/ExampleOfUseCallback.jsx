import React, { useState, useCallback } from 'react';

const idGenerator = ()=>{
    return Math.floor(Math.random() * 10000);
}

const ItemList = React.memo(({ items, onDeleteItem }) => {
    console.log("ItemList Re-rendered");
       return( <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name} 
                    <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
});

/* Without React.memo, the ItemList component would re-render every time the 
     ParentComponent re-renders, even if the items prop hasn't changed. 
     By wrapping ItemList with React.memo, we ensure that it only re-renders when 
     its props change, thus optimizing performance.
*/

//  const ItemList = ({ items, onDeleteItem }) => {
//        return( <ul>
//             {items.map(item => (
//                 <li key={item.id}>
//                     {item.name} 
//                     <button onClick={() => onDeleteItem(item.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };


const ParentComponent = () => {

    const [items, setItems] = useState([{ id: idGenerator(), name: 'Item 1' }]);
    const [inputValue, setInputValue] = useState('');

   const handleClick = (e)=>{
        e.preventDefault();
        if(inputValue.trim() === '') return;
        const newItem = { id: idGenerator(), name: inputValue };
        setItems(currentItems => [...currentItems, newItem]);
        setInputValue('');
   }

    const handleDeleteItem = useCallback((id) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    }, []);

    return (
        <div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type here..." />
            <button onClick={handleClick}>Add</button>
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
        </div>
    );
};

export default ParentComponent;