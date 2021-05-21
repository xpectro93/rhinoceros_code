const uuidv4 = require('uuid/v4');
let rhinoceroses = require('./data');



/* QUERIES */
exports.getAll = () => {
  return rhinoceroses;
};

//O(1)
exports.rhinoceroByID = id => {
  return rhinoceroses[id]
}


//O(n)
exports.getRhinocerosByName = name => {
  let rhinocero = rhinoceroses.filter(rhino => rhino.name.toLowerCase() === name.toLowerCase())
  return rhinocero.length ? rhinocero : {message: `No rhinoceros with the name of ${name} were found`}
}


//O(n)
exports.getRhinocerosBySpecies = species => {
  return rhinoceroses.filter(rhino => rhino.species.toLowerCase() === species.toLowerCase());
}


//0(n)
exports.getEndangered = (quantity = 2) => {
  
  let rhinoCount = {};

  /* count instances of a species */
  for(let rhino of rhinoceroses) {
    if(rhinoCount[rhino.species]) {
      rhinoCount[rhino.species]+=1
    }
    else {
      rhinoCount[rhino.species]=1
    }
  }


  /* based on count iterate through rhinos and add to endangered species */
  let endangered = rhinoceroses.filter(rhino => rhinoCount[rhino.species] <= quantity)
 
  return endangered
}

//O(1)
exports.newRhinoceros = data => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species,
  };
  rhinoceroses.push(newRhino);
  return newRhino;
};

//O(1)
exports.updateRhinoceros = data => {
  const updatedData = {
    name: data.name,
    species: data.species
  };
  
  const updatedRhino = {...rhinoceroses[data.idx], ...updatedData}
  /* update */;
  rhinoceroses[data.idx] = updatedRhino
  return updatedRhino

}

// 0(n)
exports.deleteById = (id) => {

  /* splice rhinoseroses array to delete rhino based on id */
  rhinoceroses.splice(id,1)
 
}
