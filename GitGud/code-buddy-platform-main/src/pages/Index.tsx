
import { useState } from 'react';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { ProjectSubmissionForm } from '@/components/ProjectSubmissionForm';
import { ProjectDetail } from '@/components/ProjectDetail';
import { Header } from '@/components/Header';
import { Project } from '@/types/project';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'submit' | 'detail'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Weather App React',
      description: 'A responsive weather application built with React and OpenWeather API',
      author: 'Alex Johnson',
      submittedAt: new Date('2024-06-01'),
      status: 'under-review',
      codeUrl: 'https://github.com/example/weather-app',
      tags: ['React', 'API', 'CSS'],
      comments: []
    },
    {
      id: '2',
      title: 'E-commerce Backend',
      description: 'Node.js backend with Express and MongoDB for an e-commerce platform',
      author: 'Sarah Chen',
      submittedAt: new Date('2024-06-03'),
      status: 'approved',
      codeUrl: 'https://github.com/example/ecommerce-backend',
      tags: ['Node.js', 'Express', 'MongoDB'],
      comments: []
    }
  ]);

  const handleSubmitProject = (project: Omit<Project, 'id' | 'submittedAt' | 'comments'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      submittedAt: new Date(),
      comments: []
    };
    setProjects([newProject, ...projects]);
    setCurrentView('dashboard');
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('detail');
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onGoBack={() => setCurrentView('dashboard')}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <ProjectDashboard 
            projects={projects} 
            onViewProject={handleViewProject}
          />
        )}
        
        {currentView === 'submit' && (
          <ProjectSubmissionForm onSubmit={handleSubmitProject} />
        )}
        
        {currentView === 'detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject}
            onUpdate={handleUpdateProject}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
