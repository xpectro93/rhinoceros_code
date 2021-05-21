const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros');

const { validateEntries, validateSpecies, validateName , validateID } = require('./middleware');



//GET all rhinoceros
router.get('/rhinoceros', (ctx,next) => {
  const rhinoceroses = model.getAll();
  ctx.response.body = { rhinoceroses };
});


//GET rhinoceros by species
router.get('/rhinoceros/species/:breed',(ctx, next) => {
  //normalize state so middleware works
  ctx.state.species = ctx.params.breed
  next();
  
},validateSpecies,(ctx, next) => {
  const rhinocerosBySpecies = model.getRhinocerosBySpecies(ctx.state.species)
  ctx.response.body = { rhinocerosBySpecies } ;
})

//GET rhinoceros by name
router.get('/rhinoceros/name/:rhinoName',(ctx, next) => {

  ctx.state.name = ctx.params.rhinoName || "";

  next();
    
},validateName, (ctx, next) => {
  const rhinocerosByName = model.getRhinocerosByName(ctx.state.name); 
  ctx.response.body = { rhinocerosByName };
})


//POST New rhinoceros
router.post('/rhinoceros',(ctx, next) => {
  //If no input is given, then default to empty string
  ctx.state = {
    name: ctx.request.body.name|| "",
    species: ctx.request.body.species || "",
    entries: Object.keys(ctx.request.body).length
  }
  next();

}, validateEntries,validateName, validateSpecies, (ctx, next)=> {
  const newRhinoceros = model.newRhinoceros(ctx.request.body);
  ctx.response.body = { newRhinoceros };
});


//GET endangered rhinoceros
router.get('/rhinoceros/endangered', (ctx, next) => {
  const endangeredRhinoceros = model.getEndangered();
  ctx.response.body = { endangeredRhinoceros };
})

//GET rhinoceros by uuid
router.get('/rhinoceros/:id', (ctx, next) => {

  ctx.state.id = ctx.params.id;

  next();
  
}, validateID, (ctx, next) => {
  const rhinocerosByID = model.rhinoceroByID(ctx.state.idx) 
  ctx.response.body =  { rhinocerosByID };
});  


// UPDATE rhinoceros 
router.patch("/rhinoceros/:id",  (ctx, next) => {


  ctx.state = {
    id:ctx.params.id,
    name: ctx.request.body.name || "",
    species : species = ctx.request.body.species || ""
  }

  next()
 
}, validateID, validateName, validateSpecies, (ctx, next) => {
  const  updatedRhino = model.updateRhinoceros(ctx.state)
  ctx.response.body = { updatedRhino }
});

//DELETE rhinoceros by ID
router.delete('/rhinoceros/:id',(ctx, next) => {
  ctx.state.id = ctx.params.id;
  next();
  
}, validateID, (ctx, next) => {
  const deletedRhino = {message:`Rhinoceros with id ${ctx.state.id} successfully deleted`}
  model.deleteById(ctx.state.id)
  ctx.response.body = {deletedRhino}
})



module.exports = router;
