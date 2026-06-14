from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

import requests

app = FastAPI()

# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

SPRING_BOOT_URL = "http://localhost:8080"

# =========================
# GET USERS
# =========================

@app.get("/api/users")

def get_users():

    response = requests.get(

        f"{SPRING_BOOT_URL}/api/users"

    )

    return response.json()

# =========================
# GET TASKS
# =========================

@app.get("/api/tasks")

def get_tasks():

    response = requests.get(

        f"{SPRING_BOOT_URL}/api/tasks"

    )

    return response.json()

# =========================
# CREATE TASK
# =========================

@app.post("/api/tasks")

def create_task(data: dict):

    response = requests.post(

        f"{SPRING_BOOT_URL}/api/tasks",

        json=data

    )

    return response.json()

# =========================
# DELETE TASK
# =========================

@app.delete("/api/tasks/{id}")

def delete_task(id:int):

    response = requests.delete(

        f"{SPRING_BOOT_URL}/api/tasks/{id}"

    )

    return response.text

# =========================
# UPDATE TASK STATUS
# =========================

@app.put("/api/tasks/{id}/status")

def update_task_status(id:int,data:dict):

    response = requests.put(

        f"{SPRING_BOOT_URL}/api/tasks/{id}/status",

        json=data

    )

    return response.json()

# =========================
# LOGIN
# =========================

@app.post("/api/login")

def login_user(data: dict):

    response = requests.post(

        f"{SPRING_BOOT_URL}/api/users/login",

        json=data

    )

    return response.json()
@app.post("/api/users")
def create_user(data: dict):

    response = requests.post(
        f"{SPRING_BOOT_URL}/api/users",
        json=data
    )

    return response.json()


@app.get("/api/users/{id}")
def get_user(id: int):

    response = requests.get(
        f"{SPRING_BOOT_URL}/api/users/{id}"
    )

    return response.json()


@app.put("/api/users/{id}")
def update_user(id: int, data: dict):

    response = requests.put(
        f"{SPRING_BOOT_URL}/api/users/{id}",
        json=data
    )

    return response.json()


@app.get("/api/tasks/{id}")
def get_task(id: int):

    response = requests.get(
        f"{SPRING_BOOT_URL}/api/tasks/{id}"
    )

    return response.json()


@app.put("/api/tasks/{id}")
def update_task(id: int, data: dict):

    response = requests.put(
        f"{SPRING_BOOT_URL}/api/tasks/{id}",
        json=data
    )

    return response.json()    