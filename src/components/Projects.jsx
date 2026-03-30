import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import './Projects.css';

const extractLiveUrl = (text) => {
  if (!text) return null;
  
  // 1. Try markdown links like [Live Site](https://url) or [Live Demo](https://url)
  const mdLinkMatch = text.match(/\[[^\]]*(?:Live|Demo|Website|App|Site)[^\]]*\]\((https?:\/\/[^\s\)]+)\)/i);
  if (mdLinkMatch && !mdLinkMatch[1].includes('github.com')) {
    return mdLinkMatch[1];
  }

  // 2. Try plain text like "Live: https://url" or "Live URL: https://url"
  const textMatch = text.match(/(?:Live(?: URL)?|Demo|Website|App):\s*(https?:\/\/[^\s\)]+)/i);
  if (textMatch && !textMatch[1].includes('github.com')) {
    return textMatch[1];
  }

  // 3. Fallback to common hosting domains
  const generalMatch = text.match(/https?:\/\/[a-zA-Z0-9.\-_]+\.(vercel\.app|netlify\.app|onrender\.com|herokuapp\.com|base44\.app|surge\.sh|github\.io)[^\s\)]*/i);
  if (generalMatch) {
    return generalMatch[0];
  }

  return null;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  // Hardcoded project for Mediconsult AI
  const mediconsultProject = {
    title: 'Mediconsult AI',
    period: 'Recent',
    category: 'Backend & AI',
    description: "This project analyzes doctor prescriptions and medical reports, then sends the extracted details to the user's email. It also locates nearby hospitals based on the user's location and includes emergency contact features.",
    tech: ['AI', 'Backend', 'Email Integration'],
    links: { live: 'https://mediconsult-ai.base44.app/' }
  };

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/chaitanyareddy-fullstackdeveloper/repos?sort=updated&per_page=10');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        // Manual Live URL overrides based on repository name
        const manualLiveUrls = {
          'farmgo': 'https://lovable.dev/projects/0b7d65ac-e550-4420-aefe-f5110ea1dc90',
          'FreeLanceProjects': 'https://lovable.dev/projects/6b0b739e-4d25-47c6-a4d2-ae819a4544ab',
          'AiStudyAssitant': 'https://lnkd.in/dpbYM-uM'
        };

        // Filter out forks and map to our consistent project structure
        const mappedProjects = data
          .filter(repo => !repo.fork)
          .map(repo => {
            const lang = (repo.language || '').toLowerCase();
            const desc = (repo.description || '').toLowerCase();
            
            // Determine category based on language and content
            let category = 'Other';
            if (['javascript', 'typescript', 'html', 'css'].includes(lang) || desc.includes('frontend') || desc.includes('react')) {
              category = 'Frontend';
            } else if (['python', 'java', 'c++'].includes(lang) || desc.includes('ai') || desc.includes('backend')) {
              category = 'Backend & AI';
            }
            
            // Format date
            const dateStr = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            
            return {
              id: repo.id,
              title: repo.name.replace(/[-_]/g, ' '),
              period: `Updated ${dateStr}`,
              category,
              description: repo.description || 'A comprehensive project exploring software development workflows.',
              tech: [repo.language, ...(repo.topics || [])].filter(Boolean),
              links: {
                github: repo.html_url,
                live: manualLiveUrls[repo.name] || repo.homepage || null
              },
              owner: repo.owner.login,
              name: repo.name,
              branch: repo.default_branch
            };
          });

        // Fetch READMEs for live links if not present in homepage or manual overrides
        await Promise.all(mappedProjects.map(async (proj) => {
          if (!proj.links.live) {
            try {
              const res = await fetch(`https://raw.githubusercontent.com/${proj.owner}/${proj.name}/${proj.branch}/README.md`);
              if (res.ok) {
                const text = await res.text();
                const liveUrl = extractLiveUrl(text);
                if (liveUrl) {
                  proj.links.live = liveUrl;
                }
              }
            } catch (e) {
              console.warn(`Failed to fetch README for ${proj.name}`, e);
            }
          }
        }));

        setProjects([...mappedProjects, mediconsultProject]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Unable to load projects from GitHub at this time.');
        setProjects([mediconsultProject]);
        setLoading(false);
      }
    };

    fetchGithubProjects();
  }, []);

  const categories = ['All', 'Frontend', 'Backend & AI', 'Design/UX'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-display mb-8">Featured <span className="text-gradient">Projects</span></h2>
        </motion.div>

        {/* Filters */}
        {!loading && !error && (
          <motion.div 
            className="filters flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        <div className="projects-grid">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3].map((i) => (
              <div key={i} className="project-skeleton glass-card p-6 flex flex-col gap-4">
                <div className="skeleton-icon pulse h-6 w-6 rounded"></div>
                <div className="skeleton-title pulse h-6 w-3/4 rounded"></div>
                <div className="skeleton-badge pulse h-4 w-1/4 rounded"></div>
                <div className="skeleton-text pulse flex-1 mt-4 rounded"></div>
              </div>
            ))
          ) : error && projects.length === 1 ? (
            // Show just fallback if errored
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))
          ) : (
            // Actual Filtered Projects
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id || index} project={project} index={index} />
              ))}
              {filteredProjects.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-12 text-secondary"
                >
                  No projects found for this category.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        
        {error && (
          <div className="text-center mt-8 text-accent-secondary">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

// Reusable Project Card Component
const ProjectCard = ({ project, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4 }}
    className="project-card glass-card flex flex-col"
  >
    <div className="project-header p-6 pb-0 flex justify-between items-start">
      <div className="project-icon flex items-center justify-center">
        {project.links?.github ? (
          <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub Repository" className="hover:text-primary transition-colors text-secondary cursor-pointer">
            <FolderGit2 size={24} />
          </a>
        ) : (
           <FolderGit2 size={24} className="text-secondary" />
        )}
      </div>
      <div className="project-links flex gap-3 ml-auto">
        {project.links?.live ? (
          <a href={project.links.live} target="_blank" rel="noreferrer" aria-label="Live Demo" className="hover:text-primary transition-colors text-secondary flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <ExternalLink size={16} /> Live Demo
          </a>
        ) : (
          <span className="text-secondary/50 flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/5 cursor-not-allowed">
            No Demo
          </span>
        )}
      </div>
    </div>

    <div className="project-body p-6 flex-1 flex flex-col">
      <h3 className="text-2xl font-bold mb-2 capitalize">{project.title}</h3>
      <span className="text-xs font-medium text-accent inline-block mb-4 px-3 py-1 bg-accent/10 rounded-full w-fit">
        {project.period} • {project.category}
      </span>
      <p className="text-secondary flex-1 mb-6 line-clamp-4">
        {project.description}
      </p>
      
      <div className="project-tech flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default Projects;
