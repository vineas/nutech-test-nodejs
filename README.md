# API Documentation

This document provides an overview of the routes available in the application.

## Routes Overview

### Member Routes

#### `GET /member`
- **Description:** Retrieves all members.
- **Controller:** `memberController.getAllMember`

#### `POST /member/register`
- **Description:** Registers a new member.
- **Controller:** `memberController.registerMember`

#### `POST /member/login`
- **Description:** Logs in an existing member.
- **Controller:** `memberController.loginMember`

### Service Routes

#### `GET /service`
- **Description:** Retrieves all services.
- **Controller:** `serviceController.getAllService`

#### `POST /service`
- **Description:** Creates a new service.
- **Controller:** `serviceController.createServices`

### Transaction Routes

#### `GET /transaction/saldo/:id`
- **Description:** Checks the balance of a member.
- **Controller:** `transactionController.saldoCheck`
- **Middleware:** `protect` (Authentication required)

#### `POST /transaction/topup/:id`
- **Description:** Tops up the balance of a member.
- **Controller:** `transactionController.saldoTopUp`
- **Middleware:** `protect` (Authentication required)

#### `POST /transaction/:id`
- **Description:** Makes a transaction for a member.
- **Controller:** `transactionController.makeTransaction`

## Middleware

- **`protect`**: Ensures that the user is authenticated before accessing protected routes.

## Controller Functions

- **`memberController.getAllMember`**: Function to handle retrieval of all members.
- **`memberController.registerMember`**: Function to handle registration of a new member.
- **`memberController.loginMember`**: Function to handle member login.
- **`serviceController.getAllService`**: Function to handle retrieval of all services.
- **`serviceController.createServices`**: Function to handle creation of a new service.
- **`transactionController.saldoCheck`**: Function to handle balance check of a member.
- **`transactionController.saldoTopUp`**: Function to handle topping up balance.
- **`transactionController.makeTransaction`**: Function to handle transactions.

---

Feel free to update this documentation as needed to reflect any changes in your routes or controllers.
