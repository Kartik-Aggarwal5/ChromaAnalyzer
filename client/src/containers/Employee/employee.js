import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { EMPLOYEE } from "../../api";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const emp = await axios.get(EMPLOYEE);
      console.log("emp", emp);
      if (emp && emp.data) {
        setEmployee(emp.data);
      }
    };
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    console.log("hhghghg");
    console.log(id);
    try {
      const emp = await axios.delete(`${EMPLOYEE}?id=${id}`);
      if (emp) {
        toast.success("Employee deleted sucessfully.");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Some Error occured. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Mobile</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((emp) => {
                  return (
                    <tr>
                      <td>{emp.emp_id}</td>
                      <td>{emp.emp_fname}</td>
                      <td>{emp.emp_lname}</td>
                      <td>{emp.emp_des}</td>
                      <td>{emp.emp_gender}</td>
                      <td>{emp.emp_phone}</td>
                      <td>
                        {
                          <div onClick={() => deleteEmployee(emp.emp_id)}>
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </div>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
