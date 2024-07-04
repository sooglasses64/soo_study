# soo_study
# MySQL Node.js Project

이 프로젝트는 Node.js를 사용하여 MySQL 데이터베이스에 연결하고 데이터를 조회

## 필요 조건

- Node.js 설치: [Node.js 다운로드](https://nodejs.org/)
- MySQL 설치: [MySQL 다운로드](https://www.mysql.com/)
- Git 설치: [Git 다운로드](https://git-scm.com/)

## 설정 방법

### 1. MySQL 데이터베이스 설정

1. MySQL 설치 및 서버 시작
2. 데이터베이스 및 테이블 생성:
   ```sql
   CREATE DATABASE test;
   USE test;
   CREATE TABLE users (
       userId INT AUTO_INCREMENT PRIMARY KEY,
       userPassword VARCHAR(255) NOT NULL,
       userName VARCHAR(255) NOT NULL,
       userSignUpDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
2. Node.js 프로젝트 설정
```bash
mkdir mysql_study
cd mysql_study
npm init -y
