import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = () => {
  const [tinh, setTinh] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState('');
  const [quan, setQuan] = useState([]);
  const [selectedQuan, setSelectedQuan] = useState('');
  const [phuong, setPhuong] = useState([]);
  const [selectedPhuong, setSelectedPhuong] = useState('');

  useEffect(() => {
    // Fetch provinces
    axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => {
        if (response.data.error === 0) {
          setTinh(response.data.data);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedTinh) {
      // Fetch districts
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then(response => {
          if (response.data.error === 0) {
            setQuan(response.data.data);
            setPhuong([]);
            setSelectedQuan('');
          }
        });
    }
  }, [selectedTinh]);

  useEffect(() => {
    if (selectedQuan) {
      // Fetch wards
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then(response => {
          if (response.data.error === 0) {
            setPhuong(response.data.data);
          }
        });
    }
  }, [selectedQuan]);

  return (
    <div className="">
      <select 
        className="p-2 border border-gray-200 text-base w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight" 
        id="tinh" 
        name="tinh" 
        title="Chọn Tỉnh Thành"
        value={selectedTinh}
        onChange={e => setSelectedTinh(e.target.value)}
      >
        <option value="0">Tỉnh Thành</option>
        {tinh.map(t => (
          <option key={t.id} value={t.id}>{t.full_name}</option>
        ))}
      </select> 
          <div className='flex gap-x-8'>
          <select 
        className="p-2 border border-gray-200 text-base w-1/2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight" 
        id="quan" 
        name="quan" 
        title="Chọn Quận Huyện"
        value={selectedQuan}
        onChange={e => setSelectedQuan(e.target.value)}
        disabled={!selectedTinh}
      >
        <option value="0">Quận Huyện</option>
        {quan.map(q => (
          <option key={q.id} value={q.id}>{q.full_name}</option>
        ))}
      </select> 
      <select 
        className="p-2 border border-gray-200 text-base w-1/2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight" 
        id="phuong" 
        name="phuong" 
        title="Chọn Phường Xã"
        value={selectedPhuong}
        onChange={e => setSelectedPhuong(e.target.value)}
        disabled={!selectedQuan}
      >
        <option value="0">Phường Xã</option>
        {phuong.map(p => (
          <option key={p.id} value={p.id}>{p.full_name}</option>
        ))}
      </select>
      </div>
    </div>
  );
}

export default LocationSelector;
