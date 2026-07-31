import React from 'react';

export function MaintenanceScreen() {
  return (
    <section className="maintenance-screen" aria-labelledby="maintenance-title">
      <div className="maintenance-screen__card">
        <div className="maintenance-screen__copy">
          <p id="maintenance-title" className="maintenance-screen__lead">
            Сайт временно недоступен.
            <br />
            <br />
            Скоро вернусь с обновленной версией портфолио.
          </p>
          <p className="maintenance-screen__note">Спасибо за понимание.</p>
        </div>
      </div>
    </section>
  );
}
