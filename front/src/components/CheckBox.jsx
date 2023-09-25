import axios from "axios";
import React from "react";

function CheckBox({ selected, checkedId,Checked }) {
  console.log(checkedId)
  async function select(e) {
    const { name, checked } = e.target;
    await axios.put(`/completeTask/${checkedId}`, { name, completed: checked }).then(()=>window.location.reload());
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
