# GroSharies
An app built for families, roommates and friends to keep track of and share lists of groceries and other goods needed for the home!

## Cloning the repository
From a terminal window, in any directory you'd like, run: git clone git@github.com:CtrlVaultDel/GroSharies.git

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
  "FirebaseProjectId": "grosharies"
}
```
8. Open up or go to GroSharies' client folder
9. Create a file named ".env.local" (NOTE THE '.'s) at the same level as the src folder (not inside)
10. Place your Web API Key inside as such: 
```javascript
REACT_APP_API_KEY=YourAPIKeyHere
```

## Setting up the Database
Use the query in the "01_Db_Create.sql.sql" file to create a new database in your local SQL Server (Visual Studio Community)

## Connecting the Database
While in the solution file for GroSharies make sure the database is selected 
![DB-Connect](https://user-images.githubusercontent.com/69012106/118148128-e406f800-b3d5-11eb-9cb1-26af6e2e2eb8.png)

## Running the Database
Once the database has been selected, run it by clicking on the green play button

## Running the client
1. Open up a new terminal window
2. cd into /GroSharies/GroSharies/client
3. type and enter: npm start



## General Information

### Technologies 
#### Front-End
* ReactJS
* Firebase authentication
* Reactstrap
* Bootstrap
* CSS

#### Server-Side
* .NET 5
* ASP.NET Core
* Microsoft SQL Server

### Design
* https://dbdiagram.io/
* https://lucidchart.com

### Entity Relationship Diagram (ERD) & Wireframe
#### ERD
![GroSharies-ERD](https://user-images.githubusercontent.com/69012106/118152429-4cf06f00-b3da-11eb-8d08-67c76e7b04d0.png)

#### Wireframe
![GroSharies-Wireframe1](https://user-images.githubusercontent.com/69012106/118153014-07807180-b3db-11eb-912e-8f15e147f5e2.png)
![GroSharies-Wireframe2](https://user-images.githubusercontent.com/69012106/118153021-094a3500-b3db-11eb-828a-9aa3407d9cfc.png)
