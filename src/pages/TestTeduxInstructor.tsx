import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchInstructors, deleteInstructor } from '../store/thunks/instructorThunks';
import { Instructor } from '../types/instructor';

const TestTeduxInstructor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { instructors, isLoading } = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Instructors</h1>
      <ul>
        {instructors.map((instructor : Instructor) => (
          <li key={instructor.id}>
            {instructor.name} - {instructor.email}
            <button onClick={() => dispatch(deleteInstructor(instructor.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestTeduxInstructor;
