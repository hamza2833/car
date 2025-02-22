import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CheckboxFive from '../../components/Checkboxes/CheckboxFive';
import CheckboxFour from '../../components/Checkboxes/CheckboxFour';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';
import CheckboxThree from '../../components/Checkboxes/CheckboxThree';
import CheckboxTwo from '../../components/Checkboxes/CheckboxTwo';
import SwitcherFour from '../../components/Switchers/SwitcherFour';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import SwitcherThree from '../../components/Switchers/SwitcherThree';
import SwitcherTwo from '../../components/Switchers/SwitcherTwo';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import DatePickerTwo from '../../components/Forms/DatePicker/DatePickerTwo';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import MultiSelect from '../../components/Forms/MultiSelect';

function SignUp() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Breadcrumb pageName="Inscription Form" /> */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          Inscription Form
        </h2>

        <form className="space-y-10">
          {/* Student Information */}
          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <legend className="text-lg font-medium text-gray-900 dark:text-white px-2">
              Student Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Gender*
                </label>
                <div className="flex items-center space-x-4">
                  <SwitcherOne />
                </div>
              </div>

              <div>
                <DatePickerOne label="Date of Birth*" />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Confirm Email*
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Password*
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Languages Spoken*
                </label>
                <CheckboxOne />
              </div>
            </div>
          </fieldset>

          {/* Parent/Guardian Information */}
          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <legend className="text-lg font-medium text-gray-900 dark:text-white px-2">
              Parent/Guardian Information (Optional)
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Confirm Email
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </fieldset>

          {/* Communication Preferences */}
          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <legend className="text-lg font-medium text-gray-900 dark:text-white px-2">
              Communication Preferences
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Communication Language*
                </label>
                <CheckboxTwo />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Receive SMS Notifications
                </label>
                <CheckboxThree />
              </div>
            </div>
          </fieldset>

          <div className="text-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500">
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
