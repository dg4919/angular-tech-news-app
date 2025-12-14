# Angular Tech News App

This is an Angular application that displays technical news updates similar to TechGig.com or MSN Tech News. The application features routing, lazy loading, and responsive design to enhance user experience.

## Features

- **Responsive Design**: The application is designed to work on various screen sizes, ensuring a seamless experience on both desktop and mobile devices.
- **Routing**: The application uses Angular's routing capabilities to navigate between different views, including news lists, news details, and categories.
- **Lazy Loading**: Modules are loaded on demand, improving the initial load time of the application.
- **Search Functionality**: Users can search for news articles using a dedicated search bar.
- **Error Handling**: Global error handling is implemented to provide user feedback in case of API errors.

## Project Structure

The project is organized into several key directories:

- **src/app**: Contains the main application logic, including components, services, and routing configurations.
- **src/assets/styles**: Contains global and responsive styles for the application.
- **src/environments**: Contains environment-specific configurations for development and production.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd angular-tech-news-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:4200` to view the application.

## API Integration

The application fetches news data from a specified API. Ensure to configure the API key and endpoints in the `src/environments/environment.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.