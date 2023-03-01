import express,{Express,Router,Request,Response} from "express";
import axios from "axios";

const port:number = 3000
const url:string = "https://weather.cma.cn"

const app:Express = express()
const router:Router = express.Router()

// 配置跨域请求中间件(服务端允许跨域请求)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
    
    next();
});

app.use('/api',router)

router.get('/weather/now',async(req:Request,res:Response)=>{
    let  {data} = await axios.get(`${url}/api/map/weather/1`)
    
    res.json({
        ...data
    })
})

app.listen(port,()=>{
    console.log(`app run http://127.0.0.1:${port}`)
})
