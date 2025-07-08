import React from 'react';
import { Calendar, Clock, Users, BookOpen, AlertCircle } from 'lucide-react';

const todaySchedule = [
  {
    time: '07:30 - 08:20',
    class: '7º Ano A',
    subject: 'Matemática',
    room: 'Sala 101'
  },
  {
    time: '08:20 - 09:10',
    class: '8º Ano B',
    subject: 'Matemática',
    room: 'Sala 102'
  },
  {
    time: '09:30 - 10:20',
    class: '7º Ano A',
    subject: 'Física',
    room: 'Lab. Ciências'
  },
  {
    time: '10:20 - 11:10',
    class: '9º Ano C',
    subject: 'Física',
    room: 'Lab. Ciências'
  }
];

const weeklyStats = [
  {
    label: 'Aulas esta semana',
    value: '24',
    icon: Clock,
    color: 'blue'
  },
  {
    label: 'Turmas atendidas',
    value: '8',
    icon: Users,
    color: 'green'
  },
  {
    label: 'Disciplinas',
    value: '2',
    icon: BookOpen,
    color: 'purple'
  }
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, Professor João!</h2>
        <p className="text-primary-100">
          Hoje você tem 4 aulas programadas. Tenha um ótimo dia letivo!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weeklyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Horário de Hoje</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {todaySchedule.map((lesson, index) => (
              <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-20 text-sm font-medium text-gray-600">
                  {lesson.time}
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{lesson.subject}</p>
                      <p className="text-sm text-gray-600">{lesson.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{lesson.room}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Ver Horário Completo</span>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Definir Disponibilidade</span>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Minhas Turmas</span>
                </div>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Avisos</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Alteração de Horário
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Aula de 5ª feira foi transferida para a sala 205
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Reunião Pedagógica
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Sexta-feira às 14h na sala dos professores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}