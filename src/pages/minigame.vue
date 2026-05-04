<script setup lang="ts">
    import { ref,reactive,computed } from 'vue'
    import hikariDialog from '../components/hikariDialog.vue'
    // 按鈕元件
    import minigameBtn from '../components/minigameBtn.vue'
    // 目前題目編號
    const testNum = ref(0)
    // 題目位置，要寫題目產生器
    const questList = reactive([
        {
            hint: {
            ch: '洛克人日文名的英文怎麼拼',
            en: 'How to spell Mega Man (in Romaji)?',
            ko: '록맨의 영어 스펠링이 어떻게 되나요?',
            jp: 'ロックマンのローマ字綴りは何ですか？',
        },
            'letter':'ROCKMAN',
            'mapimg':['0', '0', '0', '0', '1', '2', '3', '0', '0', '0', '4', '5', '0', '0', '7', '6'],
        },{
            hint: {
                ch: '學園風的洛克人EXE是什麼型態',
                en: 'What is the Style of Mega Man EXE in character page(in Romaji)?',
                ko: '캐릭터 페이지에 있는 록맨 EXE의 스타일은 무엇인가요?',
                jp: 'キャラクターページにおけるロックマンEXEのスタイルは何ですか？',
            },
            'letter':'NUMBERSOUL',
            'mapimg':['0','0','0','1','0','5','4','3','2','0','6','7','0','0','0','0','8','0','0','0','0','9','10','0','0'],
        },{
            hint: {
                ch: '可以改變洛克人EXE 0.001%基因資料的修正檔是什麼',
                en: 'What is the patch file that can change 0.001% of Mega Man EXE\'s genetic data(in Romaji)?',
                ko: '록맨 EXE의 유전자 데이터를 0.001% 변경할 수 있는 수정 파일은 무엇인가요?',
                jp: 'ロックマンEXEの遺伝子データを0.001%変更できる修正パッチは何ですか？',
            },
            'letter':'SAITOBAT',
            'mapimg':['0','0','0','0','8','3','2','1','7','4','0','0','6','5','0','0'],
        },{
            hint: {
                ch: '熱斗跟洛克人EXE意識完全重合、操作沒有時間差的狀態是什麼',
                en: 'What is the state where Lan and Mega Man EXE reach full synchronization with no lag (in Romaji)?',
                ko: '넷토와 록맨 EXE의 의식이 완전히 일치하고 조작 지연이 없는 상태는 무엇인가요?',
                jp: '熱斗とロックマンEXEの意識が完全に同調し、操作のタイムラグがない状態を何といいますか？',
            },
            'letter':'FULLSYNCHRO',
            'mapimg':['0','0','8','9','0','0','6','7','10','11','0','5','4','0','0','1','2','3','0','0','0','0','0','0','0'],
        },
    ])
    // 題目
    const currentQuest = computed(()=>{
        return questList[testNum.value]
    })

    // 所有英文字母 
    const abc = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    // 遊戲狀態：1進行中，2輸了，3贏了
    const gameStatus = ref(1)
    // 檢查答案
    let checkString = ref('')

    // 題目產生器，置入字母
    const Qarr = ref<{ letter: string; active: boolean }[]>([])
    const generateQarr = () => {
    let arr = []
    for (let i = 0; i < currentQuest.value.mapimg.length; i++) {
        if (currentQuest.value.mapimg[i] === '0') {
            let cubeSpace = {
                'letter': abc.value[Math.floor(Math.random() * 26)],
                'active': false
            }
        arr.push(cubeSpace)
        } else {
            let a = Number(currentQuest.value.mapimg[i]) - 1
            let cubeSpace = {
                'letter': currentQuest.value.letter[a],
                'active': false
            }
        
        arr.push(cubeSpace)
        }
    }
      Qarr.value = arr
    }

    const regeneraterQarr = () => {
        let arr = []
        for (let i = 0; i < Qarr.value.length; i++) {
                let cubeSpace = {
                    'letter': Qarr.value[i].letter,
                    'active': false
                }
            arr.push(cubeSpace)
        }
          Qarr.value = arr

    }

    // 初始化
    generateQarr()

    // 紀錄狀態 要不要加xy
    // 玩家答案
    const answer = reactive([])
    // 檢查答案
    const check = function(alphabet:string){
        // 輸入
        answer.push(alphabet as never)
        checkString.value = answer.join('')
        // 檢查
        for(let i = 0; i< checkString.value.length; i++){
            if(checkString.value[i] !== currentQuest.value.letter[i]){
                checkString.value = '答錯嚕!請重新來過'
                gameStatus.value = 2
            }
        }

        if(answer.join('') === currentQuest.value.letter){
            checkString.value = '恭喜答對!!'
            gameStatus.value = 3
        }
    }

    // 算方塊字數
    const cubeNumber = computed(()=>{
        let num = Math.sqrt(currentQuest.value.mapimg.length)
        return `grid-${num}`
        })

    const changeQuestion = function(){
        if(testNum.value == questList.length - 1){
            testNum.value = 0
        }else{
            testNum.value +=1
        }
        
        checkString.value = ''
        generateQarr()
        gameStatus.value = 1
        answer.length = 0
    }

    // 重新開始
    const reset = function(){
        checkString.value = ''
        regeneraterQarr()
        gameStatus.value = 1
        answer.length = 0
    }

    // 按鈕按下
    const tab = function(cube:any){
        // 按下後無法返回
        if(cube.active){
            return
        }
        // 遊戲結束(win(3) or lose(2))時無法輸入
        if(gameStatus.value ==2){
            return
        }
        cube.active = !cube.active
        check(cube.letter)
    }


    const currentlang = ref('ch')
    const langChange = function(e:string){
        currentlang.value = e
    }

    const langMap = ref([
    { id: 'ch', name: '中文' },
    { id: 'en', name: 'English' },
    { id: 'ko', name: '한국어' },
    { id: 'jp', name: '日本語' }
]);

   const reStartMap = ref([
    { id: 'ch', name: '重新開始' },
    { id: 'en', name: 'RESTART' },
    { id: 'ko', name: '다시 시작' },
    { id: 'jp', name: 'はじめから' }
])

const changeQuestMap = ref([
    { id: 'ch', name: '換題目' },
    { id: 'en', name: 'NEXT QUIZ' }, // 或是 'NEXT Q'
    { id: 'ko', name: '문제 변경' },
    { id: 'jp', name: '問題を変更' }
])

const currentHint = computed(()=>{
    const hint = currentQuest.value.hint
    const lang = currentlang.value as keyof typeof hint
    const reStart = reStartMap.value.find(item => item.id === lang)
    const changeQuest = changeQuestMap.value.find(item => item.id === lang)
    
    return {
        hint:hint[lang]
        ,reStart:reStart?.name
        ,changeQuest:changeQuest?.name
    }
    })

</script>

<template>
    <!-- 社團攤位圖 -->
    <div class="flex flex-col justify-center items-center">
        <p class="text-2xl text-[#30507a] font-black mb-8">洛克人拼字遊戲</p>
        <div class="font-bold mb-4 w-full gap-4 max-w-[40rem] grid grid-cols-6 justify-center items-center h-[5rem] p-4 ring-[#e5ad55] ring-4 rounded-lg bg-white">
            <div class="relative"><img class="max-w-[5rem] absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" src="/chatimg/1230.png" alt=""></div>
            <p class="col-span-5">{{ currentHint.hint }}</p>
        </div>
        <div class="flex justify-between flex-col gap-2 md:gap-0 md:flex-row w-full max-w-[40rem] items-center mb-8">
            <div class="flex gap-2">
                <p @click="changeQuestion()" class="bg-[#30507a] text-white p-2 rounded cursor-pointer font-bold">{{ currentHint.changeQuest }}</p>
                <p @click="reset()" class="bg-[#30507a] text-white p-2 rounded cursor-pointer font-bold">{{ currentHint.reStart }}</p>
            </div>
            <div class="flex gap-1">
                <p  class="bg-[#30507a] text-white p-2 rounded cursor-pointer font-bold" v-for="items in langMap" :key="items.id" @click="langChange(items.id)">{{ items.name }}</p>
            </div>
        </div>
        <div :class="`grid gap-1 ${cubeNumber} w-full max-w-[40rem]`">
            <minigameBtn :info="cube.letter" :active="cube.active" :gamestatus="gameStatus"  v-for="(cube,index) in Qarr" :key="`${cube}${index}`" @click="tab(cube)"/>
        </div>
        <p class="mt-4 mb-20 font-bold text-lg">{{ checkString }}</p>
        <hikariDialog/>
    </div>
</template>

<style scoped>
/* .container{
    width:100%
} */
.read-the-docs {
    color: #888;
}
a{
    color: white;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

</style>
