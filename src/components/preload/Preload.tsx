import stylesText from '../app/App.module.css';
import { FC } from 'react';

const Preload: FC = () => {
  return (
    <h1 className={`${stylesText.preload_text} text text_type_main-large`}>
      Загружаем ...
    </h1>
  );
};

export default Preload;
