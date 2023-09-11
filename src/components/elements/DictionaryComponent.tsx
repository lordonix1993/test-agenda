import styles from '../../styles/mainStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export interface IDictionaryProps {
  dictionaryList: string[];
  setDictionaryEmit(dict: string): void;
  removeFromDictionaryEmit(index: number): void;
}

function DictionaryComponent(props: IDictionaryProps) {
  const setDictHandle = (dict: string): void => {
    props.setDictionaryEmit(dict);
  };

  const deleteDictHandle = (index: number): void => {
    props.removeFromDictionaryEmit(index);
  };

  return (
    <div className={styles.dict_pos}>
      <div>Dictionary:</div>
      {props.dictionaryList != null &&
        props.dictionaryList.map((dict: string, index: number) => (
          <span key={dict} className={styles.dict_word}>
            <span onClick={() => setDictHandle(dict)}>{dict}</span>
            <span onClick={() => deleteDictHandle(index)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </span>
        ))}
    </div>
  );
}
export default DictionaryComponent;
