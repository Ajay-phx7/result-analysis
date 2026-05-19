import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layout/DashboardLayout";

function TeacherDashboard() {

  const [subjectData, setSubjectData] =
    useState({
      subjectName: "",
      subjectCode: "",
      credits: "",
      semester: ""
    });

  const [markData, setMarkData] =
    useState({
      studentId: "",
      subjectId: "",
      internalMarks: "",
      externalMarks: ""
    });

  const [subjects, setSubjects] =
  useState([]);

const [search, setSearch] =
  useState("");

  useEffect(() => {

    fetchSubjects();

  }, []);

  const fetchSubjects = async () => {

    try {

      const response =
        await API.get("/subjects");

      setSubjects(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const createSubject = async () => {

    try {

      await API.post(
        "/subjects/create",
        subjectData
      );

      alert("Subject Created");

      setSubjectData({
        subjectName: "",
        subjectCode: "",
        credits: "",
        semester: ""
      });

      fetchSubjects();

    } catch (error) {

      alert("Error creating subject");

    }
  };

  const uploadMarks = async () => {

    try {

      await API.post(
        "/marks/upload",
        {
          ...markData,
          studentId:
            parseInt(markData.studentId),

          subjectId:
            parseInt(markData.subjectId),

          internalMarks:
            parseInt(markData.internalMarks),

          externalMarks:
            parseInt(markData.externalMarks)
        }
      );

      alert("Marks Uploaded");

      setMarkData({
        studentId: "",
        subjectId: "",
        internalMarks: "",
        externalMarks: ""
      });

    } catch (error) {

      alert("Error uploading marks");

    }
  };

  return (

    <DashboardLayout role="teacher">

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            Subjects
          </h2>

          <p className="text-4xl font-bold mt-2">
            {subjects.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            Total Uploads
          </h2>

          <p className="text-4xl font-bold mt-2">
            --
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            Pass Rate
          </h2>

          <p className="text-4xl font-bold mt-2">
            92%
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Create Subject
          </h2>

          <input
            placeholder="Subject Name"
            value={subjectData.subjectName}
            className="w-full border p-3 rounded-lg mb-3"
            onChange={(e) =>
              setSubjectData({
                ...subjectData,
                subjectName: e.target.value
              })
            }
          />

          <input
            placeholder="Subject Code"
            value={subjectData.subjectCode}
            className="w-full border p-3 rounded-lg mb-3"
            onChange={(e) =>
              setSubjectData({
                ...subjectData,
                subjectCode: e.target.value
              })
            }
          />

          <input
            placeholder="Credits"
            value={subjectData.credits}
            className="w-full border p-3 rounded-lg mb-3"
            onChange={(e) =>
              setSubjectData({
                ...subjectData,
                credits:
                  e.target.value
              })
            }
          />

          <input
            placeholder="Semester"
            value={subjectData.semester}
            className="w-full border p-3 rounded-lg mb-4"
            onChange={(e) =>
              setSubjectData({
                ...subjectData,
                semester:
                  e.target.value
              })
            }
          />

          <button
            onClick={createSubject}
            className="bg-black hover:bg-gray-800 transition text-white px-6 py-3 rounded-lg"
          >
            Create Subject
          </button>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Upload Marks
          </h2>

          <input
            placeholder="Student ID"
            value={markData.studentId}
            className="w-full border p-3 rounded-lg mb-3"
            onChange={(e) =>
              setMarkData({
                ...markData,
                studentId: e.target.value
              })
            }
          />

          <select
            className="w-full border p-3 rounded-lg mb-3"
            value={markData.subjectId}
            onChange={(e) =>
              setMarkData({
                ...markData,
                subjectId: e.target.value
              })
            }
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (

              <option
                key={subject.id}
                value={subject.id}
              >

                {subject.subjectName}

              </option>

            ))}

          </select>

          <input
            placeholder="Internal Marks"
            value={markData.internalMarks}
            className="w-full border p-3 rounded-lg mb-3"
            onChange={(e) =>
              setMarkData({
                ...markData,
                internalMarks:
                  e.target.value
              })
            }
          />

          <input
            placeholder="External Marks"
            value={markData.externalMarks}
            className="w-full border p-3 rounded-lg mb-4"
            onChange={(e) =>
              setMarkData({
                ...markData,
                externalMarks:
                  e.target.value
              })
            }
          />

          <button
            onClick={uploadMarks}
            className="bg-black hover:bg-gray-800 transition text-white px-6 py-3 rounded-lg"
          >
            Upload Marks
          </button>

        </div>

      </div>
      <div className="mb-4">

  <input
    placeholder="Search Subjects..."
    className="border p-3 rounded-lg w-full"
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Subjects
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">
                Subject
              </th>

              <th>
                Code
              </th>

              <th>
                Credits
              </th>

              <th>
                Semester
              </th>

            </tr>

          </thead>

          <tbody>

  {subjects.length === 0 && (

    <tr>

      <td
        colSpan="4"
        className="text-center py-6 text-gray-500"
      >

        No Subjects Created

      </td>

    </tr>

  )}

            {subjects.filter((subject) =>
    subject.subjectName
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((subject) => (

              <tr
                key={subject.id}
                className="border-b"
              >

                <td className="py-3">
                  {subject.subjectName}
                </td>

                <td>
                  {subject.subjectCode}
                </td>

                <td>
                  {subject.credits}
                </td>

                <td>
                  {subject.semester}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default TeacherDashboard;