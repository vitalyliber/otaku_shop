import React from 'react';
import useI18n from '../effects/useI18n';

const Loading = () => {
  const i18n = useI18n();

  return (
    <div className="text-center">
      {i18n.t('loading')}
    </div>
  );
};

export default Loading;
