# __Payvision calculator__

## __The instructions__

The Payvision' Calculator is a simple tool to make simple math calculations. 
It will work in a few simple steps: 
1. Press any button with the digits on it, the numbers will appear on the display. (This calculator cannot start with negative numbers).
2. Press ONE button with the operation of your choice. (If you press an operation twice it will break the calculator).
3. Repeat step one, with the number you wish to get the calculation with. 
4. Then press "=" to display the result.
5. Press "C" to clear the result, and start again.

### The Payvision' Calculator supports the following operations:

- Addition ('+')
- Subtraction ('-')
- Multiplication ('X')
- Division ('/')

### Multiple operations:
The Payvision' Calculator will support multiple calculation without the need to press 'C' every time. 

Just keep adding, substracting, multiply and/or divide all the numbers you wish, and the calculator will keep updating itself, and it will display the correct result each time.

### Support
The Payvision' Calculator can display up to 9 digits, and it will support up to 5 decimal digits for results with decimal numbers.

---

## __Challenges__

### 1. Code review

##### HTML

1. Add Doctype declaration
2. Add Html tag with lang attribute  
and head tag with child element title is required
3. ID btn for button numbers has always same value
4. Html, css and js in separate files
5. Place calculator heading inside a container
---

1. Different rows of numbers are well structured and easy to understand

##### CSS

1. Fix syntax for add ::before and ::after 
2. Add some comment
3. CSS is kept simple and straight to the point

### 2. Testing and bug fixing

1. Fix plus and minus operators
2. Decide a maximum number.length to display on calculator
3. Allow only one decimal point in the calculator viewer
4. Add commas for thousands separator
5. stop adding commas for thousands separator after decimal point
---

1. IIFE is great for keep code private
2. The use of function expression add more structure to the code
3. Code is well commented and easy to understand

### 3. New features implementation

1. Add limit of 5 decimal digits as result to js file.

Implement multiplication and division to the Payvision' Calculator.

### 4. Test automation

I would create unit tests and integrations tests.

---

For this exercise I used the Console DevTools in Chrome to debug.

I found that while performing multiple operations, the division operation was not performing as expected. 

Thanks to the DevTools, I realize that on line 122 of my js file I had var `oldNum = 0`, so when i was performing a division operation after any other operation, it would start with a "0 / anyNumber", resulting always in 0.

I fix this bug changing line 122 in the js file to `oldNum = ""` and now the calculator works greatly. 


**Bonus**: Implement the tests.

### 5. UI/UX design

Do you consider yourself a good designer or UI/UX developer?

- Improve the UI/UX to be more user friendly.

Feel free to do any changes. Show us what you are capable to!

**Bonus:**

1. Configure the application to allow use of keyboard numpad.

## How to run the application using local server

To run the project, open a terminal and execute the following command from project root path:

- Install depencencies:

> yarn

- Run the application

> yarn serve

This command will run a local web server in port 8082:
[http://localhost:8082/src/index.html](http://localhost:8082/src/index.html)