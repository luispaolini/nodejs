const express = require("express");

const server = express();

server.listen(3000);

server.use(express.json());

const projects = [];

//Check if project exists
function checkProjectExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({error: "Project not found"});
  }
  return next();
}

//Request counter
function logRequests(req, res, next){
  const request = 0;

  console.count("#requests");

  return next();
}

//Create a new project
server.post('/projects', logRequests, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  
  return res.json(project);
});

//Return all projects
server.get('/projects', logRequests, (req, res) => {
  return res.json(projects);
});

//Update a project title
server.put('/projects/:id', logRequests, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Delete a project
server.delete('/projects/:id', logRequests, checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

//Create a new task
server.post('/projects/:id/tasks', logRequests, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id = id);

  project.tasks.push(title);

  return res.json(project);
});



