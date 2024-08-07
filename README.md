# Netflix Clone

## Overview

This is a full-stack clone of Netflix that replicates the homepage design with features such as watch lists, favorites, and user management.

## Technologies Used

-   **Next.js / React**: For building the user interface and managing state.
-   **TypeScript**: For type safety and improved development experience.
-   **React Icons**: For including a variety of icons.
-   **TailwindCSS**: For styling the application with utility-first CSS.
-   **MongoDB / Mongo Atlas**: For database management and hosting.
-   **Prisma**: For database schema management and queries.
-   **NextAuth**: For authentication and user management.

## Features

-   **Watch List**: Users can add movies and shows to their watch list.
-   **Favorites**: Users can mark their favorite content.
-   **Watch Movie**: Users can watch movies in their database with a Netflix interface.
-   **User Accounts**: Simple User registration and login, with option of Google and Github SSO.

## Screenshots

_(Add some screenshots or GIFs of your application here to showcase its appearance and features.)_

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
npm install
```

## Usage

After installing the dependencies, start the development server:

```bash
npm run dev
```

## Useful Links

-   https://cloud.mongodb.com/ (create a db to link in your env file)
-   https://console.cloud.google.com/ (set urls to Google Cloud Console -> API & Services -> Credentials -> + CREATE CREDENTIALS -> Oauth Client ID -> Web App -> Authorized redirect URIs -> ADD https://localhost:3000/api/auth/callback/google -> populate .env with secrets)
-   https://github.com/settings/developers (Oauth Apps -> Create -> Set urls to http://localhost:3000 -> populate .env with secrets)

Once you are finished, open http://localhost:3000 in your browser to see the application in action.

## License

This project is a clone and is licensed under the MIT License.
