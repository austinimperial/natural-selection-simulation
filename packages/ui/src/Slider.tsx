import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  name: string;
  unit?: string;
  onValueChange?: (value: number) => void;
  onValueCommit: (value: number) => void;
}

function Slider({
  min,
  max,
  value,
  step,
  name,
  unit,
  onValueChange,
  onValueCommit,
}: SliderProps) {
  const handleValueChange = (values: number[]) => {
    onValueChange?.(values[0]);
  };

  const handleValueCommit = (values: number[]) => {
    onValueCommit(values[0]);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="text-sm">{name}</div>
      <div className="flex items-center w-full">
        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none w-full max-w-[170px] h-5"
          value={[value]}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          max={max}
          min={min}
          step={step}
        >
          <SliderPrimitive.Track className="bg-black relative grow rounded-full h-[3px] w-full min-w-[150px]">
            <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="block w-5 h-5 bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
            aria-label={name}
          />
        </SliderPrimitive.Root>
        <div className="ml-[5px] text-sm">
          {value}
          {unit}
        </div>
      </div>
    </div>
  );
}

export default Slider;
