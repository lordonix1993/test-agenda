import ReactQuill from 'react-quill';
import React from 'react';
import styles from '../../styles/mainStyles.module.css';
import 'react-quill/dist/quill.snow.css';
import { IQuillProps } from '../../actions/interface/IQuills';
import TooltipComponent from './TooltipComponent';
import DictionaryComponent from './DictionaryComponent';
import { useQuill } from '../../actions/useQuill';

function QuillComponent(props: IQuillProps) {
  const {
    rangeContent,
    positionTooltip,
    tooltipSuggestions,
    dictionaryList,
    setFromDictionaryHandle,
    handleChangeSelection,
    removeFromDictionaryHandle,
    checkText,
    saveToDictionaryHandle,
    changeContentHandle,
    closeTooltipHandle,
    addToIgnoreList,
    setRef,
  } = useQuill(props);

  return (
    <div className={styles.text_area}>
      <DictionaryComponent
        setDictionaryEmit={setFromDictionaryHandle}
        removeFromDictionaryEmit={removeFromDictionaryHandle}
        dictionaryList={dictionaryList}
      />
      <div className={styles.dict_block} onContextMenu={(e) => e.preventDefault()}>
        <ReactQuill
          className={'editor_' + props.quill.id}
          ref={setRef}
          theme={'snow'}
          modules={props.quill.modules}
          onKeyUp={checkText}
          placeholder={props.quill.placeholder}
          onChangeSelection={handleChangeSelection}
        />
        <div className="tooltipBlock">
          <TooltipComponent
            saveToDictionaryEmit={saveToDictionaryHandle}
            changeContentEmit={changeContentHandle}
            closeTooltipEmit={closeTooltipHandle}
            rangeContent={rangeContent}
            showTooltip={props.quill.showTooltip}
            addToIgnore={addToIgnoreList}
            positionTooltip={positionTooltip}
            tooltipSuggestions={tooltipSuggestions}
          />
        </div>
      </div>
    </div>
  );
}

export default QuillComponent;
