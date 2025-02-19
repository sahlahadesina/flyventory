1. Enter the environment through powershell using: env\Scripts\Activate
   If it gives an error run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   Then run the command again.
2. Once in the environment enter backend folder using: cd .\backend\
3. If any changes made to backend make sure to run migrations:
   python manage.py makemigrations
   Then:
   python manage.py migrate
4. To run the backend do: python manage.py runserver
