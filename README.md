# GroSharies
An app built for families, roommates and friends to keep track of and share lists of groceries and other goods needed for the home!

## Setting Up Firebase
GroSharies uses Firebase to handle authorization. Please follow the preceeding steps to set up a firebase project for the application
1. Go to https://firebase.google.com/ and click "Get started"
2. Add a project (Can disable Google Analytics)
3. Select the project if you were not redirected to it
4. Click on Authentication -> Get Started -> Email/Password -> Enable the first button at the top and save
5. Click on the cog at the top left of the screen -> project settings -> Write down/Copy the (Project ID + Web API key)
6. Open up GroSharies' solution file 
7. Go to the appsettings.json file and replace "grosharies" after the FirebaseProjectId: (line 13) with your firebase project ID
```csharp
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost\\SQLExpress;database=GroSharies;integrated security=true;"
  },
  **"FirebaseProjectId": "grosharies"**
}
```
8. Open up or go to Grosharies' client folder
9. Create a file named ".env.local" (NOTE THE '.'s) at the same level as the src folder (not inside)
10. Place your Web API Key inside as such: 
```javascript
REACT_APP_API_KEY=YourAPIKeyHere
```

## 
