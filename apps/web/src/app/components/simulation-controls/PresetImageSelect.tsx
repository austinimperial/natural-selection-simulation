'use client';

import Select, { type Option } from '@repo/ui/Select';
import { useContext, useEffect } from 'react';
import { BgImageContext } from '../../global-state/bgImage/index';
import candy from './pics/candy.jpg';
import carpet from './pics/carpet.jpg';
import grass from './pics/grass.jpg';
import gravel from './pics/gravel.jpg';
import leaves from './pics/leaves.jpg';
import sand from './pics/sand.jpg';
import white from './pics/white.jpg';

const options: Option<string>[] = [
  { value: white, label: 'white' },
  { value: sand, label: 'sand' },
  { value: candy, label: 'candy' },
  { value: carpet, label: 'carpet' },
  { value: grass, label: 'grass' },
  { value: gravel, label: 'gravel' },
  { value: leaves, label: 'leaves' },
];

function PresetImageSelect() {
  const { setBgImage, bgImage } = useContext(BgImageContext);

  return (
    <div>
      <p>preset background images</p>
      <Select
        variant="default"
        options={options}
        value={bgImage || null}
        onChange={(value) => setBgImage(value)}
        placeholder="Select"
      />
    </div>
  );
}

export default PresetImageSelect;
