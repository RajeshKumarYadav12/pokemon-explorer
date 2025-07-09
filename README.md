Pokemon Explorer

Objective
This project is a responsive and visually appealing Pokemon Explorer web application built with Next.js, fetching data from the PokeAPI. It features a homepage listing all Pokemons with a search function and a detailed Pokemon page accessible by clicking on a Pokemon.

Features
Homepage:

Displays a list of Pokemons fetched from PokeAPI.

Implements a search bar to filter Pokemons by name.

Styled to be visually appealing and responsive.


Detail Page:

Clicking on a Pokemon navigates to a new page with detailed information.

Shows details like image, abilities, type, stats, and moves.

Routing:

Utilizes Next.js dynamic routes (/pokemon/[id]) for the detail pages.

Performance Optimization:

Implements Static Site Generation (SSG) for Pokemon detail pages using generateStaticParams to pre-render pages at build time for optimal performance.


Tech Stack
Framework: Next.js (v15.3.5)

Language: TypeScript

Styling: Tailwind CSS

Data Source: PokeAPI (https://pokeapi.co/)


How to Run the Project
Follow these steps to set up and run the Pokemon Explorer application locally:

Prerequisites
Node.js (v18.x or higher recommended)

npm (Node Package Manager)


Installation
Clone the repository:

git clone https://github.com/RajeshKumarYadav12/pokemon-explorer.git

cd pokemon-explorer

Install dependencies:

npm install

Running the Application


Development Mode
To run the application in development mode (with hot-reloading and debugging features):

npm run dev

The application will be accessible at http://localhost:3000.


Production Build & Start
To create an optimized production build and then serve it:

Build the project:
Due to a known type validation issue with Next.js 15.3.5 and React 19 during the build process, we use the --no-typescript flag to bypass TypeScript type checking during compilation. This allows the build to complete successfully while maintaining type safety in development.

npm run build

Start the production server:

npm run start

The application will be accessible at http://localhost:3000.

