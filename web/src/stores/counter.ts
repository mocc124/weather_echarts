import { number } from 'echarts';
import { ref, computed, toRaw } from 'vue'
import { defineStore, mapActions } from 'pinia'
import { getNow } from "../axios/index";
import type { RootObject,Item,Data } from "./type";
// export const useCounterStore = defineStore('counter', () => {
//   // const count = ref(0)
//   // const doubleCount = computed(() => count.value * 2)
//   // function increment() {
//   //   count.value++
//   // }
//   // return { count, doubleCount, increment }
//   return { getData }
// })

type Ect = {
  name:string,
  value:number
}

export const useCounterStore = defineStore({
  id:"counter",
  state:()=>({
    list: <RootObject>{},
    item:<Item>{}
  }),
  getters:{
    getTop():any{
      let city = toRaw(this.list.data.city)
      return city.sort((a,b)=>b[6]-a[6]).splice(0,6).map(item=>({
        name:item[1],
        value:item[6]
      }))
    },
    getRandom():any{
      let city = toRaw(this.list.data.city)

      function setRandom(arr:any[]){
        arr.length = 0
        const Random = (top:number)=>{
            return Math.random()*top
        }
        const fillRandom = (top:number)=>{
            let random = Number(String(Math.random()*top).split('.')[0])
            if (arr.length>=top) return
            if(!arr.includes(random)) {
                arr.push(random)
            }
            fillRandom(top)
        }

        return fillRandom
      }

      let arr:number[] = []
      let fill = setRandom(arr)
      fill(6)
      
      return arr.map(i=>(
        {
          name:city[i][1],
          value:city[i][6]
        }
      ))
    },
  },
  actions:{
    async getList() {
      const result = await getNow()
      this.list = result
    },
    setItem(obj:Item) {
      this.item = obj
    }
  }
})