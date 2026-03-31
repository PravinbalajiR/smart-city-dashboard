import React, { useState, useEffect } from 'react';
import { Activity, Zap, Wind, Car, Users, AlertCircle, Droplets, ThermometerSun, MapPin, Bus, Wifi, Camera, TrendingUp, TrendingDown, Search, Filter, X, Bell, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import CityMap from '../../components/Map/CityMap';

export default function UserDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [liveData, setLiveData] = useState({
    energyUsage: 1.2,
    airQuality: 51,
    trafficFlow: 67
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        energyUsage: Number((prev.energyUsage + (Math.random() - 0.5) * 0.1).toFixed(2)),
        airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 2)),
        trafficFlow: Math.max(0, Math.min(100, prev.trafficFlow + (Math.random() - 0.5) * 5))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, label: 'City Population', value: '2.5M', change: '+2.3%', trend: 'up', color: 'bg-blue-500', percentage: 85 },
    { icon: Zap, label: 'Energy Demand', value: `${liveData.energyUsage} GW`, change: '-5.1%', trend: 'down', color: 'bg-yellow-500', percentage: 72 },
    { icon: Wind, label: 'Air Quality Index', value: 'Good', change: `AQI ${Math.round(liveData.airQuality)}`, trend: 'up', color: 'bg-emerald-500', percentage: Math.round(liveData.airQuality) },
    { icon: Car, label: 'Traffic Density', value: 'Moderate', change: `${Math.round(liveData.trafficFlow)}%`, trend: 'down', color: 'bg-orange-500', percentage: Math.round(liveData.trafficFlow) },
  ];

  const trafficZones = [
    { zone: 'Downtown', status: 'Heavy', vehicles: 1250, color: 'bg-red-500', cameras: 24, incidents: 3, avgSpeed: '15 km/h' },
    { zone: 'North District', status: 'Moderate', vehicles: 780, color: 'bg-yellow-500', cameras: 18, incidents: 1, avgSpeed: '35 km/h' },
    { zone: 'East Side', status: 'Light', vehicles: 340, color: 'bg-green-500', cameras: 12, incidents: 0, avgSpeed: '50 km/h' },
    { zone: 'West End', status: 'Moderate', vehicles: 890, color: 'bg-yellow-500', cameras: 15, incidents: 2, avgSpeed: '32 km/h' },
  ];

  const utilities = [
    { name: 'Water Supply', usage: 75, progress: 75, unit: 'ML/day', icon: Droplets, color: 'bg-blue-400', trend: 'down', change: '-3%' },
    { name: 'Grid Electricity', usage: 82, progress: 82, unit: 'GWh', icon: Zap, color: 'bg-yellow-400', trend: 'up', change: '+2%' },
    { name: 'Local Temp', usage: 24, progress: 60, unit: '°C', icon: ThermometerSun, color: 'bg-orange-400', trend: 'up', change: '+1°C' },
  ];

  const transport = [
    { type: 'Buses', active: 145, capacity: 78, icon: Bus, color: 'bg-blue-500' },
    { type: 'Metro Trains', active: 32, capacity: 92, icon: Activity, color: 'bg-purple-500' },
    { type: 'Public Bikes', active: 890, capacity: 45, icon: Activity, color: 'bg-emerald-500' },
  ];

  const services = [
    { name: 'WiFi Zones', count: 342, status: 'Active', icon: Wifi, color: 'bg-cyan-500' },
    { name: 'CCTV Network', count: 127, status: 'Online', icon: Camera, color: 'bg-rose-500' },
    { name: 'Parking Slots', count: 1240, status: '68% Free', icon: MapPin, color: 'bg-indigo-500' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Heavy rain expected in East Side (8-10 PM)', time: '5 min ago', priority: 'high' },
    { id: 2, type: 'info', message: 'New bike lanes opening on 5th Avenue', time: '1 hour ago', priority: 'low' },
    { id: 3, type: 'warning', message: 'Traffic diversion on Main St for marathon', time: '2 hours ago', priority: 'medium' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-500 font-sans`}>
      
      {/* Header - Identical to Admin Dashboard */}
      <header className={`${darkMode ? 'bg-black/40' : 'bg-white/80'} backdrop-blur-xl border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-2 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Activity className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">Smart City Overview</h1>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest opacity-80 italic">Citizen Portal • Live Statistics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2.5 rounded-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-gray-100'} border border-white/10 transition-all`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
                </button>
                
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2.5 rounded-xl ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/20 text-slate-700'} border border-white/10 hover:scale-110 transition-all`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button 
                  onClick={signOut}
                  className={`p-2.5 rounded-xl ${darkMode ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-red-100 text-red-600'} border hover:scale-110 transition-all shadow-lg shadow-rose-900/10`} title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <div className="text-right border-l border-white/10 pl-6 h-10 flex flex-col justify-center">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-blue-400' : 'text-gray-600'}`}>{time.toLocaleDateString()}</p>
                <p className="text-xl font-black tracking-tighter">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Identical to Admin Dashboard */}
      <nav className={`${darkMode ? 'bg-black/20' : 'bg-white/60'} backdrop-blur-md border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} sticky top-[73px] z-40`}>
        <div className="container mx-auto px-6">
          <div className="flex space-x-10 overflow-x-auto scrollbar-hide py-1">
            {['overview', 'traffic', 'utilities', 'transport', 'services', 'alerts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-4 transition-all capitalize whitespace-nowrap text-sm font-black tracking-widest uppercase ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : `border-transparent ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        
        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-7 border ${darkMode ? 'border-white/20' : 'border-gray-200'} hover:scale-105 hover:bg-white/15 transition-all cursor-pointer shadow-2xl group`}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs font-black uppercase tracking-widest mb-1 opacity-70`}>{stat.label}</p>
                      <p className="text-4xl font-black tracking-tighter mb-2">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-rose-400" />}
                        <p className={`text-sm font-black ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.change}</p>
                      </div>
                    </div>
                    <div className={`${stat.color} p-4 rounded-2xl shadow-lg shadow-black/20 group-hover:rotate-12 transition-transform`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-black/30' : 'bg-gray-200'} rounded-full h-2.5 p-0.5 border border-white/5`}>
                    <div
                      className={`${stat.color} h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl`}>
                <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-blue-400 opacity-80">Energy Consumption (24h)</h3>
                <div className="space-y-5">
                  {[80, 65, 90, 75, 85, 70].map((value, idx) => (
                    <div key={idx} className="flex items-center space-x-5 group">
                      <span className="text-xs w-14 font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-tighter">{idx * 4}:00</span>
                      <div className={`flex-1 ${darkMode ? 'bg-black/40' : 'bg-gray-200'} rounded-2xl h-6 p-0.5 border border-white/5 overflow-hidden`}>
                        <div
                          className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 h-full rounded-2xl transition-all duration-1000 group-hover:brightness-125"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm w-12 text-right font-black drop-shadow-md text-slate-100">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>

               <div className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl flex flex-col justify-between`}>
                  <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-blue-400 opacity-80">City Infrastructure Map</h3>
                  <div className="flex-1 rounded-2xl overflow-hidden ring-4 ring-black/20 shadow-inner min-h-[300px]">
                      <CityMap />
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* Traffic Tab Content */}
        {activeTab === 'traffic' && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase mb-2 italic">Traffic Intelligence</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Real-time street flow and congestion metrics</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search city zones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-12 pr-6 py-3 rounded-2xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all font-bold w-full md:w-64`}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trafficZones.map((zone, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl hover:bg-white/15 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black tracking-tighter">{zone.zone}</h3>
                    <span className={`${zone.color} px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                      <div className="flex items-center space-x-3">
                        <Car className="w-5 h-5 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Flow/Hr</span>
                      </div>
                      <p className="text-2xl font-black text-white">{zone.vehicles}</p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 opacity-80">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Speed</span>
                        <p className="text-lg font-black text-slate-200">{zone.avgSpeed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Utilities Tab Content */}
        {activeTab === 'utilities' && (
          <div className="space-y-10 animate-fade-in">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Resource Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {utilities.map((util, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-[40px] p-10 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl flex flex-col items-center text-center group`}>
                  <div className={`${util.color} p-6 rounded-3xl shadow-2xl shadow-black/40 mb-8 group-hover:scale-110 transition-transform`}>
                    <util.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2 uppercase">{util.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-white">{util.usage}</span>
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">{util.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-8 bg-black/30 px-4 py-2 rounded-full border border-white/5">
                    {util.trend === 'up' ? <TrendingUp className="w-4 h-4 text-rose-400" /> : <TrendingDown className="w-4 h-4 text-emerald-400" />}
                    <span className={`text-xs font-black uppercase ${util.trend === 'up' ? 'text-rose-400' : 'text-emerald-400'}`}>{util.change} Trend</span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-black/40' : 'bg-gray-200'} rounded-full h-3 p-0.5 border border-white/5`}>
                    <div
                      className={`${util.color} h-full rounded-full transition-all duration-1000 shadow-lg`}
                      style={{ width: `${util.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transport Tab Content */}
        {activeTab === 'transport' && (
          <div className="space-y-10 animate-fade-in">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Mobility Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {transport.map((item, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-10 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl group`}>
                  <div className={`${item.color} p-6 rounded-3xl inline-block mb-8 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter mb-4">{item.type}</h3>
                  <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Fleet</p>
                        <p className="text-5xl font-black text-white">{item.active}</p>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                        <div className="flex justify-between mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Operational Capacity</span>
                            <span className="text-sm font-black text-blue-400">{item.capacity}%</span>
                        </div>
                        <div className={`${darkMode ? 'bg-black/40' : 'bg-gray-200'} rounded-full h-3 p-0.5 border border-white/5`}>
                            <div
                                className={`${item.color} h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                                style={{ width: `${item.capacity}%` }}
                            ></div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab Content */}
        {activeTab === 'services' && (
          <div className="space-y-10 animate-fade-in">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Smart Citizen Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {services.map((service, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-[40px] p-10 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-2xl flex flex-col items-center justify-center text-center hover:scale-105 transition-all group`}>
                   <div className={`${service.color} p-7 rounded-[30px] inline-block mb-8 shadow-2xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all`}>
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">{service.name}</h3>
                  <p className="text-5xl font-black text-white mb-3 drop-shadow-lg">{service.count}</p>
                  <div className="px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">{service.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab Content */}
        {activeTab === 'alerts' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-2">City-Wide Notifications</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Public safety announcements and city updates</p>
                </div>
             </div>
            <div className="max-w-4xl space-y-6">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 border ${darkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200'} shadow-2xl flex items-start space-x-8 transition-all group cursor-pointer`}
                >
                  <div className={`${
                      alert.type === 'warning' ? 'bg-amber-500/20 text-amber-500' : 
                      alert.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'
                  } p-4 rounded-2xl border border-current shadow-inner group-hover:scale-110 transition-transform`}>
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <p className="text-xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{alert.message}</p>
                       <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                          alert.priority === 'high' ? 'bg-rose-500/30 text-rose-400 border border-rose-500' : 
                          alert.priority === 'medium' ? 'bg-amber-500/30 text-amber-400 border border-amber-500' : 'bg-emerald-500/30 text-emerald-400 border border-emerald-500'
                       }`}>
                        {alert.priority} Priority
                       </span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3" /> {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
         )}
      </main>
    </div>
  );
}
