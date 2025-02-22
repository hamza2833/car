import React, { useState } from 'react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
//   onAdd: (formData: FormDataType) => void;
}

interface FormDataType {
  username: string;
  name: string;
  birthdate: string;
  email: string;
  tel: string;
  profile: File | null;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose /*, onAdd*/ }) => {
  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    name: '',
    birthdate: '',
    email: '',
    tel: '',
    profile: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      profile: file,
    }));
  };

  const handleSubmit = () => {
    // onAdd(formData);
    onClose();
    setFormData({
      username: '',
      name: '',
      birthdate: '',
      email: '',
      tel: '',
      profile: null,
    });
  };

  return isOpen ? (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-50">
    <div
      className="bg-white dark:bg-graydark p-6 rounded-lg shadow-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Entry</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="profile">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile"
              accept="image/*"
              onChange={handleProfileChange}
              className="w-full text-gray-700 dark:text-body file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 dark:file:border-form-strokedark dark:file:bg-form-input dark:file:text-body"
            />
            {formData.profile && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.profile)}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-form-strokedark bg-gray-50 dark:bg-form-input p-2 dark:text-body"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-form-strokedark bg-gray-50 dark:bg-form-input p-2 dark:text-body"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="birthdate">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-form-strokedark bg-gray-50 dark:bg-form-input p-2 dark:text-body"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-form-strokedark bg-gray-50 dark:bg-form-input p-2 dark:text-body"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-bodydark mb-1" htmlFor="tel">
              Tel
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-form-strokedark bg-gray-50 dark:bg-form-input p-2 dark:text-body"
            />
          </div>
        </div>
      </form>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="px-4 py-2 rounded-md bg-gray-300 dark:bg-strokedark text-gray-700 dark:text-white"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-90"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  </div>
  
  ) : null;
};

export default AddModal;
