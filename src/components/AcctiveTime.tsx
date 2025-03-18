import React, { useState } from 'react';

interface OpeningHoursProps {
  onChange: (hours: { [key: string]: { open: string; close: string; closed: boolean } }) => void;
}

const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

const OpeningHours: React.FC<OpeningHoursProps> = ({ onChange }) => {
  const [hours, setHours] = useState<{ [key: string]: { open: string; close: string; closed: boolean } }>({
    月: { open: '10:00', close: '22:00', closed: false },
    火: { open: '10:00', close: '22:00', closed: false },
    水: { open: '10:00', close: '22:00', closed: false },
    木: { open: '10:00', close: '22:00', closed: false },
    金: { open: '10:00', close: '22:00', closed: false },
    土: { open: '10:00', close: '22:00', closed: false },
    日: { open: '10:00', close: '22:00', closed: false },
  });

  const handleChange = (day: string, field: string, value: string | boolean) => {
    const updatedHours = {
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value,
      },
    };
    setHours(updatedHours);
    onChange(updatedHours);
  };

  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">{day}</label>
          <div className="flex items-center">
            <input
              type="time"
              value={hours[day].open}
              onChange={(e) => handleChange(day, 'open', e.target.value)}
              className="w-1/3 p-2 border border-gray-400 rounded mr-2"
              disabled={hours[day].closed}
            />
            <span className="mx-2">-</span>
            <input
              type="time"
              value={hours[day].close}
              onChange={(e) => handleChange(day, 'close', e.target.value)}
              className="w-1/3 p-2 border border-gray-400 rounded mr-2"
              disabled={hours[day].closed}
            />
            <label className="ml-2">
              <input
                type="checkbox"
                checked={hours[day].closed}
                onChange={(e) => handleChange(day, 'closed', e.target.checked)}
                className="mr-2"
              />
              定休日
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
