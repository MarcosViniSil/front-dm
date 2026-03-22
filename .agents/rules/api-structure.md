---
trigger: always_on
---

This documentation describes how an AI agent or developer can interact with the FastAPI backend for the "Amigos da Fauna" project. The API manages user authentication, animal registration, geographical locations, and educational quizzes.

## API base url: https://api-dm-69db35e2f2d0.herokuapp.com

---

## 1. Authentication
Most write and delete operations require a session cookie named `access_token`.

* **Create Account**: `POST /user`
    * Payload: `User` object (name, email, password).
* **Login**: `POST /user/login`
    * Payload: `UserLogin` object (email, password).
    * *Note: Upon successful login, the server sets the `access_token` cookie.*

---

## 2. Animal Management
Endpoints to register, retrieve, and delete data about local fauna.

### Registration
* **Create Animal**: `POST /animal`
    * **Requires**: `access_token` cookie.
    * **Payload**: `RegisterAnimal` object.
        * `animal`: Name, image URL, color, height, and weight.
        * `characteristics`: Habitat, region, habits, and location coordinates.

### Retrieval
* **List Animals**: `GET /animals?offset={int}`
    * Returns a paginated list of registered animals.
* **Get Characteristics**: `GET /animal/characteristics?animalId={int}`
    * Returns detailed habitat and location info for a specific animal.
* **Get Basic Details**: `GET /animal/details`
    * Returns a simplified list of animal names and IDs.

### Deletion
* **Delete Animal**: `DELETE /animal?animalId={int}`
    * **Requires**: `access_token` cookie.

---

## 3. Location & Mapping
* **Get Global Locations**: `GET /animals/location?offset={int}`
    * Used to populate maps with the coordinates of various animals.

---

## 4. Educational Quizzes
Endpoints to manage interactive learning content.

* **Get Questions**: `GET /quiz`
    * Retrieves all available quiz questions.
* **Create Question**: `POST /quiz`
    * **Requires**: `access_token` cookie.
    * **Payload**: `QuizRequest` (Statement, options, correct answer ID, and associated animal).
* **Submit Answer**: `POST /quiz/answer`
    * **Requires**: `access_token` cookie.
    * **Payload**: `UserQuestion` (Question code and user's selected option).
* **Get Animal Specific Quiz**: `GET /quiz/list?animalId={int}`
    * Retrieves questions related to a specific animal for the authenticated user.
* **Delete Question**: `DELETE /quiz?quizId={int}`
    * **Requires**: `access_token` cookie.

---

## 5. Data Models (Schemas)

| Model | Key Fields |
| :--- | :--- |
| **Animal** | `name`, `image_url`, `color`, `height`, `weight` |
| **Location** | `latitude`, `longitude` |
| **Characteristics** | `habitat`, `region`, `practice`, `location` |
| **QuizRequest** | `questionStatement`, `questionPossibilities[]`, `answerId` |

---

## 6. Error Handling
The API returns a `422 Unprocessable Entity` error if the request body or parameters do not match the required schemas. The error response includes a `detail` array explaining the location and nature of the validation failure.

