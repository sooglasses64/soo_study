# soo_study
# MySQL Node.js Project

이 프로젝트는 Node.js를 사용하여 MySQL 데이터베이스에 연결하고 데이터를 조회

## 필요 조건

- Node.js 설치: [Node.js 다운로드](https://nodejs.org/)
- MySQL 설치: [MySQL 다운로드](https://www.mysql.com/)
- Git 설치: [Git 다운로드](https://git-scm.com/)

## 설정 방법

### 1. MySQL 데이터베이스 설정

(1) MySQL 설치 및 서버 시작
(2) 데이터베이스 및 테이블 생성:
   ```sql
   CREATE DATABASE test;
   USE test;
   CREATE TABLE users (
       userId INT AUTO_INCREMENT PRIMARY KEY,
       userPassword VARCHAR(255) NOT NULL,
       userName VARCHAR(255) NOT NULL,
       userSignUpDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   INSERT INTO Users (id, password) VALUES ('soo2', '1234');
   SELECT password FROM Users WHERE id='soo2';
   
### 2. Node.js 프로젝트 설정
프로젝트 초기화:
```bash

mkdir mysql_study
cd mysql_study
npm init -y

필요한 패키지 설치:
```bash
npm install express mysql2

### 3. 데이터베이스 연결 설정
userDBC.js:

```javascript
const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'q142753',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getUsers = async () => {
  const promisePool = pool.promise();
  const [rows] = await promisePool.query('SELECT * FROM users;');
  return rows;
};

module.exports = {
  getUsers
};
### 4. 라우터 설정
userRouter.js:

```javascript
const express = require('express');
const userDBC = require('./userDBC');
const router = express.Router();

router.get('/getUsers', async (req, res) => {
  let res_get_users = {
    status_code: 500,
    users: []
  };

  try {
    const rows = await userDBC.getUsers();
    res_get_users.status_code = 200;
    if (rows.length > 0) {
      rows.forEach((user) => {
        res_get_users.users.push({
          userId: user.userId,
          userPassword: user.userPassword,
          userName: user.userName,
          userSignUpDate: user.userSignUpDate
        });
      });
    } else {
      console.log('사용자 없음');
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    let result = '';
    for (let i = 0; i < res_get_users.users.length; i++) {
      result += res_get_users.users[i].userId;
      result += res_get_users.users[i].userPassword;
      result += res_get_users.users[i].userName;
      result += res_get_users.users[i].userSignUpDate;
      result += "<br>";
    }
    res.send(result);
  }
});

module.exports = router;
### 5. 서버 설정
- App.js:

```javascript
const express = require('express');
const usersRouter = require('./userRouter');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('<h2>welcome to server</h2>');
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});

### 6. 서버 실행
```bash
node App.js
