import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCityData } from '../../contexts/CityDataContext';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Chennai Coordinates
const CHENNAI_CENTER = [13.0827, 80.2707];

export default function CityMap() {
    const { parking, traffic } = useCityData();
    
    // Fallback coordinates around Chennai
    const getRandomOffset = () => (Math.random() - 0.5) * 0.15;

    return (
        <div className="h-full w-full overflow-hidden relative z-0 rounded-xl">
            {/* Light map tile layer */}
            <MapContainer center={CHENNAI_CENTER} zoom={12} className="h-full w-full bg-slate-100">
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; CARTO'
                />
                
                {traffic.map(t => {
                   const coords = [CHENNAI_CENTER[0] + getRandomOffset(), CHENNAI_CENTER[1] + getRandomOffset()];
                   const color = t.congestion_level === 'severe' ? '#ef4444' : t.congestion_level === 'high' ? '#f97316' : t.congestion_level === 'moderate' ? '#eab308' : '#22c55e';
                   return (
                       <Circle key={`traffic-${t.id}`} center={coords} radius={1200} pathOptions={{ color, fillColor: color, fillOpacity: 0.4, weight: 2 }}>
                           <Popup>
                               <div className="font-sans text-slate-800">
                                   <strong>Traffic Route: </strong><span>{t.route}</span><br/>
                                   <strong>Status: </strong> <span className="uppercase font-bold" style={{color}}>{t.congestion_level}</span>
                               </div>
                           </Popup>
                       </Circle>
                   )
                })}

                {parking.map(p => {
                    const coords = [CHENNAI_CENTER[0] + getRandomOffset(), CHENNAI_CENTER[1] + getRandomOffset()];
                    return (
                        <Marker key={`parking-${p.id}`} position={coords}>
                             <Popup>
                                <div className="font-sans text-slate-800">
                                    <strong>Parking Locator: </strong><span>{p.location}</span><br/>
                                    <strong>Available Slots: </strong> 
                                    <span className={`font-bold ${p.available_slots === 0 ? 'text-red-500' : 'text-emerald-500'}`}>{p.available_slots}</span> / {p.total_slots}
                                </div>
                             </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    );
}
