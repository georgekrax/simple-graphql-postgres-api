# Simple GraphQL API with PostgreSQL

This is a simple project for beginners to get their hands dirty and develop a `GraphQL` API with the help Apollo Server, using the `apollo-server-express` library. Also, with this project you can explore how to implement a simple connection between a `PostgreSQL` database and a GraphQL server, with the `pg-promise` library.

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- Apollo server ([apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express))
- PostgreSQL ([pg-promise](https://github.com/vitaly-t/pg-promise))
- [nodemon](https://www.npmjs.com/package/nodemon) (v2.0.3)

> **_Note_**: This project does not use any particular style guides, and you are free to make a **pull request** and improve the code as you like.

## Getting started

#### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.0.0)
- [express](https://www.npmjs.com/package/express) (v4.17.1)
- [PostgreSQL](https://www.postgresql.org/) (v12)
- [pg-promise](https://www.npmjs.com/package/pg-promise) (v10.5.2)

You can follow the links of the above list, to see explicit instructions on how to install the correnponding package into your operating system. However, you only need [Node.js](https://nodejs.org/en/) & [PostgreSQL](https://www.postgresql.org/) before proceeding.

#### Installation & Local development

After **cloning** the GitHub repository to your system, please follow below the instructions:

1. Make sure you `cd` into the correct folder, where all of the app files are located, before proceeding with the following steps. Also, you will need the latest version of [Node.js](https://nodejs.org/en/) & [PostgreSQL](https://www.postgresql.org/), as noticed above.

2. Install the dependencies:

```bash
$  npm install
```

3. Run the `db.psql` file, to create the tables, domains and enums in your PostgreSQL server.

```
$  sudo -u postgres
$  cd ../<back again to code directory>
$  psql -f db.psql
```

4. _(optional):_ You can also seed the tables with some sample data, using the `sample_data.psql` file:

```bash
$  psql -f sample_data.psql
```

5. Go ahead and config accordingl the `.env`, which is going to be responsible for storing valuable and sensitive data for accessing the database. Please complete the file like this:

```shell
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
DB_HOST="127.0.0.1" // or "localhost"
DB_PORT=5432
```

6. Run the GraphQL API server, by one of the following ways:

```bash
$  nodemon server.js
```

**or**

```bash
$  npm start
```

**or**

```bash
$  npm run start
```

7. Now you have the API setted up and running.

## API Documentation

### Getting Started

- **Base URL**: At present this app can only be run locally and is not hosted as a base URL somewhere live on the web. The GraphQL API is currently hosted at the default port of your computer, http://127.0.0.1:5000/, or http://localhost:5000/, which is set as a proxy in the `package.json` configuration file.
- **Authentication**: This version of the application does not require and does not use authentication or API keys, to have access on its data.

### Queries

#### Retrive all available hotels

---

```graphql
query {
  hotels {
    id
    name
    category
    price
    avg_rating
    updated_at
    timestamp
  }
}
```

Response:

```json
{
  "data": {
    "hotels": [
      {
        "id": 1,
        "name": "Cassandra Hotel",
        "category": "Hotel",
        "price": 12,
        "avg_rating": 3.2,
        "updated_at": "2020-04-28T10:30:22.267Z",
        "timestamp": "2020-04-28T10:30:17.603Z"
      }
    ]
  }
}
```

#### & the owner information

```graphql
query {
    hotels {
        ...
        owner {
            id
            first_name
            last_name
        }
    }
}
```

Response:

```json
{
  "data": {
    "hotels": [
      {
        "owner": [
          {
            "id": 1,
            "first_name": "George",
            "last_name": "Krachtopoulos"
          }
        ]
      }
    ]
  }
}
```

#### & their location details

```graphql
query {
    hotels {
        ...
        location {
            id
            address
            city
            area
        }
    }
}
```

Response:

```json
{
  "data": {
    "hotels": [
      {
        "location": [
          {
            "id": 1,
            "address": "Kryopigi 25",
            "city": "Chalkidiki",
            "area": null
          }
        ]
      }
    ]
  }
}
```

#### & all their reviews and ratings

```graphql
query {
    hotels {
        ...
        reviews {
            id
            rating
            body
        }
    }
}
```

Response:

```json
{
  "data": {
    "hotels": [
      {
        "reviews": [
          {
            "id": 1,
            "rating": 4,
            "body": null
          },
          {
            "id": 2,
            "rating": 5,
            "body": null
          }
        ]
      }
    ]
  }
}
```

#### Retrieve a single hotel

---

Reuqest arguments:
* **id:** Int!

```graphql
query {
  hotel(id: 1) {
    id
    name
    category
    price
    avg_rating
    updated_at
    timestamp
  }
}
```

Response:

```json
{
  "data": {
    "hotel": [
      {
        "id": 1,
        "name": "Cassandra Hotel",
        "category": "Hotel",
        "price": 12,
        "avg_rating": 3.2,
        "updated_at": "2020-04-28T10:30:22.267Z",
        "timestamp": "2020-04-28T10:30:17.603Z"
      }
    ]
  }
}
```

#### Retrive all hotel reviews

---

```graphql
query {
  reviews {
    id
    rating
    body
  }
}
```

Response:

```json
{
  "data": {
    "reviews": [
      {
        "id": 1,
        "rating": 4,
        "body": null
      },
      {
        "id": 2,
        "rating": 5,
        "body": null
      }
    ]
  }
}
```

#### & with the hotel information for a specific review

```graphql
query {
  reviews {
    id
    rating
    body
    hotel {
      id
      name
      category
      price
      avg_rating
      updated_at
      timestamp
    }
  }
}
```

Response:

```json
{
  "data": {
    "reviews": [
      {
        "id": 1,
        "rating": 4,
        "body": null,
        "hotel": [
          {
            "id": 1,
            "name": "Cassandra Hotel",
            "category": "Hotel",
            "price": 12,
            "avg_rating": 3.2,
            "updated_at": "2020-04-28T10:30:22.267Z",
            "timestamp": "2020-04-28T10:30:17.603Z"
          }
        ]
      },
      {
        "id": 2,
        "rating": 5,
        "body": null,
        "hotel": [
          {
            "id": 1,
            "name": "Cassandra Hotel",
            "category": "Hotel",
            "price": 12,
            "avg_rating": 3.2,
            "updated_at": "2020-04-28T10:30:22.267Z",
            "timestamp": "2020-04-28T10:30:17.603Z"
          }
        ]
      }
    ]
  }
}
```

#### Retrieve all hotel locations

---

```graphql
query {
  locations {
    id
    address
    city
    area
  }
}
```

Response:

```json
{
  "data": {
    "locations": [
      {
        "id": 1,
        "address": "Kryopigi 25",
        "city": "Chalkidiki",
        "area": null
      }
    ]
  }
}
```

#### Retrieve all hotel owners

---

```graphql
query {
  owners {
    id
    first_name
    last_name
  }
}
```

Response:

```json
{
  "data": {
    "owners": [
      {
        "id": 1,
        "first_name": "George",
        "last_name": "Krachtopoulos"
      }
    ]
  }
}
```

## Authors

This project is initally created by [me](https://github.com/georgekrax), George Krachtopoulos. Please feel free to contact me if you need any help, and make sure to follow me for more updates.
