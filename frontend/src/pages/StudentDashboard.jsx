import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layout/DashboardLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

function StudentDashboard() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("current");

  const [showSemesterModal, setShowSemesterModal] =
    useState(false);

  const [selectedSemester, setSelectedSemester] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const response =
        await API.get(
          `/dashboard/student/${user.id}`
        );

      setData(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleViewSemester = (semester) => {
    setSelectedSemester(semester);
    setShowSemesterModal(true);
  };

  const closeModal = () => {
    setShowSemesterModal(false);
    setSelectedSemester(null);
  };

  if (loading) {

    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  if (!data) {

    return (
      <div className="p-10">
        No Data Found
      </div>
    );
  }

  const totalSubjects =
    data.marks.length;

  const passedSubjects =
    data.marks.filter(
      (m) => m.grade !== "F"
    ).length;

  const chartData =
    data.marks.map((mark) => ({
      name:
        mark.subject.subjectName,
      marks:
        mark.total
    }));

  const semesterChartData =
    data.semesterData.map((sem) => ({
      semester: `Sem ${sem.semester}`,
      spga: parseFloat(sem.spga)
    }));

  const currentSemesterData = data.semesterData.find(s => s.semester === data.currentSemester);

  return (

    <DashboardLayout role="student">

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            CGPA
          </h2>

          <p className="text-4xl font-bold mt-2">
            {data.cgpa}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            Current SPGA
          </h2>

          <p className="text-4xl font-bold mt-2">
            {currentSemesterData && currentSemesterData.marks.filter(m => m.grade !== "F").length === currentSemesterData.marks.length
              ? currentSemesterData.spga
              : "Failed Subjects"}
          </p>

          {data.hasFailedSubjects && (
            <p className="text-red-600 text-sm mt-2 font-semibold">
              ⚠️ {data.failedSubjects.length} Subject(s) Failed
            </p>
          )}

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500">
            Passed/Total
          </h2>

          <p className="text-4xl font-bold mt-2">
            {passedSubjects}/{totalSubjects}
          </p>

        </div>

      </div>

      {data.hasFailedSubjects && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
          <h3 className="text-red-800 font-bold mb-2">❌ Failed Subjects:</h3>
          <div className="space-y-1">
            {data.failedSubjects.map((mark) => (
              <p key={mark.id} className="text-red-700">
                • {mark.subject.subjectName} (Total: {mark.total}/100) - Semester {mark.subject.semester}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Academic Performance
        </h2>

        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-3 px-4 ${activeTab === "current" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
          >
            Current Semester
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 px-4 ${activeTab === "history" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
          >
            Performance History
          </button>
        </div>

        {activeTab === "current" && (
          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="marks" fill="#3b82f6" />

              </BarChart>

            </ResponsiveContainer>

          </div>
        )}

        {activeTab === "history" && (
          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={semesterChartData}>

                <XAxis dataKey="semester" />

                <YAxis domain={[0, 10]} />

                <Tooltip />

                <Line 
                  type="monotone" 
                  dataKey="spga" 
                  stroke="#3b82f6"
                  strokeWidth={2}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>
        )}

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Semester Performance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.semesterData.map((sem) => {
            const hasFailed = sem.marks.some(m => m.grade === "F");
            return (
              <div key={sem.semester} className={`border rounded-lg p-4 ${hasFailed ? "bg-red-50 border-red-300" : "bg-gray-50"}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">
                    Semester {sem.semester}
                  </h3>
                  {sem.semester < data.currentSemester && (
                    <button
                      onClick={() => handleViewSemester(sem)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      View
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-600">SPGA: </span>
                    <span className={`font-bold text-lg ${hasFailed ? "text-red-600" : "text-green-600"}`}>
                      {hasFailed ? "Failed" : sem.spga}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Subjects: </span>
                    <span className="font-semibold">{sem.marks.length}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Credits: </span>
                    <span className="font-semibold">{sem.totalCredits}</span>
                  </p>
                  {hasFailed && (
                    <p className="text-red-600 text-sm font-semibold">
                      ❌ {sem.marks.filter(m => m.grade === "F").length} Failed
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">

        <h2 className="text-xl font-semibold mb-2">
          Student Information
        </h2>

        <p>
          Name: {data.student.name}
        </p>

        <p>
          Roll No: {data.student.rollNo}
        </p>

        <p>
          Department:
          {" "}
          {data.student.department}
        </p>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Current Semester Results
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">
                Subject
              </th>

              <th>
                Internal
              </th>

              <th>
                External
              </th>

              <th>
                Total
              </th>

              <th>
                Grade
              </th>

            </tr>

          </thead>

          <tbody>

            {data.marks.map((mark) => (

              <tr
                key={mark.id}
                className={`border-b ${mark.grade === "F" ? "bg-red-50" : ""}`}
              >

                <td className="py-3">
                  {mark.subject.subjectName}
                </td>

                <td>
                  {mark.internalMarks}
                </td>

                <td>
                  {mark.externalMarks}
                </td>

                <td>
                  {mark.total}
                </td>

                <td>
                  <span className={`px-3 py-1 rounded font-semibold ${
                    mark.grade === "A+" ? "bg-green-100 text-green-800" :
                    mark.grade === "A" ? "bg-green-50 text-green-700" :
                    mark.grade === "B" ? "bg-blue-100 text-blue-800" :
                    mark.grade === "C" ? "bg-yellow-100 text-yellow-800" :
                    mark.grade === "D" ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {mark.grade === "F" ? "❌ " + mark.grade : mark.grade}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Semester Detail Modal */}
      {showSemesterModal && selectedSemester && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Semester {selectedSemester.semester} - Detailed Report
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">SPGA</p>
                  <p className={`text-2xl font-bold ${selectedSemester.marks.some(m => m.grade === "F") ? "text-red-600" : "text-green-600"}`}>
                    {selectedSemester.marks.some(m => m.grade === "F") ? "Failed" : selectedSemester.spga}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Total Credits</p>
                  <p className="text-2xl font-bold">{selectedSemester.totalCredits}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Subjects</p>
                  <p className="text-2xl font-bold">{selectedSemester.marks.length}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Subject Breakdown:</h3>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Subject</th>
                    <th>Internal</th>
                    <th>External</th>
                    <th>Total</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSemester.marks.map((mark) => (
                    <tr key={mark.id} className={`border-b ${mark.grade === "F" ? "bg-red-50" : ""}`}>
                      <td className="py-2">{mark.subject.subjectName}</td>
                      <td>{mark.internalMarks}</td>
                      <td>{mark.externalMarks}</td>
                      <td className="font-semibold">{mark.total}</td>
                      <td>
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${
                          mark.grade === "A+" ? "bg-green-100 text-green-800" :
                          mark.grade === "A" ? "bg-green-50 text-green-700" :
                          mark.grade === "B" ? "bg-blue-100 text-blue-800" :
                          mark.grade === "C" ? "bg-yellow-100 text-yellow-800" :
                          mark.grade === "D" ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {mark.grade === "F" ? "❌ " + mark.grade : mark.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={closeModal}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default StudentDashboard;
