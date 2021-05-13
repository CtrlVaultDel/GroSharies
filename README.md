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
### Login Page
This is the landing page when first opening the application. You can log in here or, if you need to register a new user you can access it via the navbar above or the "click me" link on the page itself.

### Registration Page
Fill out information here to register a new user and immediately log in with them

### Households Page
This page displays all households the current user is part of or a default message if they are not part of any household.
When a user creates a new household they are considered its Admin.
An Admin has the ability to edit the household name or delete the household (and in doing so, everything related to it)
Members cannot delete a household but they can leave it
Everyone has the ability to invite other users to a household they are part of, view the details of a household (by clicking the name) & add a new household

### ShoppingList Page
This page displays all shopping lists associated with the household that was clicked. If no shopping list exist, a default message is displayed. Each shopping list card has a name (that directs the user to its details when clicked). All users have the ability to create a new shoppingList, edit or delete a pre-existing one.

### ShoppingList Details Page
This page displays a "To-Get" list and Purchases table that all users have access to (create, edit, update, delete). There is also a simple pie chart at the bottom that updates as purchases are input. The chart takes all vendors and amounts paid at them and displays them based off their percentage of the total amount. Vendors with the same name will be added together (for instance: Sams, sams & SaMs will have their total costs added together into one vendor: sams) 
