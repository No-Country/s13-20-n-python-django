### Download Python

Go to [python.org/downloads](https://www.python.org/downloads/)

### Install

Don't forget to check ✅ `Add python.exe to PATH`
![python installer](https://res.cloudinary.com/dzc8agefr/image/upload/v1696907584/1_efwa83.png)

![python installer](https://res.cloudinary.com/dzc8agefr/image/upload/v1696907584/2_vtuyh3.png)

### Clone git repository

1. Clone the repository by running the following command in your terminal
   `git clone https://github.com/No-Country/s13-20-n-python-django.git`
2. After cloning the repository, navigate to the project's directory:
   `cd s13-20-n-python-django/`

### Create and activate a virtual environment

1. Move to **backen** folder
   `cd ../backend`
2. Create virtual environment
   `python3 -m venv env`
3. Activate virtual environment
   Mac: `source ./env/bin/activate`
   Windows: `.\env\Script\activate`
4. Install all the dependencies
   `pip install -r requirements.txt`

### Create data base and run server

1. `python manage.py makemigrations`

2. `python manage.py migrate`

3. `python manage.py runserver`
