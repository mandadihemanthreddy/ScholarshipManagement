// src/pages/HowToApplyPage.js
import React from 'react';

const HowToApplyPage = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('https://koret.org/wp-content/uploads/2021/03/shutterstock_1715508049-scaled-e1614810341872.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)', // Apply blur effect
          zIndex: -1, // Send background behind content
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          color: 'yellow',
          textShadow: '1px 1px 2px black',
          zIndex: 1,
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>How to Apply</h1>
        <ul
          style={{
            textAlign: 'left',
            maxWidth: '600px',
            listStyleType: 'disc',
            paddingLeft: '20px',
            fontSize: '1.2rem', // Increased font size for list items
            lineHeight: '1.2', // Improved readability
          }}
        >
          <li>
            <strong>Research Scholarships:</strong> Look for scholarships that align with your profile, such as academic achievements, talents, or community involvement. Use online portals, university websites, and local organizations to identify scholarships.
          </li>
          <li>
            <strong>Understand the Requirements:</strong> Read the eligibility criteria carefully (e.g., academic performance, age, nationality, etc.). Note the documents required (e.g., transcripts, recommendation letters, essays).
          </li>
          <li>
            <strong>Prepare Your Documents:</strong> Gather academic transcripts, test scores, and other required paperwork. If financial proof is required, collect income statements or tax returns.
          </li>
          <li>
            <strong>Write a Strong Application:</strong> Tailor your application to highlight why you deserve the scholarship. Focus on achievements, goals, and how the scholarship will help you.
          </li>
          <li>
            <strong>Request Letters of Recommendation:</strong> Ask teachers, mentors, or supervisors for recommendations well in advance. Provide them with information about the scholarship and your goals.
          </li>
          <li>
            <strong>Proofread Your Application:</strong> Check for spelling and grammatical errors. Ensure your application aligns with the scholarship's theme and requirements.
          </li>
          <li>
            <strong>Submit Before the Deadline:</strong> Double-check all materials and ensure they are complete. Submit your application well ahead of the deadline to avoid last-minute issues.
          </li>
        </ul>
        <button
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            backgroundColor: '#ffcc00',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => alert('Button Clicked!')}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HowToApplyPage;