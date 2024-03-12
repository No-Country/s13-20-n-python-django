![](https://i.postimg.cc/WpYdsSKK/logo-banner.png)

# Introducing Tabula, the ultimate solution for seamless project management and collaboration.

_With Tabula, you can effortlessly organize tasks, streamline workflows, and boost productivity like never before._

Say goodbye to scattered to-do lists and chaotic email threads. Tabula's intuitive interface empowers teams to visualize their projects, prioritize tasks, and track progress in real-time. With customizable boards, lists, and cards, you have the flexibility to adapt Tabula to fit your unique workflow. Plus, our advanced features like drag-and-drop functionality, robust authorization controls, and stunning theming options ensure that your team stays focused and motivated every step of the way.

Experience the power of Tabula and revolutionize the way you work together. Try it today and unlock the full potential of your projects.

[![Watch the video](https://img.youtube.com/vi/6P7io74z554/hqdefault.jpg)](https://youtu.be/6P7io74z554)

## Features ✨

1. **Kanban Board:** Organize tasks into customizable boards, lists, and cards.
   Easily move cards between lists using drag and drop functionality.
   Visualize the workflow of your projects.

2. **Authorization:** Secure user authentication and authorization.
   Control access to boards and cards based on user roles and permissions.

3. **Drag and Drop:** Intuitive drag and drop interface for effortless task management.
   Move cards between lists with a simple drag action.

4. **Theming:** Customize the look and feel of the application with built-in theming options.

## How to Deploy Locally 💻

### Backend

- Clone the repository containing the Django project `git clone https://github.com/No-Country/s13-20-n-python-django.git`

- Navigate to the backend directory `cd .\backend\`
- Create a virtual enviroment. If is not already installed, install virtualenv:
  `pip install virtualenv`

- To use venv in your project, in your terminal, run the following command (make sure you are inside the _backend_ folder): `python<version> -m venv <virtual-environment-name>`

- Activate the virtual environment

  - On Windows: `/<virtual-environment-name>/Scripts/activate.bat` for cmd and `/<virtual-environment-name>/Scripts/Activate.ps1` for PowerShell.
  - On Unix: `source env/bin/activate`

- Install dependencies using `pip install -r requirements.txt`

- Set up the database by running migrations: `python manage.py migrate`

- Create a superuser: `python manage.py createsuperuser`

- Start the Django server: `python manage.py runserver`

You should be able to see the Django server in `http://localhost:8000`

### Frontend

- Navigate to the frontend directory: `cd .\frontend\`

- Install dependencies using npm install: `npm install`

- Start the development server: `npm start`

The npm server will be located at `http://localhost:5173`

## Built with 🛠️

![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Redux](https://img.shields.io/badge/Redux_Toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Poetry](https://img.shields.io/badge/Poetry-%233B82F6.svg?style=for-the-badge&logo=poetry&logoColor=0B3D8D) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
