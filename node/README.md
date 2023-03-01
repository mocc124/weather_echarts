# express

## 了解
推荐资源：
[Express 官网](https://www.expressjs.com.cn/zh-cn/)
[Express/Node 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/development_environment)

## 使用express搭建简单服务
- 安装node环境ts支持依赖： `npm install ts-node -g`
- 生成 package.json：`npm init -y`
- 安装node.js 声明文件： `npm install @types/node -D`
- 安装 express ： `npm install express -S`
- 安装 express 声明文件： `npm install @types/express -D`
- 安装 axios ： `npm install axios -S`

写一个简单 express 服务：
```ts
import express,{Express,Router,Request,Response} from "express";
import axios from "axios";

const port:number = 3000
const url:string = "http://pf.fe.st.maoyan.com/dashboard-ajax"

const app:Express = express()
const router:Router = express.Router()

app.use('/api',router)

router.get('/list',async(req:Request,res:Response)=>{
    let  {data} = await axios.get(url)
    
    res.json({
        data
    })
})

app.listen(port,()=>{
    console.log(`app run http://127.0.0.1:${port}/api/list`)
})
```

不要忘了修改 package.json:
```json
{
  "name": "nodedemo",
  "version": "1.0.0",
  "description": "安装依赖： `npm install ts-node -g`",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "ts-node index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^18.14.2"
  },
  "dependencies": {
    "axios": "^1.3.4",
    "express": "^4.18.2"
  }
}
```

使用`npm run dev`启动服务
