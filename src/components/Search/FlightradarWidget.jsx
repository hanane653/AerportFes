import React, { useEffect } from 'react';

const FlightradarWidget = () => {
  useEffect(() => {
    // Créez un élément de script
    const script = document.createElement('script');
    script.src = 'https://fids.flightradar.live/widgets/airport/FEZ/departures';
    script.async = true;

    // Ajoutez le script au conteneur du widget
    const widgetContainer = document.getElementById('flightradar-widget');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }
  }, []);

  return <div id="flightradar-widget"></div>;
};

export default FlightradarWidget;
