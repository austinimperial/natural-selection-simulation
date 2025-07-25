import * as Checkbox from '@radix-ui/react-checkbox';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id?: string;
};

const CheckBox = ({ checked, onCheckedChange, label, id }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox.Root
        className="flex h-4 w-4 appearance-none items-center justify-center rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={id}
      >
        <Checkbox.Indicator className="text-white">
          <span className="text-xs">✓</span>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
