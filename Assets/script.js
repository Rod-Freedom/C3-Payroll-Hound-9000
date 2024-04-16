// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeeTable = document.querySelector('#employee-table');
const tableColumns = ['index', 'First Name', 'Second Name', 'Salary'];
let employeesArray = [];

// Collect employee data
const collectEmployees = () => {
  // To keep the loop working until it's stopped by the user.
  let continuePrompt = true;

  while (continuePrompt) {
    // Declaring a new object/employee for each loop.
    // Declaring variables for the prompts.
    let employee = {};
    let fName;
    let lName;
    let salary;
    
    // The user will be prompted and alerted if they're entering invalid values.
    do {
      fName = prompt(`What's the employee first name?`)
      if (fName === "") alert('Please enter a valid value.')
    } while (fName === "")
  
    // If the user cancels the prompt, it will stop the function. 
    // If the user gives an input, it will be stored as a property of "employee".
    if (!fName) return employeesArray
    if (fName) employee.firstName = fName

    // The following line turns the first letter of the name into an uppercase for a nice format.
    employee.firstName = employee.firstName.replace(employee.firstName[0], employee.firstName[0].toUpperCase());
    
    // Now asking for the last name, but using the first name for a friendlier experience.
    do {
      lName = prompt(`What's ${employee.firstName}'s last name?`);
      if (lName === "") alert('Please enter a valid value.')
    } while (lName === "")
    
    if (!lName) return employeesArray
    if (lName) employee.lastName = lName
    
    employee.lastName = employee.lastName.replace(employee.lastName[0], employee.lastName[0].toUpperCase());
    
    // For the salary, the next lines will test if the input given is a number, if not, it'll alert the user.
    do {
      salary = prompt(`What's ${employee.firstName}'s salary?`);
      if (isNaN(salary) || salary === "") alert('Please enter a valid number.')
    } while (isNaN(salary) || salary === "")
    
    // If the user inputs a number, it will be stored as a number value for further use.
    if (!salary) return employeesArray
    else employee.salary = Number(salary)
  
    // The new employee is being pushed into the global array declared at the top.
    employeesArray.push(employee);
    
    // If the user chooses not to add another employee, the loop will be terminated returning the "employeesArray" that's a global variable anyway.
    continuePrompt = confirm(`Do you want to add another employee?`);
    if (!continuePrompt) return employeesArray
  }

};

// Display the average salary
const displayAverageSalary = (employees) => {
  let salarySum = 0;
  let ending;
  
  // This variable will be used below in case there's more than one employee.
  if (employees.length > 1) ending = 's'
  else ending = ''

  // This makes a summation of the employees' salary.
  for (let i = 0; i < employees.length; i++) {
    salarySum += employees[i].salary;
  }

  // This will give format to the employees' salary while dividing it into the number of employees to determine the average.
  let salary = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD'
  }).format(salarySum / employees.length);

  console.log(`The average salary in your organization is ${salary}\nYou count with ${employees.length} employee${ending}.`);
};

// Select a random employee
const getRandomEmployee = (employees) => {
  // To generate a random number based on the number of employees.
  const eNumber = Math.floor(Math.random() * employees.length)

  // The "eNumber" will be used to extract the data from the employees array. 
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
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = () => {
  // This collects data via prompts and then returns the value as an object array to assign it as a constant. 
  const employees = collectEmployees();

  // If the function above returns undefined due to the user canceling the prompts, it will stop the function.
  // It will also stop if no employees are added.
  if (employees === undefined || employees.length === 0) return
  
  // If more employees are added, the console will clear.
  console.clear();
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