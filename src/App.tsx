import { useState } from 'react';
import { Home, Workflow, BookOpen, Presentation, Send, Inbox, Settings } from 'lucide-react';
import { ReactFlowProvider } from 'reactflow';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import ToastProvider from './components/ToastProvider';
import HomePage from './components/pages/HomePage';
import WorkflowsPage from './components/pages/WorkflowsPage';
import KnowledgeBasePage from './components/pages/KnowledgeBasePage';
import InterfacesPage from './components/pages/InterfacesPage';
import PublishingPage from './components/pages/PublishingPage';
import InboxPage from './components/pages/InboxPage';
import SettingsPage from './components/pages/SettingsPage';

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children?: { id: string; label: string; path: string }[];
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: 'home' },
  { id: 'workflows', label: 'Workflows', icon: Workflow, path: 'workflows' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, path: 'knowledge' },
  { id: 'interfaces', label: 'Interfaces', icon: Presentation, path: 'interfaces' },
  { id: 'publishing', label: 'Publishing', icon: Send, path: 'publishing' },
  { id: 'inbox', label: 'Inbox', icon: Inbox, path: 'inbox' },
  { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState(['Home']);

  const handleNavigate = (path: string, label: string) => {
    setCurrentPage(path);
    const parts = label.split(' > ');
    setBreadcrumbs(parts);
  };

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage />;
    if (currentPage === 'workflows') return (
      <ReactFlowProvider>
        <WorkflowsPage />
      </ReactFlowProvider>
    );
    if (currentPage === 'knowledge') return <KnowledgeBasePage />;
    if (currentPage.startsWith('interfaces')) return <InterfacesPage initialTab={currentPage.split('/')[1] || 'playground'} />;
    if (currentPage === 'publishing') return <PublishingPage />;
    if (currentPage === 'inbox') return <InboxPage />;
    if (currentPage === 'settings') return <SettingsPage />;
    return <HomePage />;
  };

  const isWorkflowsPage = currentPage === 'workflows';

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {isWorkflowsPage ? (
        // Fullscreen workflow page with collapsed sidebar overlay
        <div className="h-screen w-screen flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 z-50">
            <Sidebar 
              items={navigationItems}
              currentPage={currentPage}
              onNavigate={handleNavigate}
              isCollapsed={true}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>
          <div className="flex-1 h-full">
            {renderPage()}
          </div>
        </div>
      ) : (
        // Regular layout with sidebar and navbar
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            items={navigationItems}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavbar breadcrumbs={breadcrumbs} />
            
            <main className="flex-1 overflow-auto p-6">
              {renderPage()}
            </main>
          </div>
        </div>
      )}
      
      <ToastProvider />
    </div>
  );
}
