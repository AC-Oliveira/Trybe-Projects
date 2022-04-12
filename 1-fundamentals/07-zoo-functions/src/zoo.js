const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  const array = [];
  ids.forEach((element) => {
    array.push(species.find((string) => string.id === element));
  });
  return array;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  let allAnimalsOlderThan = data.species.find((element2) => element2.name === animal).residents;
  allAnimalsOlderThan = allAnimalsOlderThan.every((element3) => element3.age > age);
  return allAnimalsOlderThan;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const obj = data.employees.find(
    (element4) => element4.firstName === employeeName || element4.lastName === employeeName,
  );
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some((element5) => {
    const employeeIsManager = element5.managers.some((element6) => element6 === id);
    return employeeIsManager === true;
  });
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  // seu código aqui
  let obj1 = {};
  if (!animal) {
    species.forEach((element7) => {
      obj1[element7.name] = element7.residents.length;
    });
  }
  if (animal) {
    obj1 = species.find((element8) => element8.name === animal).residents.length;
  }
  return obj1;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const price = Object.keys(entrants).reduce((acc, curr) => acc + entrants[curr] * prices[curr], 0);
  return price;
}

function getAnimalRegion() {
  const obj2 = {};
  species.forEach((element9) => {
    if (!obj2[element9.location]) {
      obj2[element9.location] = [element9.name];
    } else {
      obj2[element9.location].push(element9.name);
    }
  });
  return obj2;
}

const sortAndSex = (aNamesArray, objOptions, unknownParameter) => {
  if (objOptions.sex) {
    unknownParameter.residents.filter((animals) => animals.sex === objOptions.sex).forEach(
      (element) => aNamesArray.push(element.name),
    );
  }
  if (!objOptions.sex) {
    unknownParameter.residents.forEach((animals1) => aNamesArray.push(animals1.name));
  }
  if (objOptions.sorted === true) return aNamesArray.sort();
  return aNamesArray;
};

const unamedFunction = (unknownParameter, unamedObj, optionsObj) => {
  let animalNamesArray = [];
  const unamedObj2 = unamedObj;
  animalNamesArray = sortAndSex(animalNamesArray, optionsObj, unknownParameter);
  if (!unamedObj[unknownParameter.location]) {
    unamedObj2[unknownParameter.location] = [{ [unknownParameter.name]: animalNamesArray }];
  } else {
    unamedObj2[unknownParameter.location].push({ [unknownParameter.name]: animalNamesArray });
  }
  return unamedObj2;
};

function getZooResidents(optionsObj) {
  let obj3 = {};
  species.forEach((animalsObject) => {
    obj3 = unamedFunction(animalsObject, obj3, optionsObj);
  });
  return obj3;
}

function getAnimalMap(options) {
  // seu código aqui
  let obj4;
  if (options === undefined || !options.includeNames) return getAnimalRegion();
  if (options.includeNames === true) {
    obj4 = getZooResidents(options);
  }
  return obj4;
}

const getFormatedString = (opening, closing) => `Open from ${opening}am until ${closing - 12}pm`;

function getSchedule(dayName) {
  // seu código aqui
  const schedule = {};
  const days = Object.keys(hours);
  for (let index = 0; index < days.length; index += 1) {
    if (hours[days[index]].open + hours[days[index]].close > 0) {
      schedule[days[index]] = getFormatedString(hours[days[index]].open, hours[days[index]].close);
    } else {
      schedule[days[index]] = 'CLOSED';
    }
  }
  if (!dayName) return schedule;
  return { [dayName]: schedule[dayName] };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  let oldestFF = employees.find((employeeID) => employeeID.id === id).responsibleFor[0];
  oldestFF = species.find((animalID) => animalID.id === oldestFF).residents.sort(
    (a, b) => b.age - a.age,
  );
  return [oldestFF[0].name, oldestFF[0].sex, oldestFF[0].age];
}

function increasePrices(percentage) {
  // seu código aqui
  const pricesChanged = prices;
  const pricesChangedKeys = Object.keys(pricesChanged);
  for (let index = 0; index < pricesChangedKeys.length; index += 1) {
    pricesChanged[pricesChangedKeys[index]] += (Math.ceil(
      pricesChanged[pricesChangedKeys[index]] * percentage,
    ) / 100);
    pricesChanged[pricesChangedKeys[index]] = Number(
      pricesChanged[pricesChangedKeys[index]].toPrecision(4),
    );
  }
  return pricesChanged;
}

const getAnimalNameId = (animalIds) => {
  const animalNamesARR = [];
  animalIds.forEach((animalID) => {
    animalNamesARR.push(species.find((animalID2) => animalID2.id === animalID).name);
  });
  return animalNamesARR;
};

const employeesResponsibleFor = () => {
  const employeesAndAnimalsObj = {};
  employees.forEach((employeesObj) => {
    const employeeFullName = `${employeesObj.firstName} ${employeesObj.lastName}`;
    employeesAndAnimalsObj[employeeFullName] = getAnimalNameId(employeesObj.responsibleFor);
  });
  return employeesAndAnimalsObj;
};

function employeesResponsibleForOBJ(idOrName) {
  const obj5 = employeesResponsibleFor();
  const { firstName, lastName } = employees.find((employeesObj) => employeesObj.id === idOrName
  || employeesObj.lastName === idOrName || employeesObj.firstName === idOrName);
  const employeeFullName = `${firstName} ${lastName}`;
  return { [employeeFullName]: obj5[employeeFullName] };
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) {
    return employeesResponsibleFor();
  }
  return employeesResponsibleForOBJ(idOrName);
}
console.log(getEmployeeCoverage());
module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
