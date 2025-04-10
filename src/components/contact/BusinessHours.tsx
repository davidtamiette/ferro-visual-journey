
import React from 'react';

const BusinessHours = () => {
  return (
    <div className="glass dark:glass-dark bg-toti-navy dark:bg-toti-navy/70 p-8 text-white transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-elevated">
      <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
      <div className="space-y-2">
        <p className="flex justify-between">
          <span>Segunda - Sexta:</span>
          <span>7:30 - 17:00</span>
        </p>
      </div>
    </div>
  );
};

export default BusinessHours;
