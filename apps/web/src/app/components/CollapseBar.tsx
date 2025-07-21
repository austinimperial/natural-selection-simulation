"use client";

type Props = {
  label: string;
  onClick: () => void;
};

function CollapseBar({ label, onClick }: Props) {
  return (
    <button
      type="button"
      className="w-full h-[30px] bg-[rgb(72,72,72)] text-white outline-none flex justify-center items-center cursor-pointer border-none"
      onClick={onClick}
    >
      <p className="m-0 cursor-pointer">{label}</p>
    </button>
  );
}

export default CollapseBar;
