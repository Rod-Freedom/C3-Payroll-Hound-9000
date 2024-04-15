// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeeTable = document.querySelector('#employee-table');
const tableColumns = ['index', 'First Name', 'Second Name', 'Salary'];
let employeesArray = [];

// Collect employee data
const collectEmployees = () => {
  // To keep the lloop working until it's stopped by the user.
  let continuePrompt = true;

  while (continuePrompt) {
    let employee = {};
    let fName = prompt(`What's the employee first name?`);
    
    if (!fName) return
    if (fName) employee.firstName = fName

    employee.firstName = employee.firstName.replace(employee.firstName[0], employee.firstName[0].toUpperCase());

    let lName = prompt(`What's ${employee.firstName}'s last name?`);
    
    if (!lName) return
    if (lName) employee.lastName = lName
    
    employee.lastName = employee.lastName.replace(employee.lastName[0], employee.lastName[0].toUpperCase());
    
    let salary = prompt(`What's ${employee.firstName}'s salary?`);
    
    if (!salary) return
    if (isNaN(salary)) employee.salary = 0;
    else employee.salary = Number(salary)
    
    employeesArray.push(employee);
    
    continuePrompt = confirm(`Do you want to add another employee?`);
    if (!continuePrompt) return employeesArray
  }

};

// Display the average salary
const displayAverageSalary = (employees) => {
  let salarySum = 0;
  let ending;
  
  if (employees.length > 1) ending = 's'
  else ending = ''

  for (let i = 0; i < employees.length; i++) {
    salarySum += employees[i].salary;
  }

  let salary = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD'
  }).format(salarySum / employees.length);

  console.log(`The average salary in your organization is ${salary}\nYou count with ${employees.length} employee${ending}.`);
};

// Select a random employee
const getRandomEmployee = (employees) => {
  // TODO: Select and display a random employee
  const eNumber = Math.floor(Math.random() * employees.length)

  console.log(`Congratulations to ${employees[eNumber].firstName} ${employees[eNumber].lastName} for winning this month's award!`);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = (employeesArray) => {
  // Get the employee table

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    
    // Format the salary as currency
    // salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
    //   style:"currency",
    //   currency:"USD"
    // });

    // The formula above wasn't working. This one is:
    salaryCell.textContent = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD'
    }).format(currentEmployee.salary);

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = () => {
  // This collects data via prompts and then returns the value as an object array to assign it as a constant. 
  const employees = collectEmployees();

  if (employees === undefined) return

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort((a,b) => {
    if (a.lastName.toUpperCase() < b.lastName.toUpperCase()) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);