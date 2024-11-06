# Pokémon API Backend


## Table of Contents
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Folder Structure Explanation](#folder-structure-explanation)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

---

## Technology Stack

- **NestJS**: A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
- **TypeScript**: Used for type safety and code maintainability.
- **ESLint and Prettier**: For code quality and consistency.

NestJS was chosen for its modular architecture and ability to handle complex server-side logic, making it ideal for building RESTful APIs in a scalable and structured manner. TypeScript enhances code maintainability and reduces runtime errors, while ESLint and Prettier provide standardized code quality and style.

## Project Structure

The project is organized into distinct modules to promote modularity and separation of concerns. Below is the folder structure:

```plaintext
- src
  - modules
    - pokemon
      - dtos
        - ability.dto.ts
        - move.dto.ts
        - named-api-resource.dto.ts
        - pokemon.dto.ts
        - stat.dto.ts
        - type.dto.ts
        - version-group-detail.dto.ts
      - pokemon.controller.ts
      - pokemon.module.ts
      - pokemon.service.ts
  - app.controller.spec.ts
  - app.controller.ts
  - app.module.ts
  - app.service.ts
  - main.ts
- .eslintrc.js
- .gitignore
- .prettierrc
- nest-cli.json
- package.json
- README.md
- tsconfig.json
- tsconfig.build.json
- yarn.lock
```

## Folder Structure Explanation

### `src/modules`

Contains all feature modules of the application. Each module encapsulates related files for a specific feature or domain.

- **pokemon**: This module is dedicated to Pokémon-related functionality. It follows NestJS's convention of separating concerns into `controller`, `service`, and `DTOs`.
    - **dtos**: Data Transfer Objects (DTOs) define the shape and validation rules for data transferred between client and server. Each file in this folder represents a different aspect of Pokémon data:
        - **ability.dto.ts**: Defines the structure of an ability object.
        - **move.dto.ts**: Defines the structure of a move object.
        - **pokemon.dto.ts**: Primary DTO representing a Pokémon, aggregating other DTOs as needed.
        - **stat.dto.ts, type.dto.ts, version-group-detail.dto.ts**: Represent other data structures related to Pokémon.
    - **pokemon.controller.ts**: Defines the API endpoints for Pokémon-related operations, handling HTTP requests and responses.
    - **pokemon.service.ts**: Contains the business logic for Pokémon-related data, including data retrieval and processing.
    - **pokemon.module.ts**: NestJS module that consolidates the Pokémon controller, service, and DTOs, allowing the Pokémon functionality to be easily imported into the root module.

### `src/app.controller.ts` and `src/app.service.ts`

- **app.controller.ts**: The main application controller, handling general endpoints or health checks.
- **app.service.ts**: Contains reusable logic for general application tasks, such as health checks.

### `src/app.module.ts`

- **app.module.ts**: The root module of the application. This file imports all other modules (such as `PokemonModule`) and provides global configuration. NestJS uses this file to build the dependency injection tree.

### `src/main.ts`

- **main.ts**: The entry point of the application. It initializes the NestJS application, applies global middleware, and listens for incoming HTTP requests. Here, you can set up global configurations, such as global pipes, interceptors, and exception filters.

### Root Files

- **.eslintrc.js** and **.prettierrc**: Configuration files for ESLint and Prettier, ensuring code consistency and quality across the codebase.
- **nest-cli.json**: Nest CLI configuration file, defining the entry points and compilation settings.
- **tsconfig.json** and **tsconfig.build.json**: TypeScript configuration files that specify compiler options for development and production builds.

## Features

- **Modular Design**: The project is organized into individual modules, each encapsulating related functionality, making the application easy to extend and maintain.
- **DTO-based Data Validation**: All API endpoints enforce data validation using DTOs, ensuring data consistency and type safety.
- **Pokemon API**: Provides endpoints to retrieve various Pokémon data, such as abilities, types, moves, and stats.
- **Scalable Architecture**: Designed to allow new modules and features to be added with minimal refactoring.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd pokemon-backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the application:
   ```bash
   yarn start:dev
   ```

## Usage

- **GET /pokemon/:id**: Retrieve detailed data for a specific Pokémon by its ID.
- **GET /pokemon**: Retrieve a paginated list of all available Pokémon.
- **Health Check**: The root endpoint provides a basic health check for the API.

---

This backend was designed with modularity and scalability in mind, making it easy to expand with additional modules or API endpoints as needed. It follows NestJS best practices for structuring code, handling dependencies.