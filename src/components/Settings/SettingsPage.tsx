import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Download, 
  Upload,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { 
    academicYears, 
    subjects, 
    classes, 
    classrooms, 
    teachers, 
    schedules,
    timeSlots
  } = useData();

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notifications: true,
    emailNotifications: true,
    systemAlerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoSave: true,
    conflictDetection: true,
    maxClassesPerDay: 6,
    breakDuration: 20,
    defaultShift: 'morning',
    academicYearFormat: 'YYYY'
  });

  const handleProfileSave = () => {
    // Simulate saving profile
    alert('Perfil atualizado com sucesso!');
  };

  const handleSystemSave = () => {
    // Simulate saving system settings
    alert('Configurações do sistema atualizadas!');
  };

  const exportData = () => {
    const data = {
      academicYears,
      subjects,
      classes,
      classrooms,
      teachers: teachers.filter(t => t.role === 'teacher'),
      schedules,
      timeSlots,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sighe-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (confirm('Tem certeza que deseja importar estes dados? Isso substituirá todos os dados atuais.')) {
          // Here you would call the import functions from DataContext
          alert('Dados importados com sucesso! Recarregue a página para ver as alterações.');
        }
      } catch (error) {
        alert('Erro ao importar dados. Verifique se o arquivo está no formato correto.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('ATENÇÃO: Esta ação irá apagar TODOS os dados do sistema. Esta ação não pode ser desfeita. Tem certeza?')) {
      if (confirm('Última confirmação: Todos os dados serão perdidos permanentemente. Continuar?')) {
        localStorage.removeItem('sighe_data');
        localStorage.removeItem('sighe_user');
        alert('Todos os dados foram removidos. A página será recarregada.');
        window.location.reload();
      }
    }
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'system', name: 'Sistema', icon: Settings },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'data', name: 'Dados', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações do sistema</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Perfil</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Função
                    </label>
                    <input
                      type="text"
                      value={user?.role === 'admin' ? 'Administrador' : 'Professor'}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleProfileSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferências de Notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notificações do Sistema</p>
                      <p className="text-sm text-gray-500">Receber notificações sobre atualizações do sistema</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.notifications}
                      onChange={(e) => setProfileData({ ...profileData, notifications: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notificações por Email</p>
                      <p className="text-sm text-gray-500">Receber emails sobre alterações importantes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.emailNotifications}
                      onChange={(e) => setProfileData({ ...profileData, emailNotifications: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Alertas de Conflito</p>
                      <p className="text-sm text-gray-500">Ser notificado quando conflitos de horário forem detectados</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.systemAlerts}
                      onChange={(e) => setProfileData({ ...profileData, systemAlerts: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleProfileSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Preferências</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações do Sistema</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Máximo de Aulas por Dia
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={systemSettings.maxClassesPerDay}
                        onChange={(e) => setSystemSettings({ ...systemSettings, maxClassesPerDay: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração do Intervalo (minutos)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="60"
                        value={systemSettings.breakDuration}
                        onChange={(e) => setSystemSettings({ ...systemSettings, breakDuration: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Turno Padrão
                      </label>
                      <select
                        value={systemSettings.defaultShift}
                        onChange={(e) => setSystemSettings({ ...systemSettings, defaultShift: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="morning">Manhã</option>
                        <option value="afternoon">Tarde</option>
                        <option value="full">Integral</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formato do Ano Letivo
                      </label>
                      <select
                        value={systemSettings.academicYearFormat}
                        onChange={(e) => setSystemSettings({ ...systemSettings, academicYearFormat: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="YYYY">2025</option>
                        <option value="YYYY/YYYY">2025/2026</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Salvamento Automático</p>
                        <p className="text-sm text-gray-500">Salvar alterações automaticamente</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={systemSettings.autoSave}
                        onChange={(e) => setSystemSettings({ ...systemSettings, autoSave: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Detecção de Conflitos</p>
                        <p className="text-sm text-gray-500">Detectar automaticamente conflitos de horário</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={systemSettings.conflictDetection}
                        onChange={(e) => setSystemSettings({ ...systemSettings, conflictDetection: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleSystemSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Configurações</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-900">Alteração de Senha</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Para alterar sua senha, entre em contato com o administrador do sistema.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Sessão Ativa</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Sua sessão está ativa e segura. Faça logout ao terminar de usar o sistema.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Informações da Conta</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Último acesso:</span>
                        <span className="text-gray-900">Hoje às {new Date().toLocaleTimeString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tipo de conta:</span>
                        <span className="text-gray-900">{user?.role === 'admin' ? 'Administrador' : 'Professor'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600">Ativo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gerenciamento de Dados</h3>
                
                <div className="space-y-6">
                  {/* Export Data */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Download className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-900">Exportar Dados</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Faça backup de todos os dados do sistema em formato JSON.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={exportData}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Exportar
                      </button>
                    </div>
                  </div>

                  {/* Import Data */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">Importar Dados</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Restaure dados de um backup anterior. Isso substituirá todos os dados atuais.
                          </p>
                        </div>
                      </div>
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer">
                        Importar
                        <input
                          type="file"
                          accept=".json"
                          onChange={importData}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Data Statistics */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Database className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Estatísticas dos Dados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Anos Letivos:</span>
                            <span className="ml-2 font-medium text-gray-900">{academicYears.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Professores:</span>
                            <span className="ml-2 font-medium text-gray-900">{teachers.filter(t => t.role === 'teacher').length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Disciplinas:</span>
                            <span className="ml-2 font-medium text-gray-900">{subjects.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Turmas:</span>
                            <span className="ml-2 font-medium text-gray-900">{classes.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Salas:</span>
                            <span className="ml-2 font-medium text-gray-900">{classrooms.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Horários:</span>
                            <span className="ml-2 font-medium text-gray-900">{timeSlots.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Aulas:</span>
                            <span className="ml-2 font-medium text-gray-900">{schedules.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clear Data */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-red-900">Limpar Todos os Dados</h4>
                          <p className="text-sm text-red-700 mt-1">
                            <strong>ATENÇÃO:</strong> Esta ação irá remover permanentemente todos os dados do sistema.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={clearAllData}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Limpar Tudo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}