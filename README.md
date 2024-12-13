# Student Management System

## Overview

The Student Management System is a web application designed to manage student records, specialties, and academic assignments. It allows users to add, modify, and track student information, manage available specialties, and view final results.

## Features

- **Student Management**: Add, modify, and delete student records.
- **Specialty Management**: Manage available specialties and their capacity.
- **Final Results**: View specialty assignments and final classifications.
- **Search Functionality**: Search for students and specialties by name or number.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: 
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Lucide React (for icons)
  - Axios (for API calls)

- **Backend**: 
  - Spring Boot (JAVA) see project here: https://github.com/yahiaboudah/studentmanager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yahiaboudah/studentreact.git
   cd studentreact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Home Page**: Displays an overview of the application and links to different sections.
- **Students Page**: Manage student records, including adding new students and editing existing ones.
- **Specialties Page**: Manage specialties available for students.
- **Results Page**: View the final results of students and their assigned specialties.

## API Endpoints

The application interacts with a backend API. Below are some of the key endpoints:

- `GET /api/student`: Fetch all students.
- `POST /api/student`: Create a new student.
- `PUT /api/student/:id`: Update an existing student.
- `DELETE /api/student/:id`: Delete a student.
- `GET /api/spec`: Fetch all specialties.
- `POST /api/spec`: Create a new specialty.
- `PUT /api/spec/:id`: Update an existing specialty.
- `DELETE /api/spec/:id`: Delete a specialty.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- Thanks to the teacher for giving out this assignment
