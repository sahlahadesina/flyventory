# Setting Up the Backend Environment

1. **Enter the environment through PowerShell using:**
    ```sh
    env\Scripts\Activate
    ```

2. **If it gives an error, run the following command:**
    ```sh
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

3. **Then, run the first command again:**
    ```sh
    env\Scripts\Activate
    ```
## Navigating to the Backend Folder

4. **Once in the environment, navigate to the `backend` folder using:**
    ```sh
    cd .\backend\
    ```
## Installing requirements

5.  **Once in the backend folder install the requirements.txt**
    ```sh
     pip install -r requirements.txt
     ```

## Running Migrations

5. **If any changes are made to the backend, make sure to run migrations:**
    ```sh
    python manage.py makemigrations
    ```

6. **Then, apply the migrations:**
    ```sh
    python manage.py migrate
    ```

## Running the Backend

7. **To run the backend, use the following command:**
    ```sh
    python manage.py runserver
    ```
