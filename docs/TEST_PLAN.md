# Swagger UI Test Plan — Coffee Ordering API

**Open:** https://itis5166-finalproject-api.onrender.com/api-docs/

For every step:
- *Try it out* unlocks the request body / parameters for editing.
- *Execute* sends the request.
- The **Server response** card shows status code, headers, and body.


## How to authorize in Swagger UI

1. After step **1.2** (login) you will receive an `accessToken` in the response body.
2. Copy the token value (the long `eyJ…` string), **without** the `"` quotes and **without** the `Bearer ` prefix.
3. Click the green **Authorize** padlock at the top right of the page.
4. Paste the token into the *Value* field next to **bearerAuth (http, Bearer)**.
5. Click **Authorize → Close**. The padlock turns closed.
6. Every authenticated request you send next will carry that token automatically.

> To switch between the ADMIN and USER token, click **Authorize**, then **Logout**, paste the other token, and **Authorize** again.


## 1. Auth

### 1.1 POST /auth/signup — create one ADMIN and one USER

Run this step **twice**.

**Locate:** *Auth → POST /auth/signup* → **Try it out**

**First run — ADMIN:**
```json
{
  "email": "admin@uncc.edu",
  "password": "Password123!",
  "role": "ADMIN"
}
```
**Second run — USER:**
```json
{
  "email": "user_<timestamp>@test.com",
  "password": "Password123!",
  "role": "USER"
}
```
Click **Execute**. Expect **201**. Save `USER_ID` and `USER_EMAIL`.

### 1.2 POST /auth/login — get JWTs for both users

**Locate:** *Auth → POST /auth/login* → **Try it out**

**First run — ADMIN credentials:**
```json
{ "email": "<ADMIN_EMAIL>", "password": "Password123!" }
```
Execute. Expect **200**. Copy the `accessToken` value into `ADMIN_TOKEN`.

**Second run — USER credentials:**
```json
{ "email": "<USER_EMAIL>", "password": "Password456^" }
```
Execute. Expect **200**. Copy the `accessToken` value into `USER_TOKEN`.

## 2. Users

### 2.1 GET /users — list all (ADMIN only)
**Locate:** *Users → GET /users* → **Try it out** → **Execute**.
Expect **200** with an array of users. Verify **no `password` field** appears in any object.

#### Negative — non-admin
*Authorize* → re-authorize with `USER_TOKEN`. Re-run. Expect **403** `Forbidden: insufficient permission`.

#### Negative — no token
*Authorize* → **Logout** → Close. Re-run. Expect **401** `Not authenticated. Please provide a valid token.`

> Re-authorize with `USER_TOKEN` before continuing.

### 2.2 GET /users/{id} — self or admin

**Locate:** *Users → GET /users/{id}* → **Try it out**.

**Run as USER reading self:**
- `id` = `<USER_ID>` → **Execute** → expect **200**, no password field.

**Run as USER reading ADMIN (cross-user):**
- `id` = `<ADMIN_ID>` → **Execute** → expect **403**.

**Run as ADMIN reading USER:**
*Authorize* → swap to `ADMIN_TOKEN` → **Authorize → Close**.
- `id` = `<USER_ID>` → **Execute** → expect **200** (admin can read anyone).

> Re-authorize back to `USER_TOKEN`.

### 2.3 PUT /users/{id} — self or admin

**Locate:** *Users → PUT /users/{id}* → **Try it out**.

**USER updates own password:**
- `id` = `<USER_ID>`
- Body:
```json
{ "password": "NewPassword456!" }
```
Execute. Expect **200**. Confirm the response has no `password` field.

**Verify the new password actually works** (proves it was hashed, not stored plain text):
Go back to *POST /auth/login*, send:
```json
{ "email": "<USER_EMAIL>", "password": "NewPassword456!" }
```
Expect **200**. Replace `USER_TOKEN` in your scratch pad with the new token, then re-authorize.


#### Negative — empty body
- `id` = `<USER_ID>`
- Body:
```json
{}
```
Expect **400** `At least one field must be provided`.

## 3. Menu

> Authorize as **ADMIN** for 3.1 and 3.4. Public endpoints (3.2, 3.3) work without a token.

### 3.1 POST /menuItems — admin only

**Locate:** *Menu → POST /menuItems* → **Try it out**.

Body:
```json
{
  "name": "<Insert_Item_Here>",
  "description": "Strong shot of coffee",
  "price": 2.50
}
```
Execute. Expect **201**. Save the returned `id` as `MENU_ID`.

#### Negative — non-admin
Re-authorize as `USER_TOKEN`. Repeat with a different name. Expect **403**.

#### Negative — duplicate name
Re-authorize as ADMIN_TOKEN. Send the same body again. Expect **409** `Menu item with this name already exists`.


### 3.3 GET /menuItems/{id} — public
- `id` = `<MENU_ID>` → **Execute** → expect **200**.
- `id` = `99` → **Execute** → expect **404**.

### 3.4 PUT /menuItems/{id} — admin
Ensure you are an Admin!
{ "name": "Espresso_<timestamp>", "description": "Updated description", "price": 3.00 }
Execute. Expect **200**, with the new `price`.

## 4. Coffee Orders

### 4.1 POST /orders — any authenticated user
Authorize as `USER_TOKEN`.

**Locate:** *Coffee Orders → POST /orders* → **Try it out**.

Body:
```json
{ "name": "Morning espresso", "menuId": <MENU_ID> }
```
Execute. Expect **201**. 

### 4.2 GET /orders — admin only
Re-authorize as `ADMIN_TOKEN`. Execute. Expect **200**, an array including the order from 4.1.

### 4.3 GET /orders/{id} — admin only


- `id` = `<ORDER_ID>` → **Execute** → expect **200**.



### 4.4 PUT /orders/{id} — admin only
Re-authorize as `ADMIN_TOKEN`.
- `id` = `<ORDER_ID>`
- Body:
```json
{ "name": "Afternoon espresso", "menuId": <MENU_ID> }
```
Execute. Expect **200** with the updated `name`. 
Reutrns **404** if ID not found


## 5. Reviews

### 5.1 POST /reviews — any authenticated user


**Locate:** *Reviews → POST /reviews* → **Try it out**.

Body:
```json
{ "rating": 5, "comment": "This coffee was amazing", "menuItemId": <MENU_ID> }
```
Execute. Expect **201**. Save the returned `id` as `REVIEW_ID`.

#### Negative — invalid rating
Body:
```json
{ "rating": 10, "comment": "x", "menuItemId": <MENU_ID> }
```
Expect **400** (if `rating` validator is in place) — otherwise the API will accept it.

---

### 5.2 GET /reviews — public
Logout (optional). Execute. Expect **200**, an array including your new review.

### 5.3 GET /reviews/{id} — public
- `id` = `<REVIEW_ID>` → **Execute** → expect **200**.

### 5.4 PUT /reviews/{id} 

- `id` = `<REVIEW_ID>`
- Body:
```json
{ "rating": 4, "comment": "Still good, shorter pull next time", "menuItemId": <MENU_ID> }
```
Execute. Expect **200**.


### 5.5 DELETE /reviews/{id}
- `id` = `<REVIEW_ID>` → **Execute** → expect **204** (no body).


### 6.1 DELETE /orders/{id} — 

- `id` = `<ORDER_ID>` → **Execute** → expect **204**.

### 6.2 DELETE /menuItems/{id} — admin
Same `ADMIN_TOKEN`.
- `id` = `<MENU_ID>` → **Execute** → expect **204**.

### 6.3 DELETE /users/{id}

**Delete the USER (self-delete):**
Authorize as `USER_TOKEN`.
- `id` = `<USER_ID>` → **Execute** → expect **204**.

**Delete the ADMIN (self-delete):**
Authorize as `ADMIN_TOKEN`.
- `id` = `<ADMIN_ID>` → **Execute** → expect **204**.

#### Confirm
Logout. Try *POST /auth/login* with either deleted account → expect **401** `Invalid Credentials`.
