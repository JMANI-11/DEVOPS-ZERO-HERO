# Role of a Data Scientist

Think of a Data Scientist as the person who turns raw data into insights and a working model.
Their focus is data, logic, and predictions, not deployment, automation, or production systems.

### Understand the Business Problem

The first job is not coding.

A data scientist starts by answering questions like:

What problem are we trying to solve?

What decision will this model help make?

What does “success” look like?

Example:

“Can we predict whether a user will cancel their subscription?”

“Can we classify customer queries into intents?”

At this stage, everything is conceptual.

### Collect and Understand Data

Once the problem is clear, the data scientist works with data:

CSV files

Databases

Logs

Excel sheets

API data

Key activities:

Look at columns and data types

Check missing values

Understand patterns

Identify noisy or irrelevant data

This step is about getting familiar with the data, not building models yet.

### Clean and Prepare the Data

Real-world data is messy.

A data scientist:

Removes duplicates

Handles missing values

Fixes incorrect data

Converts text into numerical form (for ML models)

Normalizes or scales numbers if needed

This step often takes more time than model building.

### Explore the Data (EDA – Exploratory Data Analysis)

Here, the data scientist tries to understand patterns and relationships.

They may:

Plot graphs

Check correlations

Compare distributions

Identify outliers

Goal:

Learn what features are useful

Decide what data helps prediction

This step helps decide which model might work well.

### Build a Simple Model

Now comes the actual machine learning part.

The data scientist:

Chooses a basic algorithm (e.g., logistic regression, decision tree, Naive Bayes)

Trains the model using historical data

Keeps it simple and understandable

At this stage:

Accuracy matters, but clarity matters more

Complex models are avoided for beginners

### Evaluate the Model

After training, the data scientist checks:

Accuracy

Precision / Recall (if needed)

Confusion matrix

They answer questions like:

Is this model better than guessing?

Is it making obvious mistakes?

Is it good enough for a demo or proof of concept?

No production thinking yet — just “Does it work?”

### Save the Model

Once satisfied, the data scientist:

Saves the trained model as a file (e.g., .pkl)

Shares it with the team

At this point:

The model exists as a file

It is NOT deployed

It is NOT automated

The job is almost done.