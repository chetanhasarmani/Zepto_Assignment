
import React, { useState, useRef, useEffect } from 'react';
import './ChipInput.css';

const ChipInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const allItems = [
    { name: 'Peter Parker', email: 'peter@gmail.com' },
    { name: 'Scarlet Witch', email: 'witch@gmail.com' },
    { name: 'Vision', email: 'vision@gmail.com' },
    { name: 'Thor', email: 'thor@gmail.com' },
    { name: 'Hulk', email: 'hulk@gmail.com' },
    { name: 'Loki', email: 'loki@gmail.com' },
    { name: 'John Doe', email: 'john@gmail.com' },
    { name: 'Jane Smith', email: 'jane@gmail.com' },
    { name: 'Nick Giannopoulos', email: 'nick@gmail.com' },
    { name: 'Alice Johnson', email: 'alice@gmail.com' },
    { name: 'Tony Stark', email: 'tony@gmail.com' },
  ];

  const [items, setItems] = useState(allItems);

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = allItems.filter(
      (item) =>
        !chips.find(
          (chip) => chip.label === `${item.name} ${item.email}`
        ) &&
        `${item.name} ${item.email}`
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    setItems(filtered);
  };

  const handleItemSelect = (item) => {
    setChips([...chips, { id: Date.now(), label: `${item.name} ${item.email}` }]);
    setInputValue('');
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handleChipRemove = (id, label) => {
    const [name] = label.split(' ');
    const item = allItems.find((i) => i.name === name);
    setChips(chips.filter((chip) => chip.id !== id));
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleUserItemClick = (item) => {
    setChips([...chips, { id: Date.now(), label: `${item.name} ${item.email}` }]);
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleItemSelect(inputValue.trim());
    }

    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id, lastChip.label);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="chip-input-container">
      <div className="chips-container flex flex-wrap gap-2">
        {chips.map((chip) => (
          <div key={chip.id} className="chip chip-item">
            {chip.label}
            <button
              onClick={() => handleChipRemove(chip.id, chip.label)}
              className="chip-remove-btn"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="input-field w-1/2 p-2 border-none pt-8 border-b-2 border-blue-500 rounded outline-none h-auto"
        placeholder="Type here..."
      />
      <ul className="item-list relative w-1/2 max-h-200 overflow-y-auto list-none p-0 m-0">
       
        {items.map(item => (
        <li
          key={item.name}
          onClick={() => handleUserItemClick(item)}
          className="user-item p-2 cursor-pointer hover:bg-gray-300"
          >
          <div className="name">{item.name}</div>
          {item.email && <div className="email">{item.email}</div>}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default ChipInput;
