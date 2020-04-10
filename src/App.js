import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

// const remainingProjects = [...projects];
// const index = remainingProjects.findIndex(project => project.id === id);
// remainingProjects.splice(index, 1);
// setProjects(remainingProjects);

function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setProjects(response.data));
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Título - ${new Date()}`,
      techs: ["React", "Node.js"],
    }).then(result => {
      const newProjects = [...projects, result.data];
      setProjects(newProjects)
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const remaining = projects.filter(project => project.id !== id);
      setProjects(remaining);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
