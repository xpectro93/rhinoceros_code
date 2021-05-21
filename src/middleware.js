let rhinoceros =  require("./data");

//O(n)
exports.validateSpecies = (ctx, next) => {
    
    const  validSpecies = [`white_rhinoceros`, `black_rhinoceros`, `indian_rhinoceros`, `javan_rhinoceros`, `sumatran_rhinoceros`];
    const { species } = ctx.state;

    /* check if request value of species matches valid species */
   if (validSpecies.includes(species)) {
    
       next()
   }
   else {
       ctx.response.body = {message:"Invalid Species"}
   }
}
//O(1)
exports.validateName =(ctx, next) => {

    const { name } = ctx.state
    /* Check if input length is valid*/
    if ((name.length >= 1 && name.length <= 20)) {
        next()
    }
    else {
        ctx.response.body = {message:"Invalid Name"}
    }
    
}

//O(n)
exports.validateID = (ctx, next) => {
    
  const { id } = ctx.state
  /* Check if id value exists, get index number for quick lookup*/
  let idx = rhinoceros.findIndex(rhino => rhino.id === id)

  if(idx > -1) {
      ctx.state.idx = idx
      next()
  }
  else {
      ctx.response.body = {message: "ID not found"}
  }
}

exports.validateEntries = (ctx, next) => {
  const { entries } = ctx.state
  if(entries <= 2) {
      next();
  }
  else {
      ctx.response.body = {message: "Name and Species are the only allowed entries"};
  }

}