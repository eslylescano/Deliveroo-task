# CronParser - Deliveroo-task

`CronParser` is a utility for parsing and interpreting cron expressions. It helps you understand and manage scheduled tasks by breaking down cron jobs into their constituent time fields.

## Architecture

### Overview

The `CronParser` class is designed to process cron expressions, which consist of five time fields followed by a command. These fields are:

1. **Minute**: (0-59)
2. **Hour**: (0-23)
3. **Day of Month**: (1-31)
4. **Month**: (1-12)
5. **Day of Week**: (0-6, where 0 is Sunday)

The class provides methods to extract and format these fields from a cron expression.

### Methods

- **`getMinutes()`**: Returns minute values.
- **`getHours()`**: Returns hour values.
- **`getDayOfMonth()`**: Returns day of the month values.
- **`getMonth()`**: Returns month values.
- **`getDayOfWeek()`**: Returns day of the week values.
- **`print()`**: Outputs a formatted string representation of the cron expression.

## Implementation Steps

1. **Parsing the Cron Expression**:
   - The cron expression is split into its individual fields (minute, hour, day of month, month, day of week, and command).
   - Each field is then processed to extract the relevant values. Special cases (e.g., wildcards, ranges) are handled to ensure accurate extraction.

2. **Extracting Values**:
   - Methods are implemented to extract specific values from each field. For example, the `getMinutes()` method handles minute values, while `getDayOfWeek()` handles day of the week values.
   - The implementation ensures that each field is correctly parsed according to cron syntax rules.

3. **Formatting Output**:
   - The `print()` method formats the parsed cron expression into a human-readable string, breaking down each field and displaying the command.

4. **Testing**:
   - Unit tests are created to verify the accuracy of each method. Tests cover various scenarios to ensure the parser handles different cron expressions correctly.

## Running the Application

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (for running the application and tests)
- [npm](https://www.npmjs.com/) (for managing dependencies)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/eslylescano/Deliveroo-task.git
   cd Deliveroo-task
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Application

To run the `CronParser` with a specific cron expression, use the following command:

```sh
node index.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

Replace the cron expression with the one you want to parse. This command will execute the script and output the parsed values and formatted string.

### Running Tests

To run tests and ensure everything is working correctly, use:

```sh
npm test
```

This command will execute the test cases and provide feedback on the correctness of the implementation.

---

This should provide a clear and concise overview of the CronParser project, its architecture, and how to run it.