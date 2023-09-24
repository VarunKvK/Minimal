import axios from "axios";
import React from "react";

function CheckBox({ selected, checkedId,Checked }) {
  async function select(e) {
    const { name, checked } = e.target;
    await axios.put(`/completeTask/${checkedId}`, { name, completed: checked });
  }

  return (
    <div>
      <label className="container">
        <input type="checkbox" onChange={select} name={selected} checked={Checked ? "checked":null}/>
        <div className="checkmark"></div>
      </label>
    </div>
  );
}

export default CheckBox;
