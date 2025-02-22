import { FaSave } from "react-icons/fa";

const DriverSidebar = ({ isOpen, onClose }: any) => {
  return (
    <div
      className={`fixed z-9999 right-0 top-0 h-full w-115 overflow-y-auto bg-boxdark text-white shadow-lg transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col justify-between`}
    >
      <div>
        <div className="p-4 flex justify-between border-b border-gray-700">
          <h2 className="text-lg font-semibold">Invite drivers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✖
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">ADD DRIVERS</label>
            <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
              placeholder="Enter email"
              type='email'
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">ENTITY</label>
            <div className="relative">
              <select className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary appearance-none">
                <option value="wisemen">Wisemen</option>
                <option value="eevee">EEVEE</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <button className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center gap-2">
            <FaSave />
            <span className='ml-3'>Save</span>
          </button>
          <button
            onClick={onClose}
            className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverSidebar;