'use client';

import CheckBox from '@repo/ui/CheckBox';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function WorldWrapCheckbox() {
  const { worldWrap, setWorldWrap } = useContext(BugsContext);

  const onCheckedChange = (checked: boolean) => {
    setWorldWrap(checked);
  };

  return (
    <div className="flex items-center justify-between">
      <CheckBox
        checked={worldWrap}
        onCheckedChange={onCheckedChange}
        label="World wrap"
        id="world-wrap"
      />
    </div>
  );
}

export default WorldWrapCheckbox;
