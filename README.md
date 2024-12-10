
# ft_transcendence

**ft_transcendence** is a project developed as part of the 42 coding school curriculum. This application delivers a fully functional multiplayer online Pong game built with modern web development practices and a secure, robust backend.

## Demo Video

[![Demo Video](https://github.com/42-team-projects/ft_transcendence/blob/main/frontend/images/Profile%20Page.png)](https://www.youtube.com/watch?v=bXRbh0gd8fU)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Using Docker Compose](#using-docker-compose)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About the Project

**ft_transcendence** reimagines the classic Pong game experience with a modern twist. This project focuses on delivering an engaging multiplayer experience while maintaining high standards in code quality, security, and user experience.

---

## Features

- 🎮 **Real-time Multiplayer:** Play competitive Pong matches with friends or other players.
- 🔒 **Secure Authentication:** Login system with support for Two-Factor Authentication (2FA).
- 💬 **Chat System:** Built-in real-time private and group messaging.
- 🏆 **Leaderboards:** Track player performance and rankings.
- 🖼 **User Profiles:** Customize profiles and view game statistics.
- ⚙️ **Settings:** Personalize game and account settings.

---

## Technologies Used

### Front-End
- Vanilla JavaScript - For dynamic user interactions.
- HTML/CSS - For structuring and styling the interface.

### Back-End
- Django - Python framework for developing secure, scalable applications.
- PostgreSQL - Database system for storing game data.

### Other Tools
- Docker - For containerized deployment.
- WebSockets - Facilitates real-time gameplay and chat.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:
- [Python 3.9+](https://www.python.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/42-team-projects/ft_transcendence.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ft_transcendence
   ```

---

### Running the Application

#### Using Docker Compose

To start the project, simply run the following command:

  ```bash
  docker compose up --build
  ```

This command will build the Docker containers and start the application. The backend and frontend will be automatically set up and available for access.

The application will be accessible at `https://localhost`.


---

## Usage

1. **Sign Up:** Create an account or log in with existing credentials.
2. **Play a Match:** Challenge players in real-time Pong games.
3. **Socialize:** Chat with friends or other players using the messaging system.
4. **Track Progress:** View stats and rankings on the leaderboard.

---

## Screenshots

_Add screenshots of the application in action here._

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your branch.
4. Submit a pull request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**ft_transcendence Team**  
For any inquiries or feedback, feel free to open an issue in the repository.

---

We hope you enjoy the application and look forward to your contributions or feedback to make **ft_transcendence** even better! 🚀
