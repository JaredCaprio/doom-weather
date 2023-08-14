import { AiFillCloseCircle } from "react-icons/ai";
type Props = {
  openModal: boolean;
  setOpenModal: Function;
  setDoomify: Function;
  doomify: boolean;
};

export default function Modal({
  openModal,
  setOpenModal,
  doomify,
  setDoomify,
}: Props) {
  return (
    <div className="flex items-center justify-center min-h-full min-w-full absolute z-10">
      <div className="relative bg-slate-700 p-20 rounded-xl">
        <AiFillCloseCircle
          onClick={() => setOpenModal(false)}
          className="absolute top-1 right-1"
        />
        <h1 className="text-4xl mb-5 text-center">Settings</h1>
        <label className="mr-5" htmlFor="doomify">
          Doom Mode
        </label>
        <input
          className="border-red-900 text-red-700 focus:ring-red-200"
          type="checkbox"
          id="doomify"
          name="doomify"
          checked={doomify}
          onClick={() => setDoomify((prev: any) => !prev)}
        />
      </div>
    </div>
  );
}