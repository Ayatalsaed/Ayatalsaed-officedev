import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type ViewMode = 'daily' | 'monthly' | 'yearly';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Goal {
  id: string;
  text: string;
  progress: number;
}

interface MonthlyEvent {
  id: string;
  text: string;
  date: string;
}

const TaskManager: React.FC = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('daily');

  // Daily State
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Monthly State (Calendar)
  const [monthlyEvents, setMonthlyEvents] = useState<MonthlyEvent[]>([]);
  const [newEvent, setNewEvent] = useState('');
  const [viewDate, setViewDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  // Yearly State
  const [annualGoals, setAnnualGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const formatDateKey = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    if (language === 'ar') {
      setDailyTasks([
        { id: '1', text: 'مراجعة الخطة التسويقية', completed: true },
        { id: '2', text: 'الاتصال بالمستثمر المحتمل', completed: false },
        { id: '3', text: 'تحديث محتوى الموقع', completed: false },
      ]);
      setMonthlyEvents([
        { id: '1', text: 'إطلاق المشروع', date: formatDateKey(today) },
        { id: '2', text: 'اجتماع الفريق', date: formatDateKey(tomorrow) },
        { id: '3', text: 'مراجعة العميل', date: formatDateKey(nextWeek) },
      ]);
      setAnnualGoals([
        { id: '1', text: 'التوسع في سوق دبي', progress: 35 },
        { id: '2', text: 'الوصول لـ 10,000 مستخدم نشط', progress: 60 },
        { id: '3', text: 'إطلاق تطبيق الجوال', progress: 15 },
      ]);
    } else if (language === 'es') {
       setDailyTasks([
        { id: '1', text: 'Revisar plan de marketing', completed: true },
        { id: '2', text: 'Llamar a inversor potencial', completed: false },
        { id: '3', text: 'Actualizar contenido web', completed: false },
      ]);
      setMonthlyEvents([
        { id: '1', text: 'Lanzamiento del proyecto', date: formatDateKey(today) },
        { id: '2', text: 'Reunión de equipo', date: formatDateKey(tomorrow) },
        { id: '3', text: 'Revisión del cliente', date: formatDateKey(nextWeek) },
      ]);
      setAnnualGoals([
        { id: '1', text: 'Expansión al mercado de Dubai', progress: 35 },
        { id: '2', text: 'Alcanzar 10,000 usuarios activos', progress: 60 },
        { id: '3', text: 'Lanzar aplicación móvil', progress: 15 },
      ]);
    } else {
      // Default English
      setDailyTasks([
        { id: '1', text: 'Review marketing plan', completed: true },
        { id: '2', text: 'Call potential investor', completed: false },
        { id: '3', text: 'Update website content', completed: false },
      ]);
      setMonthlyEvents([
        { id: '1', text: 'Project Launch', date: formatDateKey(today) },
        { id: '2', text: 'Team Meeting', date: formatDateKey(tomorrow) },
        { id: '3', text: 'Client Review', date: formatDateKey(nextWeek) },
      ]);
      setAnnualGoals([
        { id: '1', text: 'Expand to Dubai Market', progress: 35 },
        { id: '2', text: 'Reach 10,000 Active Users', progress: 60 },
        { id: '3', text: 'Launch Mobile App', progress: 15 },
      ]);
    }
  }, [language]);

  // --- Handlers ---
  const addDailyTask = () => {
    if (!newTask.trim()) return;
    setDailyTasks([...dailyTasks, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setDailyTasks(dailyTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setDailyTasks(dailyTasks.filter(t => t.id !== id));
  };

  // Calendar Handlers
  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const addMonthlyEvent = () => {
    if (!newEvent.trim()) return;
    setMonthlyEvents([...monthlyEvents, { id: Date.now().toString(), text: newEvent, date: formatDateKey(selectedDate) }]);
    setNewEvent('');
  };

  const deleteEvent = (id: string) => {
    setMonthlyEvents(monthlyEvents.filter(e => e.id !== id));
  };

  const addAnnualGoal = () => {
    if (!newGoal.trim()) return;
    setAnnualGoals([...annualGoals, { id: Date.now().toString(), text: newGoal, progress: 0 }]);
    setNewGoal('');
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setAnnualGoals(annualGoals.map(g => g.id === id ? { ...g, progress } : g));
  };

  const deleteGoal = (id: string) => {
    setAnnualGoals(annualGoals.filter(g => g.id !== id));
  };

  // --- Calendar Logic ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const padding = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    
    return [...padding, ...days];
  };

  const calendarDays = getDaysInMonth(viewDate);
  const selectedDateKey = formatDateKey(selectedDate);
  const eventsForSelectedDay = monthlyEvents.filter(e => e.date === selectedDateKey);
  const dailyProgress = dailyTasks.length > 0 
    ? Math.round((dailyTasks.filter(t => t.completed).length / dailyTasks.length) * 100) 
    : 0;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const limit = new Date(today);
    limit.setDate(today.getDate() + 7);

    return monthlyEvents.filter(event => {
      const [y, m, d] = event.date.split('-').map(Number);
      const eventDate = new Date(y, m - 1, d);
      return eventDate >= today && eventDate <= limit;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [monthlyEvents]);

  const getRelativeTime = (dateStr: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const [y, m, d] = dateStr.split('-').map(Number);
    const eventDate = new Date(y, m - 1, d);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('today');
    if (diffDays === 1) return t('tomorrow');
    return t('dueIn', { days: diffDays.toString() });
  };

  return (
    <div className="h-full min-h-[600px] bg-white rounded-[32px] shadow-card border border-slate-100 overflow-hidden flex flex-col animate-fade-in">
      
      {/* Header */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/10">
            ✅
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-primary font-heading">{t('taskManager')}</h2>
            <p className="text-sm text-text-sub">{t('taskManagerDesc')}</p>
          </div>
        </div>

        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
          {(['daily', 'monthly', 'yearly'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === mode 
                  ? 'bg-white text-brand-primary shadow-sm border border-slate-100' 
                  : 'text-text-sub hover:text-brand-primary'
              }`}
            >
              {t(mode === 'daily' ? 'dailyTasks' : mode === 'monthly' ? 'monthlyPlan' : 'annualGoals')}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-offWhite">
        
        {/* --- DAILY VIEW --- */}
        {viewMode === 'daily' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-brand-primary">{t('myDay')}</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-text-sub bg-white px-4 py-2 rounded-full border border-slate-200">
                   <span>{new Date().toLocaleDateString()}</span>
                </div>
             </div>

             {/* Progress */}
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between mb-3 text-sm font-bold">
                   <span className="text-brand-primary">{t('completed')}</span>
                   <span className="text-emerald-500">{dailyProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                   <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm" style={{ width: `${dailyProgress}%` }}></div>
                </div>
             </div>

             {/* Input */}
             <div className="flex gap-3">
                <input 
                  type="text" 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDailyTask()}
                  placeholder={t('addTaskPlaceholder')}
                  className="flex-1 px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-brand-primary shadow-sm transition-all"
                />
                <button 
                  onClick={addDailyTask}
                  className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                >
                  +
                </button>
             </div>

             {/* List */}
             <div className="space-y-3">
                {dailyTasks.map(task => (
                   <div 
                     key={task.id} 
                     className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                       task.completed 
                         ? 'bg-slate-50 border-slate-100 opacity-60' 
                         : 'bg-white border-slate-200 shadow-sm hover:border-emerald-200'
                     }`}
                   >
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                           task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-500'
                        }`}
                      >
                         {task.completed && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <span className={`flex-1 font-bold text-lg ${task.completed ? 'line-through text-slate-400' : 'text-brand-primary'}`}>
                         {task.text}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-full hover:bg-red-50"
                      >
                         ✕
                      </button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* --- MONTHLY VIEW --- */}
        {viewMode === 'monthly' && (
           <div className="space-y-8 animate-scale-in max-w-6xl mx-auto">
              
              {upcomingEvents.length > 0 && (
                 <div className="mb-8 bg-orange-50 border border-orange-100 rounded-2xl p-6 shadow-sm animate-slide-up">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-white rounded-xl text-orange-500 text-xl shadow-sm">
                          🔔
                       </div>
                       <h3 className="font-bold text-brand-primary">{t('upcomingReminders')}</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                       {upcomingEvents.map(event => (
                          <div key={event.id} className="bg-white p-4 rounded-xl border border-orange-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                             <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></div>
                                <span className="font-bold text-slate-700 truncate text-sm">{event.text}</span>
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-2 py-1 rounded-lg whitespace-nowrap ml-2 border border-slate-100">
                                {getRelativeTime(event.date)}
                             </span>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              <div className="flex flex-col lg:flex-row gap-8">
                  {/* Calendar Grid */}
                  <div className="flex-1 bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <button onClick={() => changeMonth(-1)} className="p-3 hover:bg-slate-50 rounded-full transition-colors border border-slate-100">◀</button>
                        <h2 className="text-2xl font-bold text-brand-primary font-heading">
                            {viewDate.toLocaleDateString(language, { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={() => changeMonth(1)} className="p-3 hover:bg-slate-50 rounded-full transition-colors border border-slate-100">▶</button>
                      </div>

                      <div className="grid grid-cols-7 gap-2 text-center mb-4">
                          {weekDays.map(d => (
                            <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {d}
                            </div>
                          ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                          {calendarDays.map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;
                            const dateKey = formatDateKey(date);
                            const isSelected = dateKey === selectedDateKey;
                            const isToday = dateKey === formatDateKey(new Date());
                            const hasEvents = monthlyEvents.some(e => e.date === dateKey);

                            return (
                                <button
                                  key={dateKey}
                                  onClick={() => setSelectedDate(date)}
                                  className={`aspect-square rounded-2xl relative flex flex-col items-center justify-center transition-all duration-200 ${
                                      isSelected 
                                        ? 'bg-brand-primary text-white shadow-lg shadow-blue-900/20 scale-105 z-10' 
                                        : 'bg-slate-50 text-slate-600 hover:bg-blue-50'
                                  } ${isToday && !isSelected ? 'ring-2 ring-blue-200 bg-white' : ''}`}
                                >
                                  <span className={`text-lg font-bold`}>{date.getDate()}</span>
                                  {hasEvents && (
                                      <span className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></span>
                                  )}
                                </button>
                            );
                          })}
                      </div>
                  </div>

                  {/* Side Panel: Events */}
                  <div className="w-full lg:w-96 bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm h-fit">
                      <h3 className="text-lg font-bold text-brand-primary mb-6 flex items-center gap-2">
                          <span className="text-blue-500">📅</span> {selectedDate.toLocaleDateString(language, { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      
                      <div className="flex gap-2 mb-6">
                        <input 
                            type="text" 
                            value={newEvent}
                            onChange={(e) => setNewEvent(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addMonthlyEvent()}
                            placeholder={t('addEventPlaceholder')}
                            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium"
                        />
                        <button 
                          onClick={addMonthlyEvent}
                          className="px-4 py-3 bg-brand-primary hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all"
                        >
                          +
                        </button>
                      </div>

                      <div className="space-y-3">
                          {eventsForSelectedDay.length === 0 && (
                            <div className="text-center py-10 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
                                {t('noEvents')}
                            </div>
                          )}
                          {eventsForSelectedDay.map(event => (
                            <div key={event.id} className="group flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="font-bold text-brand-primary text-sm">{event.text}</p>
                                <button 
                                  onClick={() => deleteEvent(event.id)}
                                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                >
                                  ✕
                                </button>
                            </div>
                          ))}
                      </div>
                  </div>
              </div>
           </div>
        )}

        {/* --- YEARLY VIEW --- */}
        {viewMode === 'yearly' && (
           <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <h2 className="text-4xl font-bold mb-2 relative z-10 font-heading">{new Date().getFullYear()} {t('annualGoals')}</h2>
                 <p className="text-blue-100 relative z-10 text-lg">Visualize your success and track your milestones.</p>
              </div>

              <div className="flex gap-3">
                   <input 
                      type="text" 
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addAnnualGoal()}
                      placeholder={t('addGoalPlaceholder')}
                      className="flex-1 px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-brand-primary shadow-sm transition-all"
                   />
                   <button 
                     onClick={addAnnualGoal}
                     className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                   >
                     {t('addGoal')}
                   </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {annualGoals.map(goal => (
                    <div key={goal.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all">
                       <div className="flex justify-between items-start mb-6">
                          <h3 className="text-xl font-bold text-brand-primary">{goal.text}</h3>
                          <button onClick={() => deleteGoal(goal.id)} className="text-slate-400 hover:text-red-500 transition-colors">✕</button>
                       </div>
                       
                       <div className="space-y-3">
                          <div className="flex justify-between text-sm font-bold">
                             <span className="text-slate-500">{t('goalProgress')}</span>
                             <span className="text-blue-600">{goal.progress}%</span>
                          </div>
                          <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden cursor-pointer relative group">
                             <div 
                               className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 relative shadow-sm" 
                               style={{ width: `${goal.progress}%` }}
                             ></div>
                             <input 
                                type="range" 
                                min="0" max="100" 
                                value={goal.progress} 
                                onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
                             />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default TaskManager;