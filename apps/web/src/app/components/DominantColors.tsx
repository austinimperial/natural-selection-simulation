import DomImageColors from './DominantImageColors';
import DomPopulationColors from './DominantPopulationColors';

function DomColors() {
  // const
  const MAX_COLOR_COUNT = 8;

  return (
    <div className="flex flex-col items-end gap-2 my-4">
      <DomImageColors maxColorCount={MAX_COLOR_COUNT} />
      <DomPopulationColors maxColorCount={MAX_COLOR_COUNT} />
    </div>
  );
}

export default DomColors;
