import React from 'react';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  
  return (
    <div className={`mb-12 md:mb-16 ${alignmentClass}`} data-aos="fade-up">
      <h2 className="heading-section mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-text-secondary text-lg md:text-xl max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
