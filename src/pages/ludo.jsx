import React, { useState } from "react";

const Ludo = () => {
  const [data, setData] = useState([
    { parjent: "", ot: "", skill: "", unskilled: "" },
  ]);

  // Function to handle input changes
  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  // Function to add a new row
  const addRow = () => {
    setData([...data, { parjent: "", ot: "", skill: "", unskilled: "" }]);
  };

  // Function to remove a row
  const removeRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
      <h2>Dynamic Input Fields</h2>
      {data.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Parjent"
            value={item.parjent}
            onChange={(e) => handleChange(index, "parjent", e.target.value)}
          />
          <input
            type="text"
            placeholder="OT"
            value={item.ot}
            onChange={(e) => handleChange(index, "ot", e.target.value)}
          />
          <input
            type="text"
            placeholder="Skill"
            value={item.skill}
            onChange={(e) => handleChange(index, "skill", e.target.value)}
          />
          <input
            type="text"
            placeholder="Unskilled"
            value={item.unskilled}
            onChange={(e) => handleChange(index, "unskilled", e.target.value)}
          />
          <button onClick={() => removeRow(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default Ludo;
