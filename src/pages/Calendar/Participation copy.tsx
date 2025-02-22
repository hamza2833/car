import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockStudents = Array.from({ length: 50 }, (_, i) => ({
  id: (201 + i).toString(),
  firstname: `Student${i + 1}`,
  lastname: "Lastname"
}));

const Participation = () => {
    // TODO : add restriction to this page only from calendar see somehow a condition ex:
    // add eventId as query param 
    // and check useeefect if there student redirect to calendar 

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockStudents.length / itemsPerPage);
  const navigate = useNavigate();

  const paginatedStudents = mockStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleValidateSelection = () => {
    console.log("Validated students for event:", selectedStudents);
    navigate("/calendar");
  };
  

  const handleCancelSelection = () => {
    console.log("Validated students for event:", selectedStudents);
    navigate("/calendar");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">Select Students ({selectedStudents.length} selected)</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 pl-4 text-start">First Name</th>
            <th className="p-2 text-start">Last Name</th>
            <th className="p-2">Validate</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map(student => (
            <tr key={student.id} className="border-t">
              <td className="p-2">{student.firstname}</td>
              <td className="p-2 ">{student.lastname}</td>
              <td className="p-2 text-center">
                <input 
                  type="checkbox" 
                  checked={selectedStudents.includes(student.id)} 
                  onChange={() => handleStudentSelect(student.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 border rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-3 py-1 border rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
     <div>
     <button onClick={handleCancelSelection} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Cancel</button>
     <button onClick={handleValidateSelection} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Validate</button>
     </div>
    </div>
  );
};

export default Participation;