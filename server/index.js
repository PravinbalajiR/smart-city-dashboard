const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Setup Routes
app.get('/api/dashboard-data', async (req, res) => {
   try {
       const [alerts, traffic, parking] = await Promise.all([
           supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(5),
           supabase.from('traffic').select('*'),
           supabase.from('parking').select('*')
       ]);
       res.json({
           alerts: alerts.data || [],
           traffic: traffic.data || [],
           parking: parking.data || []
       });
   } catch(err) {
       res.status(500).json({error: err.message});
   }
});

app.post('/api/alerts', async (req, res) => {
    const { type, message, area } = req.body;
    const { data, error } = await supabase.from('alerts').insert([{ type, message, area }]).select();
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/alerts', async (req, res) => {
    const { data, error } = await supabase.from('alerts').select('*').order('created_at', { ascending: false });
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.post('/api/bookings', async (req, res) => {
    const { user_id, transport_id } = req.body;
    const { data, error } = await supabase.from('bookings').insert([{ user_id, transport_id, status: 'confirmed' }]).select();
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/transport', async (req, res) => {
    const { data, error } = await supabase.from('transport').select('*');
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/parking', async (req, res) => {
    const { data, error } = await supabase.from('parking').select('*');
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/traffic', async (req, res) => {
    const { data, error } = await supabase.from('traffic').select('*');
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/electricity', async (req, res) => {
    const { data, error } = await supabase.from('electricity').select('*');
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.get('/api/water', async (req, res) => {
    const { data, error } = await supabase.from('water_supply').select('*');
    if(error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
