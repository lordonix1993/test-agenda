import React from 'react';
import styles from '../../styles/tooltipStyles.module.css';
import { ITooltipProps } from '../../actions/interface/ITooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function TooltipComponent(props: ITooltipProps) {
  const closeTooltipHandle = (): void => {
    props.closeTooltipEmit();
  };

  const addToIgnoreHandle = (): void => {
    props.addToIgnore();
  };

  const saveToDictionaryHandle = (): void => {
    props.saveToDictionaryEmit();
    closeTooltipHandle();
  };

  const changeContentHandle = (suggestion: string): void => {
    props.changeContentEmit(suggestion, props.rangeContent);
    closeTooltipHandle();
  };

  return (
    <>
      {props.showTooltip && (
        <div
          className={styles.popup_modal}
          style={{
            top: props.positionTooltip.top + 'px',
            left: props.positionTooltip.left + 'px',
          }}
        >
          <div className={styles.suggests}>
            {props.tooltipSuggestions.length > 0 &&
              props.tooltipSuggestions.map((suggestion) => (
                <span key={suggestion} onClick={() => changeContentHandle(suggestion)}>
                  {suggestion}
                </span>
              ))}
          </div>
          <div className={styles.block_button}>
            <button onClick={saveToDictionaryHandle}>
              <FontAwesomeIcon icon={faBook} />
              <span>Add to dictionary</span>
            </button>
            <button onClick={addToIgnoreHandle}>
              <FontAwesomeIcon icon={faCircleXmark} />
              <span>Ignore</span>
            </button>
            <button onClick={closeTooltipHandle}>
              <FontAwesomeIcon icon={faCircleXmark} />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TooltipComponent;
