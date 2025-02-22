import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader';
import axios from 'axios';
import { createEvent_participations, getEligibleStudents, getStudentParticipants } from '../../api';
// import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

const mockStudents = Array.from({ length: 50 }, (_, i) => ({
  id: (201 + i).toString(),
  firstname: `Student${i + 1}`,
  lastname: 'Lastname',
}));

const Participation = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]); // ids
  const [eligibleStudents, setEligibleStudents] = useState<Student[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(eligibleStudents.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const role = queryParams.get('role');
  const eventId = queryParams.get('eventId'); // View Mode
  const lessonId = queryParams.get('lessonId'); // Create Mode
  const drivingSchoolId = queryParams.get('drivingSchoolId'); // Create Mode

  const eventData = location.state || {}; // Default to an empty object if nothing is passed

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect(() => {
  //TODO uncomment this this comment for test purpose
  // if (!eventId) {  do !drivingschool + !lessonId + !role   NoT !event
  //   navigate("/calendar");
  // }
  // TODO :   dispatch(fetchStudents(drivingSchoolId, lessonId))

  // fetch eligibleStudents
  // }, [eventId, navigate]);

  // const [students, setStudents] = useState([]);


  useEffect(() => {
    // if (!eventId) {  do !drivingschool + !lessonId + !role   NoT !event
    //   navigate("/calendar");
    // }

    if (role === 'view' && eventId) {
      // Fetch students who participated in this event
      getStudentParticipants(eventId)
        .then((response : any) => {
          setEligibleStudents(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch event participants');
          setIsLoading(false);
        });
    } else if (role === 'create' && lessonId && drivingSchoolId) {
      setIsLoading(true);
      getEligibleStudents(lessonId, drivingSchoolId)
        .then((response: any) => {
          setEligibleStudents(response.data);
          setIsLoading(false);
          console.log(response);
        })
        .catch((err: any) => {
          setError('Failed to fetch students');
          setIsLoading(false);
        });
    }
  }, [lessonId, drivingSchoolId, role]);

  const paginatedStudents = eligibleStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const handleValidateSelection = async () => {
    console.log('Validated students for event:', selectedStudents);
    if (!eventData.lessonId || !selectedStudents.length) {
      alert('Please select a lesson and at least one student.');
      return;
    }

    const requestData = {
      event: {
        // type: eventData.type, // to remove : Theoretical or Practical
        employee: eventData.employee,
        date: eventData.date,
        time: eventData.time,
        description: eventData.description,
        lessonId: eventData.lessonId, // need adjust to LEsson or adjust backend
      },
      studentIds: selectedStudents, // Array of selected student IDs
    };

    console.log(requestData);

    // try {
    //   const response = await createEvent_participations(requestData); // Await the API call

    //   if (response.status !== 200) { // Check the response status instead of response.ok
    //     throw new Error("Failed to create event and participations");
    //   }

    //   // and normally after dispatch to update event state car response here type diala Event
    //   alert("Event and participations created successfully!");
    //   navigate("/calendar"); // after useEfect to fetch all events
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("An error occurred while creating the event.");
    // }

    // TODO :   dispatch(addEvent(drivingSchoolId , lessonId , employeeId))
    // TODO :   dispatch(addParticipation(eventId , studentId ))

    //TODO : or best use one api to do both in backend ( only in add)
    // TODO :   dispatch(addParticipation(eventId , studentId,drivingSchoolId , lessonId , employeeId ))

    //! you should not create event if there no students for that lesson X !!

    // TODO : add logic to diasable button if there 0 students or less that X params number
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* <Breadcrumb pageName="Participation" /> */}
      {paginatedStudents.length > 0 ? (
        <>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {role !== "view" && (
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              Select Students ({selectedStudents.length} selected)
            </h3>
          )}
            <table className="w-full border border-gray-300  dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                  <th className="p-2 pl-4 text-start">First Name</th>
                  <th className="p-2 text-start">Last Name</th>
                  {role !== "view" && (
                  <th className="p-2 text-center">Select</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t dark:border-gray-600"
                  >
                    <td className="p-2 pl-4 dark:text-white">
                      {student?.firstName}
                    </td>
                    <td className="p-2 dark:text-white">{student?.lastName}</td>
                    {role !== "view" && (
                           <td className="p-2 text-center">
                           <input
                             type="checkbox"
                             checked={selectedStudents.includes(student?.id)}
                             onChange={() => handleStudentSelect(student?.id)}
                             className="form-checkbox text-blue-500 dark:bg-gray-700 dark:border-gray-600"
                           />
                         </td>
                  )}
          
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-3 py-1 border rounded dark:text-white dark:border-gray-600"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="dark:text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border rounded dark:text-white dark:border-gray-600"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => navigate('/calendar')}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
              {role !== "view" ? (
                "Cancel"
                 ) : (
                  "Back"
                 )}

              </button>

                    {/* Hide Validate button if role === "view" */}
            {role !== "view" && (
               <button
               onClick={handleValidateSelection}
               className="rounded bg-blue-500 px-4 py-2 text-white"
             >
               Validate
             </button>
           )}

            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-6">
          <svg
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v2h6v-2m-7-4v6h8v-6m-8-4V7h8v2m-7 4h6"
            ></path>
          </svg>
          <p className="text-lg font-semibold">No students available</p>
          <p className="text-sm">
            There are no eligible students for this lesson at the moment.
          </p>
        </div>
      )}
    </>
  );
};

export default Participation;
