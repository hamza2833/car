import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// TODO
// import { validateEventParticipants } from "../store/thunks/participationThunks";
import { AppDispatch } from "../../store/store";

interface Student {
  id: string;
  name: string;
}

interface Props {
  students: Student[];
  eventId: string;
  closeModal: () => void;
}

const StudentSelectionModal: React.FC<Props> = ({ students, eventId, closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleValidateStudents = async () => {
    try {
    //   await dispatch(validateEventParticipants({ eventId, studentIds: selectedStudents }));
      closeModal();
    } catch (error) {
      console.error("Error validating students:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4">
        <h2 className="text-lg font-bold mb-4">Sélectionner les Étudiants</h2>
        
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Sélection</th>
              <th className="p-2">ID Étudiant</th>
              <th className="p-2">Nom</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelection(student.id)}
                  />
                </td>
                <td className="p-2">{student.id}</td>
                <td className="p-2">{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Précédent
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Suivant
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="mr-2 bg-gray-500 px-4 py-2 text-white rounded">
            Annuler
          </button>
          <button
            onClick={handleValidateStudents}
            className="bg-green-500 px-4 py-2 text-white rounded"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectionModal;
