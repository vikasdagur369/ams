"use client";

import { useState, useEffect } from "react";

export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);
  const yearToShow = "2022"; // Change this to display a different year

  useEffect(() => {
    fetch("/alumni.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data:", data); // Check the data structure
        const filtered = data.filter(
          (person) => person["Year_of_Passing"] === yearToShow
        );
        console.log("Filtered data:", filtered); // Check filtered results
        console.log("Year to show:", yearToShow); // Check the filter value
        setAlumni(filtered);
      })
      .catch((error) => console.error("Error:", error)); // Add error handling
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Alumni of {yearToShow}
      </h1>

      {alumni.length === 0 ? (
        <p className="text-center text-gray-500">
          No alumni found for {yearToShow}.
        </p>
      ) : (
        <div className="space-y-4">
          {alumni.map((person, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{person.Name}</h3>
              <p className="text-gray-600">🎓 {person.Branch}</p>
              <p className="text-gray-600">📍 {person.Location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
