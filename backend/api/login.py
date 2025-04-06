from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee

class EmployeeLoginView(APIView):
    def post(self, request):
        username = request.data.get("username") or request.data.get("Username")
        password = request.data.get("password") or request.data.get("Password")

        print("Login attempt:")
        print(f"Received Username: {username}")
        print(f"Received Password: {password}")

        try:
            user = Employee.objects.get(Username=username)
            print(f"Found user in DB: {user.Username} (Expected Password: {user.Password})")

            if user.Password == password:
                print("Password matched. Login successful.")
                return Response({
                    "user": {
                        "username": user.Username,
                        "role": user.Role,
                    }
                }, status=status.HTTP_200_OK)
            else:
                print("Password did not match.")
                return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
        except Employee.DoesNotExist:
            print("Username not found in DB.")
            return Response({"error": "Invalid username"}, status=status.HTTP_401_UNAUTHORIZED)
