// src/app/dashboard/page.tsx
import { useState } from 'react';
import { StorageOverview } from "./components/storage-overview";
import { FileList } from "./components/file-list";
import { ProjectsSection } from "./components/projects";
import { BackupSection } from "./components/backup";
import { UserManagement } from "./components/user-management";
import { NotificationsPanel } from "./components/notifications";
import { MobileHeader } from "./components/mobile-header";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'grid'>('list');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface-primary">
      <MobileHeader 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
      />

      {/* Sidebar (Responsivo) */}
      <aside className={`fixed md:relative md:block w-64 border-r border-border p-4 bg-surface-primary z-50 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <AccountSwitcher />
        <nav className="space-y-2 mt-4">
          <NavLink href="#files">
            <FolderIcon className="h-5 w-5" />
            Arquivos
          </NavLink>
          <NavLink href="#backups">
            <CloudIcon className="h-5 w-5" />
            Backups
          </NavLink>
          <NavLink href="#projects">
            <UsersIcon className="h-5 w-5" />
            Projetos
          </NavLink>
          <NavLink href="#team">
            <PieChartIcon className="h-5 w-5" />
            Estatísticas
          </NavLink>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto p-4 md:p-8 relative">
        {/* Header com Controles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <ViewToggle activeView={activeView} onChange={setActiveView} />
            <FileTypeFilter 
              selected={selectedFileType} 
              onChange={setSelectedFileType} 
            />
          </div>
          <StorageChart />
        </div>

        <StorageOverview used={75} total={100} />
        
        <FileList viewMode={activeView} filter={selectedFileType} />
        
        <BackupSection className="mt-8" />
        
        <ProjectsSection className="mt-8" />
        
        <UserManagement className="mt-8" />

        <NotificationsPanel 
          isOpen={notificationsOpen} 
          onClose={() => setNotificationsOpen(false)}
        />
      </main>
    </div>
  );
}

// Componente de Toggle de Visualização
function ViewToggle({ activeView, onChange }: { 
  activeView: 'list' | 'grid'; 
  onChange: (view: 'list' | 'grid') => void 
}) {
  return (
    <div className="flex rounded-lg bg-surface-secondary p-1">
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded-md ${activeView === 'list' ? 'bg-accent-500 text-textOnAccent-primary' : 'text-text-secondary'}`}
      >
        <ListIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded-md ${activeView === 'grid' ? 'bg-accent-500 text-textOnAccent-primary' : 'text-text-secondary'}`}
      >
        <GridIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

// Componente de Filtro por Tipo
function FileTypeFilter({ selected, onChange }: { 
  selected: string; 
  onChange: (type: string) => void 
}) {
  const types = ['all', 'image', 'doc', 'video', 'other'];

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-surface-secondary rounded-lg pl-3 pr-8 py-2 text-text-primary border border-border focus:outline-none focus:ring-2 focus:ring-accent-500"
      >
        {types.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type === 'all' ? 'Todos' : type}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="h-4 w-4 absolute right-3 top-3 text-text-secondary pointer-events-none" />
    </div>
  );
}

// Componente de Gráfico Detalhado
function StorageChart() {
  return (
    <div className="w-full md:w-64 h-64 p-4 rounded-xl bg-surface-secondary border border-border">
      <h3 className="text-text-primary font-medium mb-2">Distribuição</h3>
      {/* Implementar gráfico com react-chartjs-2 ou similar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-accent-500 rounded-full" />
          <span className="text-sm text-text-secondary">Documentos (45%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-accent-600 rounded-full" />
          <span className="text-sm text-text-secondary">Imagens (30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-accent-700 rounded-full" />
          <span className="text-sm text-text-secondary">Outros (25%)</span>
        </div>
      </div>
    </div>
  );
}

// Componente de Notificações
export function NotificationsPanel({ isOpen, onClose }: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  return (
    <div className={`fixed top-16 right-4 w-80 bg-surface-primary border border-border rounded-xl shadow-lg p-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-text-primary">Notificações</h3>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-3">
        <NotificationItem 
          type="share"
          message="Novo arquivo compartilhado com você"
          date="2h atrás"
        />
        <NotificationItem 
          type="backup"
          message="Backup automático concluído"
          date="5h atrás"
        />
      </div>
    </div>
  );
}

function NotificationItem({ type, message, date }: { 
  type: string; 
  message: string; 
  date: string 
}) {
  const icons = {
    share: <ShareIcon className="h-5 w-5 text-accent-500" />,
    backup: <CloudIcon className="h-5 w-5 text-accent-500" />,
    alert: <AlertIcon className="h-5 w-5 text-error" />
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary">
      <div className="mt-1">{icons[type as keyof typeof icons] || icons.alert}</div>
      <div>
        <p className="text-text-primary text-sm">{message}</p>
        <p className="text-text-tertiary text-xs mt-1">{date}</p>
      </div>
    </div>
  );
}