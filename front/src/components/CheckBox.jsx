import axios from "axios";
import React, { useState } from "react";

function CheckBox({selected,checkedId}) {
console.log(selected)
  async function select(e){
    const {name}=e.target;
    await axios.put(`/completeTask/${checkedId}`,{name})
  }

  return (
    <div>
      <label className="container">
        <input type="checkbox" onChange={select} name={selected}/>
        <div className="checkmark"></div>
      </label>
    </div>
  );
}

export default CheckBox;
