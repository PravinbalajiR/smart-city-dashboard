import React, { useState, useEffect } from 'react';
import { Activity, Zap, Wind, Car, Users, AlertCircle, Droplets, ThermometerSun, MapPin, Bus, Wifi, Camera, TrendingUp, TrendingDown, Search, Filter, X, Bell, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [liveData, setLiveData] = useState({
    energyUsage: 1.2,
    airQuality: 45,
    trafficFlow: 68
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        energyUsage: Number((prev.energyUsage + (Math.random() - 0.5) * 0.1).toFixed(2)),
        airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 5)),
        trafficFlow: Math.max(0, Math.min(100, prev.trafficFlow + (Math.random() - 0.5) * 10))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, label: 'Population', value: '2.5M', change: '+2.3%', trend: 'up', color: 'bg-blue-500', percentage: 85 },
    { icon: Zap, label: 'Energy Usage', value: `${liveData.energyUsage} GW`, change: '-5.1%', trend: 'down', color: 'bg-yellow-500', percentage: 72 },
    { icon: Wind, label: 'Air Quality', value: 'Good', change: `AQI ${Math.round(liveData.airQuality)}`, trend: 'up', color: 'bg-green-500', percentage: Math.round(liveData.airQuality) },
    { icon: Car, label: 'Traffic Flow', value: 'Moderate', change: `${Math.round(liveData.trafficFlow)}%`, trend: 'down', color: 'bg-orange-500', percentage: Math.round(liveData.trafficFlow) },
  ];

  const trafficData = [
    { zone: 'Downtown', status: 'Heavy', vehicles: 1250, color: 'bg-red-500', cameras: 24, incidents: 3, avgSpeed: '15 km/h' },
    { zone: 'North District', status: 'Moderate', vehicles: 780, color: 'bg-yellow-500', cameras: 18, incidents: 1, avgSpeed: '35 km/h' },
    { zone: 'East Side', status: 'Light', vehicles: 340, color: 'bg-green-500', cameras: 12, incidents: 0, avgSpeed: '50 km/h' },
    { zone: 'West End', status: 'Moderate', vehicles: 890, color: 'bg-yellow-500', cameras: 15, incidents: 2, avgSpeed: '32 km/h' },
    { zone: 'South Quarter', status: 'Light', vehicles: 420, color: 'bg-green-500', cameras: 10, incidents: 0, avgSpeed: '45 km/h' },
    { zone: 'Central Park', status: 'Light', vehicles: 210, color: 'bg-green-500', cameras: 8, incidents: 0, avgSpeed: '55 km/h' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'High traffic expected in Downtown area (5-7 PM)', time: '10 min ago', priority: 'high' },
    { id: 2, type: 'info', message: 'Street maintenance scheduled on Main St tomorrow', time: '1 hour ago', priority: 'medium' },
    { id: 3, type: 'success', message: 'Air quality improved by 12% this week', time: '2 hours ago', priority: 'low' },
    { id: 4, type: 'warning', message: 'Water pressure low in North District', time: '3 hours ago', priority: 'high' },
    { id: 5, type: 'info', message: 'New EV charging stations installed downtown', time: '5 hours ago', priority: 'low' },
  ];

  const utilities = [
  { name: 'Water', usage: 75, progress: 75, unit: 'ML/day', icon: Droplets, color: 'bg-blue-400', trend: 'down', change: '-3%' },
  { name: 'Electricity', usage: 82, progress: 82, unit: 'GWh', icon: Zap, color: 'bg-yellow-400', trend: 'up', change: '+2%' },
  { name: 'Temperature', usage: 24, progress: 60, unit: '°C', icon: ThermometerSun, color: 'bg-orange-400', trend: 'up', change: '+1°C' },
];

  const publicTransport = [
  { type: 'Bus', active: 145, capacity: 78, icon: Bus, color: 'bg-blue-500' },
  { type: 'Metro', active: 32, capacity: 92, icon: Activity, color: 'bg-purple-500' },
  { type: 'Bikes', active: 890, capacity: 45, icon: Activity, color: 'bg-green-500' },
];

  const smartServices = [
    { name: 'WiFi Hotspots', count: 342, status: 'Online', icon: Wifi, color: 'bg-cyan-500' },
    { name: 'CCTV Cameras', count: 127, status: 'Active', icon: Camera, color: 'bg-red-500' },
    { name: 'Parking Spots', count: 1240, status: '68% Full', icon: MapPin, color: 'bg-indigo-500' },
  ];

  const filteredTraffic = trafficData.filter(zone => {
    const matchesSearch = zone.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || zone.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredAlerts = alerts.filter(alert => 
    alert.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
      <header className={`${darkMode ? 'bg-black/30' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-400 animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold">Smart City Control</h1>
                <p className="text-xs text-gray-400">Real-time Monitoring System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-2xl border ${darkMode ? 'border-white/10' : 'border-gray-200'} p-4`}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {alerts.slice(0, 3).map(alert => (
                      <div key={alert.id} className={`p-3 mb-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700/20 text-slate-700'} hover:scale-110 transition-all`}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={signOut}
                className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'} hover:scale-110 transition-all`} title="Log Out"
              >
                <LogOut className="w-6 h-6" />
              </button>

              <div className="text-right">
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{time.toLocaleDateString()}</p>
                <p className="text-lg font-semibold">{time.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className={`${darkMode ? 'bg-black/20' : 'bg-white/60'} backdrop-blur-sm border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {['overview', 'traffic', 'utilities', 'transport', 'services', 'alerts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-400 text-blue-400 font-semibold'
                    : `border-transparent ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} hover:scale-105 transition-all cursor-pointer shadow-lg`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-1`}>{stat.label}</p>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                        <p className={`text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</p>
                      </div>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className={`${stat.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4">Energy Consumption (24h)</h3>
                <div className="space-y-3">
                  {[80, 65, 90, 75, 85, 70].map((value, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="text-sm w-12">{idx * 4}:00</span>
                      <div className={`flex-1 ${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-6`}>
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-6 rounded-full transition-all duration-1000 hover:scale-y-110"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm w-12 text-right font-semibold">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4">Public Services Status</h3>
                <div className="space-y-4">
                  {utilities.map((util, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg hover:scale-105 transition-all`}>
                      <div className="flex items-center space-x-3">
                        <div className={`${util.color} p-2 rounded-lg`}>
                          <util.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{util.name}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{util.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{util.usage}</p>
                        <p className={`text-xs ${util.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>{util.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {smartServices.map((service, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg hover:scale-105 transition-all`}>
                  <div className={`${service.color} p-3 rounded-lg inline-block mb-3`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">{service.name}</h4>
                  <p className="text-2xl font-bold">{service.count}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'traffic' && (
           <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold">Traffic Management</h2>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search zones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
                
                <div className="flex gap-2">
                  {['all', 'heavy', 'moderate', 'light'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterStatus(filter)}
                      className={`px-4 py-2 rounded-lg capitalize transition-all ${
                        filterStatus === filter
                          ? 'bg-blue-500 text-white'
                          : `${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTraffic.map((zone, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedZone(selectedZone === zone.zone ? null : zone.zone)}
                  className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg hover:scale-105 transition-all cursor-pointer ${selectedZone === zone.zone ? 'ring-2 ring-blue-400' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{zone.zone}</h3>
                    <span className={`${zone.color} px-3 py-1 rounded-full text-sm font-semibold`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Car className="w-5 h-5 text-gray-400" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vehicles/hour</span>
                      </div>
                      <p className="text-2xl font-bold">{zone.vehicles}</p>
                    </div>
                    
                    {selectedZone === zone.zone && (
                      <>
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                           <Camera className="w-5 h-5 text-gray-400" />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cameras</span>
                          </div>
                          <p className="font-semibold">{zone.cameras}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Incidents</span>
                          </div>
                          <p className="font-semibold">{zone.incidents}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-gray-400" />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Speed</span>
                          </div>
                          <p className="font-semibold">{zone.avgSpeed}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
           </div>
        )}

        {activeTab === 'utilities' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Utilities Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {utilities.map((util, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg hover:scale-105 transition-all`}>
                  <div className={`${util.color} p-4 rounded-lg inline-block mb-4`}>
                    <util.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{util.name}</h3>
                  <p className="text-4xl font-bold mb-1">{util.usage}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{util.unit}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    {util.trend === 'up' ? <TrendingUp className="w-4 h-4 text-red-400" /> : <TrendingDown className="w-4 h-4 text-green-400" />}
                    <span className={`text-sm ${util.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>{util.change} from last week</span>
                  </div>
                  <div className={`${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className={`${util.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${util.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Public Transport</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicTransport.map((transport, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg hover:scale-105 transition-all`}>
                  <div className={`${transport.color} p-4 rounded-lg inline-block mb-4`}>
                    <transport.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{transport.type}</h3>
                  <p className="text-4xl font-bold mb-1">{transport.active}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Units</p>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                       <span className="text-sm">Capacity</span>
                       <span className="text-sm font-semibold">{transport.capacity}</span>
                    </div>
                    <div className={`${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2`}>
                      <div
                        className={`${transport.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${transport.capacity}%` }}
                      ></div>
                    </div>
                  </div>
                 </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Smart City Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {smartServices.map((service, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg hover:scale-105 transition-all`}>
                   <div className={`${service.color} p-4 rounded-lg inline-block mb-4`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-4xl font-bold mb-1">{service.count}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold">City Alerts & Notifications</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
              </div>
            </div>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`${darkMode ? 'bg-white/10' : 'bg-white'} backdrop-blur-md rounded-xl p-6 border ${darkMode ? 'border-white/20' : 'border-gray-200'} shadow-lg flex items-start space-x-4 hover:scale-[1.02] transition-all cursor-pointer`}
                >
                  <AlertCircle
                    className={`w-6 h-6 mt-1 ${
                      alert.type === 'warning'
                        ? 'text-yellow-400'
                        : alert.type === 'success'
                        ? 'text-green-400'
                        : 'text-blue-400'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold">{alert.message}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          alert.priority === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : alert.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
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
