# MongoDB

## 실행 

```bash 
cd C:\Users\woochan\Downloads\mongodb-win32-x86_64-2008plus-ssl-4.0.8\mongodb-win32-x86_64-2008plus-ssl-4.0.8\data
mongod --dbpath . 
```

## 연동 
```js
import mongoose from "mongoose"; 

mongoose.connect("mongodb://localhost:포트번호/Database이름"); 
```