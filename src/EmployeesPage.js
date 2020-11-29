import { useEffect, useState } from "react";
import "./EmployeesPage.css";

const EmployeesPage = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);

    useEffect(() => {
        fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
            .then((res) => res.json())
            .then((employeesData) => setEmployees([...employeesData]));
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("checked"));
        if (data) {
            setCheckboxes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("checked", JSON.stringify(checkboxes));
    }, [checkboxes]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("selected"));
        if (data) {
            setSelectedEmp(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selected", JSON.stringify(selectedEmp));
    }, [selectedEmp]);

    const chooseCheckbox = (checkboxId, e) => {
        if (e.currentTarget.checked) {
            setCheckboxes([...checkboxes, checkboxId]);
        } else {
            setCheckboxes(checkboxes.filter((id) => id !== checkboxId));
        }
    };
    const removeEmp = (id) => {
        const newArr = selectedEmp.filter((emp) => id !== emp.id);
        setSelectedEmp(newArr);
    };

    const addEmp = (emp) => {
        setSelectedEmp([...selectedEmp, emp]);
    };

    const removeCheck = (id) => {
        const newArr = checkboxes.filter((selectedId) => id !== selectedId);
        setCheckboxes(newArr);
    };

    return (
        <div className="wrapper">
            <div className="employees">
                <h2>Employees</h2>
                <div className="alphabet">
                    {alphabet.map((letter) => {
                        const employeesArr = [];
                        return (
                            <div className="letter" key={letter}>
                                <h3>{letter}</h3>
                                {employees.map((employee) => {
                                    const {
                                        firstName,
                                        lastName,
                                        id,
                                    } = employee;
                                    if (lastName.charAt(0) === letter) {
                                        employeesArr.push(
                                            `${lastName} ${firstName}`
                                        );
                                        return (
                                            <p className="user" key={id}>
                                                <input
                                                    id={id}
                                                    type="checkbox"
                                                    checked={
                                                        checkboxes.indexOf(
                                                            id
                                                        ) != -1
                                                    }
                                                    onChange={(e) => {
                                                        let checkbox = document.getElementById(
                                                            id
                                                        );
                                                        if (checkbox.checked) {
                                                            addEmp(employee);
                                                            chooseCheckbox(
                                                                id,
                                                                e
                                                            );
                                                        } else if (
                                                            !checkbox.checked
                                                        ) {
                                                            removeEmp(id);
                                                            removeCheck(id);
                                                        }
                                                    }}
                                                />
                                                {`${lastName} ${firstName}`}
                                            </p>
                                        );
                                    }
                                })}
                                {employeesArr.length === 0 ? <p>---</p> : ""}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="birthday">
                <h2>Employees birthday</h2>
                <hr />
                {selectedEmp.length === 0 ? (
                    <div>No selected employees</div>
                ) : (
                    months.map((current, index) => {
                        const monthHolder = selectedEmp.filter(
                            (emp) =>
                                new Date(Date.parse(emp.dob)).getMonth() ===
                                index
                        );
                        return (
                            <div key={current}>
                                {monthHolder.length === 0 ? (
                                    ""
                                ) : (
                                    <div>
                                        <h3>{months[index]}</h3>
                                        <ul className="month">
                                            {monthHolder.map((emp) => {
                                                const {
                                                    id,
                                                    lastName,
                                                    firstName,
                                                    dob,
                                                } = emp;
                                                const date = new Date(
                                                    dob
                                                ).toLocaleString("en-EN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                });
                                                return (
                                                    <li
                                                        key={id}
                                                    >{`${lastName} ${firstName} - ${date} year`}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default EmployeesPage;
