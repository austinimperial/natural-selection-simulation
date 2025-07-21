'use client';

import CheckBox from '@repo/ui/CheckBox';
import React, { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function FlashOnDeathCheckbox() {
  const { flashOnDeath, setFlashOnDeath } = useContext(BugsContext);

  const onCheckedChange = (checked: boolean) => {
    setFlashOnDeath(checked);
  };

  return (
    <div className="flex items-center justify-between">
      <CheckBox
        checked={flashOnDeath}
        onCheckedChange={onCheckedChange}
        label="Flash on death"
        id="flash-on-death"
      />
    </div>
  );
}

export default FlashOnDeathCheckbox;
