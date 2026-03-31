import React from 'react';
import { Users, Zap, Wind, Car, Droplet, Thermometer, Wifi, Camera, MapPin } from 'lucide-react';
import CityMap from '../../components/Map/CityMap';
import { useCityData } from '../../contexts/CityDataContext';

const MetricCard = ({ title, value, subValue, trend, trendUp, icon: Icon, colorClass, highlightWidth }) => (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700/50 shadow-xl relative flex flex-col justify-between hover:bg-[#253347] transition duration-300">
        <div className="flex justify-between items-start mb-6">
            <div>
                <p className="text-sm text-slate-300 font-medium mb-1 tracking-wide">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-[32px] font-black text-white tracking-tight leading-none">{value}</h2>
                    {subValue && <span className="text-sm text-slate-300 font-bold">{subValue}</span>}
                </div>
                <p className={`text-[13px] mt-2 font-bold flex items-center gap-1 tracking-wide ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trendUp ? '↗' : '↘'} {trend}
                </p>
            </div>
            <div className={`p-3.5 rounded-xl ${colorClass}`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
        </div>
        <div className="w-full bg-[#0f172a] h-2 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full rounded-full ${colorClass.split(' ')[0]}`} style={{width: highlightWidth}}></div>
        </div>
    </div>
);

const EnergyBar = ({ time, percentage, width }) => (
    <div className="flex items-center gap-5 mb-4 text-sm font-semibold">
        <span className="w-10 text-slate-300 tracking-wider ">{time}</span>
        <div className="flex-1 bg-[#0f172a] h-5 rounded-r-3xl rounded-l-md overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-r-3xl rounded-l-md" style={{width: width}}></div>
        </div>
        <span className="w-10 text-right text-slate-100 font-bold">{percentage}</span>
    </div>
);

const ServiceRow = ({ icon: Icon, title, subtitle, value, trend, trendUp, colorClass }) => (
    <div className="bg-[#243147] rounded-xl p-5 flex items-center justify-between border border-slate-700/50 hover:bg-[#2a3852] transition">
        <div className="flex items-center gap-5">
            <div className={`p-4 rounded-xl shadow-lg ${colorClass}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-white font-bold text-lg tracking-wide">{title}</p>
                <p className="text-xs text-slate-400 font-medium tracking-wider">{subtitle}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-[26px] font-black text-white leading-none mb-1">{value}</p>
            <p className={`text-xs font-bold ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trendUp ? '+' : '-'}{trend}
            </p>
        </div>
    </div>
);

export default function UserDashboard() {
  const { traffic } = useCityData();
  const trafficDelay = traffic.some(t => t.congestion_level === 'severe');

  return (
    <div className="p-8 max-w-[1800px] mx-auto space-y-8 fade-in h-full bg-[#0b1121]">
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard title="Population" value="2.5M" trend="+2.3%" trendUp={true} icon={Users} colorClass="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" highlightWidth="75%" />
          <MetricCard title="Energy Usage" value="1.21 GW" trend="-5.1%" trendUp={false} icon={Zap} colorClass="bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" highlightWidth="60%" />
          <MetricCard title="Air Quality" value="Good" subValue="AQI 51" trend="AQI 51" trendUp={true} icon={Wind} colorClass="bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" highlightWidth="45%" />
          <MetricCard title="Traffic Flow" value={trafficDelay ? "Heavy" : "Moderate"} trend={trafficDelay ? "88%" : "67%"} trendUp={false} icon={Car} colorClass="bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" highlightWidth={trafficDelay ? "88%" : "67%"} />
      </div>

      {/* Middle Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#1e293b] rounded-2xl p-8 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-8 tracking-wide">Energy Consumption (24h)</h3>
              <div className="space-y-4">
                  <EnergyBar time="0:00" percentage="80%" width="80%" />
                  <EnergyBar time="4:00" percentage="65%" width="65%" />
                  <EnergyBar time="8:00" percentage="90%" width="90%" />
                  <EnergyBar time="12:00" percentage="75%" width="75%" />
                  <EnergyBar time="16:00" percentage="85%" width="85%" />
                  <EnergyBar time="20:00" percentage="70%" width="70%" />
              </div>
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-8 border border-slate-700/50 shadow-xl flex flex-col justify-between">
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Public Services Status</h3>
              <div className="space-y-5">
                 <ServiceRow icon={Droplet} title="Water" subtitle="ML/day" value="75" trend="3%" trendUp={true} colorClass="bg-blue-500" />
                 <ServiceRow icon={Zap} title="Electricity" subtitle="GWh" value="82" trend="2%" trendUp={true} colorClass="bg-amber-500" />
                 <ServiceRow icon={Thermometer} title="Temperature" subtitle="°C" value="24" trend="1°C" trendUp={false} colorClass="bg-orange-500" />
              </div>
          </div>

      </div>

      {/* Map & Bottom Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10">
          <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-xl flex-1 flex flex-col items-center justify-center gap-3 hover:bg-[#253347] transition cursor-pointer">
                  <div className="bg-[#0f172a] p-4 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"><Wifi className="w-8 h-8" /></div>
              </div>
              <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-xl flex-1 flex flex-col items-center justify-center gap-3 hover:bg-[#253347] transition cursor-pointer">
                  <div className="bg-[#0f172a] p-4 rounded-xl border border-rose-500/30 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]"><Camera className="w-8 h-8" /></div>
              </div>
              <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-xl flex-1 flex flex-col items-center justify-center gap-3 hover:bg-[#253347] transition cursor-pointer">
                  <div className="bg-[#0f172a] p-4 rounded-xl border border-indigo-500/30 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]"><MapPin className="w-8 h-8" /></div>
              </div>
          </div>
          
          <div className="lg:col-span-3 min-h-[450px] bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 shadow-xl flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Chennai Live Infrastructure Map</h3>
              <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-[#0f172a]">
                  <CityMap />
              </div>
          </div>
      </div>
    </div>
  );
}
