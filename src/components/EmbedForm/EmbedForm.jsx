import React from 'react';

const EmbedForm = () => {
  return (
    <div className="embedFormContainer">
      <iframe
        src="https://forms.mk/M8LC5P"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        title="Embedded Form"
      ></iframe>
    </div>
  );
}

export default EmbedForm;
