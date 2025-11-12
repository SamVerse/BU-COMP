import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  actions,
  hover = false,
  padding = 'default',
  className = '',
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${hoverStyles} ${paddingStyles[padding]} ${className}`}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      
      <div>{children}</div>
    </div>
  );
};

export default Card;