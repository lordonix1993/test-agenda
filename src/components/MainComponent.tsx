import QuillComponent from './elements/QuillComponent';
import { quills } from '../config/main';
import React, { useState } from 'react';
import { IQuill } from '../actions/interface/IQuills';

function MainComponent() {
  const [process, setProcess] = useState({
    quills,
  });

  const showTooltipMainHandle = (id: string): void => {
    quills.forEach((quill_item) => {
      if (id === quill_item.id) {
        quill_item.showTooltip = true;
      }
    });

    setProcess({quills});
  };
  const closeAllTooltipsHandle = (): void => {
    quills.forEach((quill_item: IQuill) => {
      quill_item.showTooltip = false;
    });
    setProcess({quills});
  };

  return (
    <div className="App-block">
      {process.quills.map((quill_item: IQuill) => (
        <QuillComponent
          key={quill_item.id}
          quill={quill_item}
          closeAllTooltipEmit={closeAllTooltipsHandle}
          showTooltipMainEmit={showTooltipMainHandle}
        />
      ))}
    </div>
  );
}
export default MainComponent;
