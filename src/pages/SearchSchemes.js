import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchSchemes = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch all scholarships once on component mount
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/scholarships")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setScholarships(response.data);
                    setFilteredScholarships(response.data);  // Initially display all scholarships
                } else {
                    setErrorMessage("Error: Scholarships data is not in the correct format.");
                }
            })
            .catch((error) => {
                setErrorMessage("Error fetching scholarships: " + error.message);
            });
    }, []);

    // Filter scholarships based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = scholarships.filter((scholarship) => {
                // Ensure that the scholarship name and description are valid strings
                const name = scholarship.name ? scholarship.name.toLowerCase() : '';
                const description = scholarship.description ? scholarship.description.toLowerCase() : '';
                return name.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
            });
            setFilteredScholarships(filtered);
        } else {
            setFilteredScholarships(scholarships);  // Show all scholarships if no search query
        }
    }, [searchQuery, scholarships]);

    return (
        <div>
            <h3>Search Scholarships</h3>
            <input
                type="text"
                placeholder="Search for a scholarship..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div>
                {filteredScholarships.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScholarships.map((scholarship) => (
                                <tr key={scholarship.id}>
                                    <td>{scholarship.name}</td>
                                    <td>{scholarship.description}</td>
                                    <td>${scholarship.amount}</td>
                                    <td>
                                        <button>Apply</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No scholarships found</p>
                )}
            </div>
        </div>
    );
};

export default SearchSchemes;
