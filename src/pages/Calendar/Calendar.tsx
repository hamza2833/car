import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createEvent, deleteEvent, fetchEvents } from "../../store/thunks/eventThunks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Event } from "../../types/event";
import { Student } from "../../types/student";
import Loader from "../../common/Loader";
import Participation from "./Participation";
import { getLessons } from "../../api";




interface Phase {
  id: string;
  name: string;
  parentPhase?: Phase | null; // Recursive structure
}

interface Lesson {
  id: string;
  name: string;
  lessonOrder: number;
  lessonType: "practical" | "theoretical"; // Ensures only valid values
  phase: Phase;
}




const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};


const Calendar: React.FC = () => {

  const mockEmployees = [
    { id: "1", firstname: "John", lastname: "Doe", type: "instructor" },
    { id: "2", firstname: "Jane", lastname: "Smith", type: "monitor" },
    { id: "3", firstname: "Hamza", lastname: "test", type: "monitor" }
  ];
  
  const mockLessons = [
    { id: "101", name: "Lesson 1", type: "theoretical" },
    { id: "102", name: "Lesson 2", type: "practical" }
  ];

  const mockStudents = Array.from({ length: 50 }, (_, i) => ({
    id: (201 + i).toString(),
    firstname: `Student${i + 1}`,
    lastname: `lastname${i + 1}`
  }));
  
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEvents()); // ✅ Fetch events from Redux store
    // TODO :   dispatch(fetchEmployeesBydrivingSchoolId(drivingSchoolId))  // to add
    // TODO :   dispatch(fetchLessonsBydrivingSchoolId(drivingSchoolId))
  }, [dispatch]);
  
  const { events, isLoading } = useSelector((state: RootState) => state.event);

  const [currentDate, setCurrentDate] = useState(new Date());


  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventType, setEventType] = useState<"theoretical" | "practical">("theoretical");

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [studentSelectionOpen, setStudentSelectionOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedStudents = mockStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(mockStudents.length / itemsPerPage);
  const [form, setForm] = useState<Event>({
    id: "",
    type: "theoretical",
    employee: "",
    date: "",
    time: "",
    description: "",
    lessonId: "",
  });
  
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [isLessonLoading, setIsLessonLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Find the first employee based on eventType
    const firstEmployee = mockEmployees.find(emp => 
      eventType === "theoretical" ? emp.type === "instructor" : emp.type === "monitor"
    );

    if (firstEmployee) {
      setForm(prevForm => ({
        ...prevForm,
        employee: firstEmployee.id // Set default employee
      }));
    }
  }, [eventType]); // Re-run effect when eventType changes
  


  useEffect(() => {
    setIsLessonLoading(true);
    getLessons()
      .then((response: { data: Lesson[] }) => {
        setLessons(response.data);
        setIsLessonLoading(false);
              // Find first lesson of the default type ('theoretical')
      const firstLesson = response.data.find(lesson => lesson.lessonType === eventType);
      console.log( firstLesson)
      // Update form with first lessonId if available
      setForm(prevForm => ({
        ...prevForm,
        lessonId: firstLesson ? firstLesson.id : "", 
      }));

      console.log(form)

      })
      .catch(() => {
        setError("Failed to fetch lessons");
        setIsLessonLoading(false);
      });
  }, []);
  

  // const [newEventId, setNewEventId] = useState<string | null>(null);


// console.log(lessons)

  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleDateClick = (date: Date) => {
    // setForm({
    //   id: "",
    //   type: eventType,
    //   employee: "",
    //   date: date.toISOString().split("T")[0],
    //   time: "",
    //   description: "",
    //   lessonId: "",
    // });

    // const firstLesson = lessons.find(lesson => lesson.lessonType === eventType);
    // // Update form with first lessonId if available
    // setForm(prevForm => ({
    //   ...prevForm,
    //   lessonId: firstLesson ? firstLesson.id : "", 
    // }));

    setForm(prevForm => ({
      ...prevForm,
      date: date.toISOString().split("T")[0],
    }));

    setModalOpen(true);
    setSelectedEvent(null);
  };

  const navigate = useNavigate();

  const handleAddEvent = () => {
    // dispatch(createEvent(form));
    // dispatch(fetchStudents(form.lessonId));
    setModalOpen(false);
    // setStudentSelectionOpen(true);
    // role : view and create
    // view pass only pass eventId then in backend fetch all particip based on that eventId and take studentIds and request name based on ids from api student and return studentsDtid
    // create pass : lessonId and drivingSchoolId as params !!
    // navigate("/participation");

    //mock for drivingSchoolId
    const drivingSchoolId = "123"
    // console.log(form)
    navigate(`/participation?lessonId=${form.lessonId}&drivingSchoolId=${drivingSchoolId}&role=create`,
      { state: form });
   
    // navigate(`/participation`,  { state: form });
    // navigate(`/participation?eventId=${eventId}&role=view`);

    // TODO :   pass data to participant page ex lessonId , drivingSchoolId , employeId
    // TODO :  so i can create event from it and participation 

    // setEvents((prevEvents) => [
    //   ...prevEvents,
    //   { ...form, id: uuidv4() , date: new Date(form.date).toISOString() },
    // ]);
    // const newEvent = { 
    //   ...form, 
    //   // id: uuidv4(), id generated on backend
    //   date: new Date(form.date).toISOString() 
    // };
    // dispatch(createEvent(newEvent)); 
    // setModalOpen(false);
    // try {
    //   const response = await dispatch(createEvent(newEvent)).unwrap();
    //   setNewEventId(response.id); // Store event ID for participation API
  
    //   // Fetch eligible students from backend
    //   const studentResponse = await dispatch(fetchEligibleStudents(form.lessonId)).unwrap();
    //   setStudents(studentResponse);
  
    //   setStudentModalOpen(true); // Open the student selection modal
    // } catch (error) {
    //   console.error("Error creating event:", error);
    // }
  };
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleValidateSelection = () => {
    setStudentSelectionOpen(false);
    // Mock participation creation logic
    console.log("Validated students for event:", selectedStudents);
  };

  
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
      // setEvents((prevEvents) => prevEvents.filter((e) => e !== selectedEvent));
      setSelectedEvent(null);
      setModalOpen(false);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };


  const location = useLocation();

  // Highlight and scroll to the event based on the query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get("eventId");

    if (eventId) {
      const targetEvent = events.find((event) => event.id === eventId);
      if (targetEvent) {
        const targetDate = new Date(targetEvent.date);
        setCurrentDate(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
        setTimeout(() => {
          const eventElement = document.getElementById(eventId);
          if (eventElement) {
            eventElement.scrollIntoView({ behavior: "smooth", block: "center" });
            eventElement.classList.add("ring-2", "ring-blue-500");
            setTimeout(() => {
              eventElement.classList.remove("ring-2", "ring-blue-500");
            }, 2000);
          }
        }, 300);
      }
    }
  }, [location.search, events]);

  return (
    <>
      {/* <a
          href={`/calendar?eventId=a

`}
          className="my-6 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Go to Event URL
        </a> */}
      <Breadcrumb pageName="Calendar" />

     
     {/* Start Swap month year calendar  */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handlePrevYear}
            className="px-4 py-2 text-white bg-gray-600 rounded"
          >
            Previous Year
          </button>
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 text-white bg-gray-600 rounded"
          >
            Previous Month
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 text-white bg-gray-600 rounded"
          >
            Next Month
          </button>
          <button
            onClick={handleNextYear}
            className="px-4 py-2 text-white bg-gray-600 rounded"
          >
            Next Year
          </button>
        </div>
      </div>

      {/* END Swap month year calendar  */}


   
        {/* Start ADD EVENT BUTTON   */}   
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEventType("theoretical");
            setModalOpen(true);
            setSelectedEvent(null);
          }}
          className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
        >
          Add Lesson +
        </button>

        {/* <button
          onClick={() => {
            setEventType("practical");
            setModalOpen(true);
            setSelectedEvent(null);
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Ajouter une Sortie +
        </button> */}
      </div>

       {/* END ADD EVENT BUTTON   */}   


      {/* Start CALENDAR UI  */}
      <div className="grid grid-cols-7 ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold bg-primary text-white p-3 ">
            {day}
          </div>
        ))}

        {Array(daysInMonth[0].getDay())
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="border border-gray-300" />
          ))}

        {daysInMonth.map((date, index) => {
          const dayEvents = events.filter(
            (event) => new Date(event.date).toDateString() === date.toDateString()
          );
          return (
            // <div
            //   key={index}
            //   className="relative border border-gray-300 p-4 py-12 dark:text-white  hover:bg-gray-100 dark:hover:text-black cursor-pointer"
            //   onClick={() => handleDateClick(date)}
            // >
            //   <span className="font-bold">{date.getDate()}</span>
            //   {dayEvents.map((event, i) => (
            //     <div
            //       key={i}
            //       id={event.id} // Add this for scroll-to functionality
            //       className="mt-1 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600 cursor-pointer"
            //       onClick={(e) => {
            //         e.stopPropagation();
            //         handleEventClick(event);
            //       }}
            //     >
            //       <p>
            //         {event.type === "theoretical" ? "theoretical" : "practical"}:{event.date}
            //       </p>
            //       {/* {event.description} */}
            //     </div>
            //   ))}
            // </div>

        <div
          key={index}
          className="relative border border-gray-300 dark:border-gray-700 p-4 py-10 rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800 bg-white dark:bg-gray-900 cursor-pointer"
          onClick={() => handleDateClick(date)}
        >
          <span className="font-bold text-sm text-gray-800 dark:text-white">{date.getDate()}</span>
          
          {dayEvents.map((event, i) => (
            <div
              key={i}
              id={event.id}
              className="mt-2 w-24 h-12 p-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer flex items-center justify-center text-center"
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(event);
              }}
            >
              <p className="font-medium leading-tight">
                {/* TODO type lesson come from lesson  */}
                {/* {event.type === "theoretical" ? "📘" : "🔧"} {event.type?.charAt(0).toUpperCase() + event.type?.slice(1)} */}
                {"theoretical" === "theoretical" ? "📘" : "🔧"} {"theoretical"?.charAt(0).toUpperCase() + "theoretical"?.slice(1)}
                <br />
                {event.date}
              </p>
            </div>
          ))}
        </div>


          );
        })}
      </div>


      {/* END CALENDAR UI  */}  


      {/* Start MODAL UI  */}
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-99999 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-150 max-sm:w-100">
            {selectedEvent ? (
              <div className="">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Event Details</h2>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">ID:</strong> {selectedEvent.id}
                </p>

                {/* Determine Lesson Type */}
                {(() => {
                  const lesson = lessons.find(lesson => lesson.id === selectedEvent.lessonId);
                  return (
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-gray-900 dark:text-white">Type:</strong> {lesson ? lesson.lessonType : "Unknown"}
                    </p>
                  );
                })()}

                {/* Employee Full Name */}
                {(() => {
                  const employee = mockEmployees.find(emp => emp.id === selectedEvent.employee);
                  return (
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-gray-900 dark:text-white">Employee:</strong> {employee ? `${employee.firstname} ${employee.lastname}` : "Unknown"}
                    </p>
                  );
                })()}

                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Date:</strong> {new Date(selectedEvent.date).toDateString()}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Time:</strong> {selectedEvent.time}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Description:</strong> {selectedEvent.description}
                </p>

                {/* Button to View Participants (Navigate to Participation Page) */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => navigate(`/participation?eventId=${selectedEvent.id}&role=view`)}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                    // <button
                    // onClick={() => navigate(`/participation?eventId=${selectedEvent.id}&role=view`,{ state: {
                    //   eventId: selectedEvent.id,
                    //   role: 'view',
                    // } })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.586-4.586a2 2 0 112.828 2.828L15 13m0 0l-6 6m6-6L9 7" />
                    </svg>
                    View Participants
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600"
                  >
                    Close
                  </button>

                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
            </div>
            
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Add {eventType === "theoretical" ? "Course" : "Driving Session"}
                </h2>
            <div className="mb-2">
              <label>Course Type:</label>
              <div className="flex gap-4 mt-1">
                <label><input type="radio" name="type" value="theoretical" checked={eventType === "theoretical"} onChange={() => setEventType("theoretical")} /> Théorique</label>
                <label><input type="radio" name="type" value="practical" checked={eventType === "practical"} onChange={() => setEventType("practical")} /> Pratique</label>
              </div>
            </div>
            
            <div className="mb-2">
              <label>Instructeur/Moniteur:</label>
              <select name="employee" value={form.employee} onChange={handleInputChange} className="w-full border px-2 py-1">
                {mockEmployees.filter(emp => emp.type === (eventType === "theoretical" ? "instructor" : "monitor")).map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.firstname} {emp.lastname}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label>Leçon:</label>
              <select name="lessonId" value={form.lessonId} onChange={handleInputChange} className="w-full border px-2 py-1">
               
              {lessons
                .filter(lesson => lesson.lessonType === eventType) // Match type: practical/theoretical
                .map(lesson => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.lessonOrder} - {lesson.name}
                  </option>
                ))
              }
              </select>
            </div>

            <div className="mb-2">
              <label>Date:</label>
              <input type="date" name="date" value={form.date} onChange={handleInputChange} className="w-full border px-2 py-1" />
            </div>
            
            <div className="mb-2">
              <label>Heure:</label>
              <input type="time" name="time" value={form.time} onChange={handleInputChange} className="w-full border px-2 py-1" />
            </div>

            <div className="mb-2">
              <label>Description:</label>
              <input type="text" name="description" value={form.description} onChange={handleInputChange} className="w-full border px-2 py-1" />
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => setModalOpen(false)} className="mr-2 rounded bg-gray-500 px-4 py-2 text-white">Annuler</button>
              <button onClick={handleAddEvent} className="rounded bg-green-500 px-4 py-2 text-white">Ajouter</button>
            </div>
     
              </>
            )}
          </div>
        </div>
      )}


    {studentSelectionOpen && (
      <Participation/>
        )}

      {/* {isLoading && <Loader />} */}
    </>
  );
};

export default Calendar;
