# Money v2
* Use MEAN stack
* Use angular2 for front-end
* Manage all your banking transactions by adding each tx in appropriate category and get a summary table by year.

## Model

* Configure one or more bank account with related csv file containing exported tx. `AccountSetting`
* Manage all your categories where tx will be related to. `Category`
* A `Category` store an array of `Period`
* A `Period` is identified by a year, and an index (from 0 to 11 if monthly category, from 0 to 3 if quarterly or 0 if yearly).
* A `Period` store an array of transactions `Tx`

## How it works

1. Export csv file from your online banking solution.
2. Configure an account in the application, you will be prompted for a name, an account number, the sample csv file, a startsWith pattern to identify the future csv files, number header lines in your csv file, the separator between fields and finally you should map each field to a tx field.
3. Create your categories  
 * with different types

  1. `FIXED` : you should pay at regular interval
  2. `OTHER` : more common expenses (food, clothes, ...)
  3. `INCOMING` : money you received.

 * choose the frequency : `MONTHLY`, `QUARTER`, `YEARLY`.
 * choose years your category should be available.
4. Go to Preferences and choose the year you want to work on and choose the directory the app should read your csv files.
5. Go to import link and save your tx !

## Setup

Run with mongoDB listening on 27017