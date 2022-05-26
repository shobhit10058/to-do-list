import React from "react";
import { useState, useEffect } from "react";

const ToDoListItem = (prop) => {
  const { checked, handleCheck, handleDelete, content, position } = prop;
  return (
    <div className="flex_box_middle_spacing margin_4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          handleCheck(e.target.checked, position);
        }}
      />
      <span style={{ textDecoration: `${checked ? "line-through" : "none"}` }}>
        {content}
      </span>
      <button
        onClick={() => {
          handleDelete(position);
        }}
      >
        x
      </button>
    </div>
  );
};

const ToDoList = (prop) => {
  const [state, setState] = useState({
    filter: "All",
    toDoItems: [],
  });

  const handleNewItem = (value) => {
    const newItem = { checked: false, content: value };
    setState((state) => {
      return {
        ...state,
        toDoItems: [...state.toDoItems, newItem],
      };
    });
  };

  const handleCheck = (checked, itemPosition) => {
    setState((state) => {
      const toDoItems = state.toDoItems.map((item, index) => {
        if (index === itemPosition) return { ...item, checked };
        return item;
      });
      return { ...state, toDoItems };
    });
  };

  const handleDelete = (itemPosition) => {
    setState((state) => {
      const toDoItems = state.toDoItems.filter((item, index) => {
        return index !== itemPosition;
      });
      return { ...state, toDoItems };
    });
  };

  const handleFilter = (filter) => {
    setState((state) => {
      return { ...state, filter };
    });
  };

  const filteredItems = () => {
    const filterCheck = state.filter === "Completed";
    return state.toDoItems.map((item, index) => {
      const props = {
        ...item,
        handleCheck,
        handleDelete,
        position: index,
        key: index,
      };
      if (state.filter === "All" || item.checked === filterCheck)
        return <ToDoListItem {...props} />;
      return null;
    });
  };

  return (
    <div>
      <h2 className="centre_text">To Do List</h2>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleNewItem(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <select
        name="filter"
        value={state.filter}
        onChange={(e) => {
          handleFilter(e.target.value);
        }}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
      {filteredItems()}
    </div>
  );
};

export default ToDoList;
