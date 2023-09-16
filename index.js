/* Your Code Here */
function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(employeeDataArray){
    const employeeRecords = [];

    for(let i = 0; i < employeeDataArray.length ; i++){
        const employeeData = employeeDataArray[i];
        const employeeRecord = createEmployeeRecord(employeeData);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent(dateTimeString){
    // console.log(this)
    const timeInEvent = {};

    // Sets the type to "TimeIn"
    timeInEvent.type = "TimeIn";

    // Extract the date from the dateTimeString
    const [date, time] = dateTimeString.split(' ');
    timeInEvent.date = date;

    // Extract the hour from the time
    const hour = parseInt(time, 10);
    timeInEvent.hour = hour;

    // Add the time in event to the employee's timeInEvents
    this.timeInEvents.push(timeInEvent);

    // console.log("createTimeInEvent Function:", employeeRecord)
    return this
}

function createTimeOutEvent(dateTimeString){
    const timeOutEvent = {};

    timeOutEvent.type = "TimeOut";

    const [date, time] = dateTimeString.split(' ');
    timeOutEvent.date = date;

    const hour = parseInt(time, 10);
    timeOutEvent.hour = hour;

    this.timeOutEvents.push(timeOutEvent);

    // console.log("createTimeOutEvent Function:", employeeRecord)
    return this
}

function hoursWorkedOnDate(date){
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

  if (timeInEvent && timeOutEvent) {
    const hoursWorked = timeOutEvent.hour - timeInEvent.hour;
    return hoursWorked / 100;
  } else {
    return 0; 
  }
}

// function wagesEarnedOnDate(cRecord/this, date)

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const pay = hoursWorked * this.payPerHour;
    return pay;
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(function(employee) {
      return employee.firstName === firstNameString;
    });
    }

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(totalPayroll, employee) {
    return totalPayroll + allWagesFor.call(employee);
  }, 0);
}

// function wagesEarnedOnDate(date){
//     // console.log(this)
//     console.log(date)
//     let hoursWorked = hoursWorkedOnDate(this.date)
//     console.log('HOURS WORKED:', hoursWorked)
//     return (hoursWorked * this.payPerHour)
// }









/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

