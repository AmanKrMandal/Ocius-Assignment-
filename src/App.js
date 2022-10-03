import React, { useState, useEffect } from "react";

const App = () => {
  const getDataForm = () => {
    const data = localStorage.getItem("records");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  let [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    phonenumber: "",
  });
  const [records, setRecords] = useState(getDataForm());
  const [editButton, setEditButton] = useState(true);
  const [editItem, setEditItem] = useState(null);

  let handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log = (value, name);
    setInputData({ ...inputData, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData) {
      alert("Pls submit the details");
    } else if (inputData && !editButton) {
      setRecords(
        records.map((item) => {
          if (item.id === editItem) {
            return { ...item, ...inputData };
          }
          return item;
        })
      );

      setEditButton(true);
      setInputData({
        firstname: "",
        lastname: "",
        dob: "",
        email: "",
        phonenumber: "",
      });
      setEditItem(null);
    } else {
      const newData = { ...inputData, id: new Date().getTime().toString() }; 
      setRecords([...records, newData]); 
      setInputData({
        firstname: "",
        lastname: "",
        dob: "",
        email: "",
        phonenumber: "",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]); //delete

  const handleDelete = (index) => {
    const deleteItem = records.filter((item) => {
      return index !== item.id;
    });
    setRecords(deleteItem);
  }; //update

  const handleUpdate = (id) => {
    let newUpdate = records.find((item) => {
      return item.id === id;
    }); 
    setEditButton(false);
    setInputData(newUpdate);
    setEditItem(id);
  };

  return (
    <div className="container">
      <div className="conatiner">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <form className="mt-5" onSubmit={handleSubmit} action="">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstname"
                value={inputData.firstname}
                onChange={handleInput}
                required
              />
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                name="lastname"
                value={inputData.lastname}
                onChange={handleInput}
                required
              />
              <label>DOB</label>
              <input
                type="date"
                placeholder="DOB"
                className="form-control"
                name="dob"
                value={inputData.dob}
                onChange={handleInput}
                required
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                value={inputData.email}
                onChange={handleInput}
                required
              />

              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Phone number"
                className="form-control"
                name="phonenumber"
                value={inputData.phonenumber}
                onChange={handleInput}
              />

              <div className="d-grid gap-2 mt-4">
                {editButton ? (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                ) : (
                  <button className="btn btn-warning">Update</button>
                )}
              </div>
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
      <div>
        {records.length > 0 && (
          <div className="mt-5">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update Item</th>
                  <th>Remove Item</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.dob}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>

                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleUpdate(item.id)}
                        >
                          Update
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {records.length < 1 && (
          <div className="text-center mt-5 mb-5">No any data right now</div>
        )}
      </div>

      {!records.length < 1 && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-danger" onClick={() => setRecords([])}>
            Remove All
          </button>
        </div>
      )}
    </div>
  );
};

export default App;